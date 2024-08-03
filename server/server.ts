import ingredientRoutes from './routes/ingredients.ts'
import recipesRoutes from './routes/recipes.ts'

import * as Path from 'node:path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import OpenAI from 'openai'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const envConfig = dotenv.config()
  if (envConfig.error) throw envConfig.error
}
const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) {
  throw new Error(
    'API key is missing. Please set the OPENAI_API_KEY environment variable.'
  )
}

const server = express()
server.use(express.json())
server.use(cors())

const openai = new OpenAI({
  apiKey: apiKey,
})

server.use('/api/v1/ingredients', ingredientRoutes)
server.use('/api/v1/recipes', recipesRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

//for connecting Chat GPT API
server.post('/completions', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON.',
        },
        { role: 'user', content: req.body.message },
      ],
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
    })
    res.send(completion.choices[0].message.content)
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error)
    res.status(500).json({ message: 'Error communicating with OpenAI API' })
  }
})

export default server

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { getAllIngredients } from '../../apis/ingredients'
import styles from './RecipeGenerator.module.css'
import { Recipes } from '../../../models/recipes'
import ErrorMessage from '../Error/ErrorMessage'
import Loader from '../Loading/Loading'

function RecipeGenerator() {
  //state of recipeList is passed to/from RecipeCard to provide go-back functionality
  const { state } = useLocation()
  const [recipeList, setRecipeList] = useState<Recipes[]>()
  const [isSearching, setIsSearching] = useState(false)

  //set initial recipeList if returning from recipe view
  useEffect(() => {
    if (state) {
      setRecipeList(state)
    }
  }, [state])

  const {
    data: ingredients,
    isLoading,
    isError,
  } = useQuery(['ingredients'], getAllIngredients)

  let ingredientsList: string

  const fetchData = async () => {
    try {
      setIsSearching(true)
      if (isLoading) {
        return <p>Loading...</p>
      }

      if (isError) {
        const message = `Error retrieving data!`
        return (
          <>
            <ErrorMessage message={message} />
          </>
        )
      }

      ingredientsList = ingredients
        .map((ingredient) => ingredient.item_name)
        .join(', ')
      const prompt = `From now when you respond you will only provide a codeblock with json and nothing else. You will consider this list of ingredients: ${ingredientsList} and provide a maximum of 3 recipes containing ONLY the ingredients specific and absolutely no additional ingredients. The json will have the following properties: dish_name, preparation_time, cooking_time, servings, ingredients and method. Please store each step of method as a string array. Remember you must provide only a codeblock containing json, absolutely no additional text.`

      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: prompt,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = await fetch('http://localhost:3000/completions', options)
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data.recipes[0])

      if (data.recipes && data.recipes.length > 0) {
        const jsonArray = data.recipes
        for (let i = 0; i < jsonArray.length; i++) {
          jsonArray[i].ingredients = Array.isArray(jsonArray[i].ingredients)
            ? jsonArray[i].ingredients.join(', ')
            : String(jsonArray[i].ingredients)
          jsonArray[i].method = Array.isArray(jsonArray[i].method)
            ? jsonArray[i].method.join('\n')
            : String(jsonArray[i].method)
        }
        setRecipeList(jsonArray)
      } else {
        const message = `'No choices found in the response.`
        return (
          <>
            <ErrorMessage message={message} />
          </>
        )
      }
    } catch (error) {
      const message = `Currently, our chef is on sick leave. Sorry.`
      return (
        <>
          <ErrorMessage message={message} />
        </>
      )
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className={styles['recipe-gen']} id="recipe-generator">
      <div className={styles.header}>
        <h2>Recipe Generator</h2>
        <button onClick={fetchData} className={styles['button']}>
          Generate Recipes
        </button>
      </div>
      <div>
        <ul className={styles['generated-list']}>
          {!ingredients || ingredients.length === 0 ? (
            <p>
              No ingredients selected. Please add at least one item on the
              kitchen to continue.
            </p>
          ) : isSearching ? (
            <Loader />
          ) : recipeList?.length ? (
            recipeList.map((recipe) => (
              <li key={recipe.dish_name}>
                <Link
                  className={styles.link}
                  to={`/recipe`}
                  state={{ recipeList, selectedRecipe: recipe }}
                >
                  <div className={styles['generated-recipe']}>
                    <strong>{recipe.dish_name}</strong>
                    <p>Preparation Time: {recipe.preparation_time}</p>
                    <p>Ingredients: {recipe.ingredients}</p>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p>Ready to generate recipes!</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default RecipeGenerator

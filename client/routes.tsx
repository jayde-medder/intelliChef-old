import { Route, createRoutesFromElements } from 'react-router-dom'

import App from './components/App.tsx'
import Home from './components/pages/Home.tsx'
import Recipe from './components/pages/Recipe.tsx'
import SavedRecipe from './components/pages/SavedRecipe.tsx'
import ManageMyRecipes from './components/ManageMyRecipes/ManageMyRecipes.tsx'

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/ManageMyRecipes" element={<ManageMyRecipes />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/SavedRecipeCard/:id" element={<SavedRecipe />} />
    </Route>
  </>
)

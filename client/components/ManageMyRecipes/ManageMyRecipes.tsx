import { useQuery } from '@tanstack/react-query'
import ErrorMessage from '../Error/ErrorMessage'
import { getRecipes } from '../../apis/recipes'
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ManageMyRecipes.module.css'
import { useRecipe } from '../../hooks/useRecipe'
import Loader from '../Loading/Loading'

const ManageMyRecipes = () => {
  const { user } = useAuth0()
  const { deleteRecipeMutation } = useRecipe()
  const navigate = useNavigate()

  const {
    data: recipes,
    isError,
    isLoading,
  } = useQuery(['recipes'], getRecipes)

  const foundRecipes = recipes?.filter(
    (recipe) => recipe.auth0_id === user?.sub
  )

  if (isError) {
    const message = `An error occurred while fetching your recipes`

    return (
      <>
        <ErrorMessage message={message} />
      </>
    )
  }

  if (!foundRecipes || isLoading) {
    return <Loader />
  }

  const handleDelete = (id: number) => {
    deleteRecipeMutation.mutate(id)
    navigate('/ManageMyRecipes')
    window.location.reload()
  }

  return (
    <div className={styles['manage-body']}>
      <h2>Manage My Saved Recipes</h2>
      <div className={styles['manage-container']}>
        {foundRecipes.map((recipe) => (
          <div key={recipe.id} className={styles['manage-box']}>
            <h1>{recipe.dish_name}</h1>
            <span>Preparation Time:</span>
            <span>&nbsp;{recipe.preparation_time}</span>

            <p>Ingredients:</p>
            <span>{recipe.ingredients}</span>

            <div className={styles['button-container']}>
              <Link to={`/SavedRecipeCard/${recipe.id}`} state={recipe}>
                <button className={styles.button}>View</button>
              </Link>
              <button
                onClick={() => handleDelete(recipe.id)}
                className={styles.button}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageMyRecipes

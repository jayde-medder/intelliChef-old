import styles from './Recipe.module.css'
import SavedRecipeCard from '../ViewRecipe/SavedRecipeCard'

function SavedRecipe() {
  return (
    <>
      <div className={styles['recipe-view']}>
        <SavedRecipeCard />
      </div>
    </>
  )
}

export default SavedRecipe

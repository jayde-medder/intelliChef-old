import KitchenBuilder from '../KitchenBuilder/KitchenBuilder'
import RecipeGenerator from '../RecipeGenerator/RecipeGenerator'

function Home() {
  return (
    <>
      <div className="container">
        <h1>Welcome to IntelliChef</h1>
        <p>
          IntelliChef uses the ChatGPT API to turn the ingredients from your
          kitchen into recipes. Enter your ingredients below!
        </p>
      </div>
      <div className="container">
        <KitchenBuilder />
        <RecipeGenerator />
      </div>
    </>
  )
}

export default Home

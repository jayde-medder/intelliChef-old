import KitchenBuilder from './KitchenBuilder/KitchenBuilder'
import RecipeGenerator from './RecipeGenerator/RecipeGenerator'
import SideBar from './SideBar/SideBar'
import Header from './Header/Header'

function App() {
  return (
    <>
      <section className="main">
        <Header />
        <div className="app">
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
        </div>
      </section>
    </>
  )
}

export default App

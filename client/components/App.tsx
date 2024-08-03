import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

function App() {
  return (
    <>
      <section className="main">
        <Header />
        <div className="app">
          <Outlet />
        </div>
      </section>
    </>
  )
}

export default App

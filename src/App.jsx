import './App.css'
import CardsContainer from './components/CardsContainer'
import logo from './assets/pokedex_logo.png'

function App() {
  return (
    <div className="App">
      <img src={logo} alt="" />
      <CardsContainer/>
    </div>
  )
}

export default App

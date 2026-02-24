import './App.css'
import { BrewForm } from './components/BrewForm'

function App() {

  return (
    <>
      
      <BrewForm onSubmit={(data) => console.log('Brew data submitted:', data)} />
      
    </>
  )
}

export default App

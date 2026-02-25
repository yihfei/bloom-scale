import './App.css'
import { BrewForm } from './components/BrewForm'
import { BrewList } from './components/BrewList'
import { BeanForm } from './components/BeanForm'
import type { SavedBrew } from './types/brew'

function App() {
  const savedBrews: SavedBrew[] = [
    {
      id: '1',
      coffee: 'Ethiopian Yirgacheffe',
      roaster: 'Local Roasters',
      grindSize: 'Medium',
      temp: 92,
      dose: 20,
      water: 300,
      minutes: 2,
      seconds: 30,
      notes: 'Bright and floral notes',
      createdAt: 1690000000000
    }
  ]

  return (
    <>
      <BeanForm onSubmit={(data) => console.log('Bean data submitted:', data)} />
      <BrewForm onSubmit={(data) => console.log('Brew data submitted:', data)} />
      <BrewList brews={savedBrews} />
    </>
  )
}

export default App

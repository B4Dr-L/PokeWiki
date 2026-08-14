import { useState } from 'react'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import MyTeamList from './components/MyTeamList'

function App() {
  const [activeTab, setActiveTab] = useState('PokemonList')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'PokemonList' ? <PokemonList setActiveTab={setActiveTab} /> : <MyTeamList />}
      </main>
    </div>
  )
}

export default App


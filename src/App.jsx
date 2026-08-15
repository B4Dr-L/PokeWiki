import { useState } from 'react'
import Header from './components/Header'
import PokemonList from './components/pokemon/PokemonList'
import MyTeamList from './components/team/MyTeamList'

const MAX_TEAM_LENGTH = 3

function App() {
  const [activeTab, setActiveTab] = useState('PokemonList')
  const [team, setTeam] = useState([])

  function addToTeam(pokemon){
    if(team.length >= MAX_TEAM_LENGTH) return;
    if(team.some(p => p.id === pokemon.id)) return;
    setTeam(prev => [...prev, pokemon])
  }

  function removeFromTeam(pokemon){
    setTeam(prev => prev.filter(p => p.id !== pokemon.id))
  }

  function selectPokemon(id){
    console.log(id) //TODO
  }

  const isTeamFull = team.length >= MAX_TEAM_LENGTH;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 sm:py-4 flex flex-col">
        {activeTab === 'PokemonList' ? (
          <PokemonList 
            selectPokemon={selectPokemon}
            team={team}
            isTeamFull={isTeamFull}
            addToTeam={addToTeam}
            removeFromTeam={removeFromTeam}
          />
        ) : (
          <MyTeamList 
            team={team}
            removeFromTeam={removeFromTeam}
            selectPokemon={selectPokemon}
            goToPokemonList={()=>setActiveTab('PokemonList')}
          />
        )}
      </main>
    </div>
  )
}

export default App


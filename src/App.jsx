import { useState } from 'react'
import Header from './components/Header'
import PokemonList from './components/pokemon/PokemonList'
import MyTeamList from './components/team/MyTeamList'
import PokemonDetail from './components/detail/PokemonDetail'
import { usePokemonList } from './hooks/usePokemonList'

const MAX_TEAM_LENGTH = 3
const PAGE_LIMIT = 20

function App() {
  const [activeTab, setActiveTab] = useState('PokemonList')
  const [previousTab, setPreviousTab] = useState('PokemonList')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const pokemonListState = usePokemonList(PAGE_LIMIT)

  const [team, setTeam] = useState(()=>{
    try{
      const saved = localStorage.getItem('savedTeam')
      return saved ? JSON.parse(saved) : []
    }
    catch(error){
      console.error('Failed to load team from localStorage',error)
      return []
    }
  })
  
  function addToTeam(pokemon){
    if(team.length >= MAX_TEAM_LENGTH) return;
    if(team.some(p => p.id === pokemon.id)) return;
    const nextTeam = [...team,pokemon]
    setTeam(nextTeam)

    //save team to localStorage
    try {
      localStorage.setItem('savedTeam', JSON.stringify(nextTeam))
    } catch (error) {
      console.error('Failed to save team into localStorage', error)
    }

  }

  function removeFromTeam(pokemon){
    const nextTeam = team.filter(p => p.id !== pokemon.id)
    setTeam(nextTeam)
    try {
      localStorage.setItem('savedTeam', JSON.stringify(nextTeam))
    } catch (error) {
      console.error('Failed to save team into localStorage', error)
    }
  }

  function selectPokemon(pokemon){
    setSelectedPokemon(pokemon)
    setPreviousTab(activeTab)
    setActiveTab('PokemonDetail')
  }

  const isTeamFull = team.length >= MAX_TEAM_LENGTH;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header 
        activeTab={activeTab} 
        goToPokemonList={() => setActiveTab('PokemonList')} 
        goToTeamList={() => setActiveTab('MyTeamList')} 
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 sm:py-4 flex flex-col">
        {activeTab === 'PokemonList' && (
          <PokemonList 
            selectPokemon={selectPokemon}
            team={team}
            isTeamFull={isTeamFull}
            addToTeam={addToTeam}
            removeFromTeam={removeFromTeam}
            pokemonListState={pokemonListState}
          />
        )}
        
        {activeTab === 'MyTeamList' && (
          <MyTeamList 
            team={team}
            removeFromTeam={removeFromTeam}
            selectPokemon={selectPokemon}
            goToPokemonList={()=>setActiveTab('PokemonList')}
          />
        )}

        {activeTab === 'PokemonDetail' && selectedPokemon && (
          <PokemonDetail
            key={selectedPokemon.id}
            pokemon={selectedPokemon}
            team={team}
            isTeamFull={isTeamFull}
            addToTeam={addToTeam}
            removeFromTeam={removeFromTeam}
            goBack={() => setActiveTab(previousTab)}
          />
        )}
      </main>
    </div>
  )
}

export default App


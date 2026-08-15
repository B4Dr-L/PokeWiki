import { usePokemonList } from '../../hooks/usePokemonList';
import FilterBar from './FilterBar';
import { PageControls } from './PageControls';
import PokemonCard from './PokemonCard';

const limit = 20

export default function PokemonList({
  selectPokemon,
  team = [],
  isTeamFull = false,
  addToTeam,
  removeFromTeam
}) {
  const {
    pokemonList,
    isLoading,
    error,
    prevPage,
    nextPage,
    isPagePrev,
    isPageNext,
    page,
    count
  } = usePokemonList(limit);

  const totalPages = Math.ceil(count/limit)

  return (
    <div className="space-y-6">
      <PageControls
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          isPagePrev={isPagePrev}
          isPageNext={isPageNext}
      />
      <FilterBar />

      {/*Loading*/}
      {isLoading && (
        <div className="text-center py-10 font-medium text-slate-500">
          Loading...
        </div>
      )}
      {/*Error*/}
      {error && (
        <div className="text-center py-10 text-red-500 font-medium">
          Error: {error}
        </div>
      )}

      {/*Pokemon List*/}
      {!isLoading && !error && (
        <>
          {/*Pokemon Grid*/}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pokemonList.map((pokemon) => {
              const isInTeam = team.some((p) => p.id === pokemon.id)
              return (
                <PokemonCard 
                  key={pokemon.id} 
                  pokemon={pokemon} 
                  addToTeam={addToTeam} 
                  removeFromTeam={removeFromTeam}
                  isInTeam={isInTeam}
                  isTeamFull={isTeamFull}
                  selectPokemon={() => selectPokemon(pokemon.id)}
                />)
            })}
          </div>
          
          
          <PageControls
            page={page}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            isPagePrev={isPagePrev}
            isPageNext={isPageNext}
          />
        </>
      )}
    </div>
  );
}



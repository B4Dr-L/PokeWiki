import FilterBar from './FilterBar';
import { PageControls } from './PageControls';
import PokemonCard from './PokemonCard';

export default function PokemonList({
  selectPokemon,
  team = [],
  isTeamFull = false,
  addToTeam,
  removeFromTeam,
  pokemonListState
}) {
  const {
    pokemonList,
    isLoading,
    error,
    page,
    totalPages,
    count,
    selectedType,
    setSelectedType,
    prevPage,
    nextPage,
    isPagePrev,
    isPageNext,
  } = pokemonListState;

  return (
    <div className="space-y-6">
      <FilterBar
        selectedType={selectedType}
        onSelectType={setSelectedType}
        totalCount={count}
      />

      <PageControls
        page={page}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        isPagePrev={isPagePrev}
        isPageNext={isPageNext}
      />

      {/*Loading*/}
      {isLoading && (
        <div className="text-center py-12 font-medium text-slate-500">
          Loading Pokémon...
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
          {pokemonList.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium">
              No Pokémon found.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pokemonList.map((pokemon) => {
                const isInTeam = team.some((p) => p.id === pokemon.id);
                return (
                  <PokemonCard 
                    key={pokemon.id} 
                    pokemon={pokemon} 
                    addToTeam={addToTeam} 
                    removeFromTeam={removeFromTeam}
                    isInTeam={isInTeam}
                    isTeamFull={isTeamFull}
                    selectPokemon={() => selectPokemon(pokemon)}
                  />
                );
              })}
            </div>
          )}
          
          {pokemonList.length > 0 && (
            <PageControls
              page={page}
              totalPages={totalPages}
              prevPage={prevPage}
              nextPage={nextPage}
              isPagePrev={isPagePrev}
              isPageNext={isPageNext}
            />
          )}
        </>
      )}
    </div>
  );
}



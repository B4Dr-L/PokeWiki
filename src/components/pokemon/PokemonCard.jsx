import { PokemonTypeTag } from "../common/PokemonTypeTag";


export default function PokemonCard({
  pokemon,
  isInTeam = false,
  isTeamFull = false,
  addToTeam,
  removeFromTeam,
  selectPokemon
}) {


  const formattedId = pokemon?.id ? `#${String(pokemon.id).padStart(3, '0')}` : '';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between">
      <div>
        {/*Image*/}
        <div 
          onClick={selectPokemon}
          className="bg-slate-50 rounded-lg p-2 flex flex-col items-center justify-center relative border border-slate-100 mb-2.5 hover:shadow-md hover:border-slate-300 transition-all duration-150 cursor-pointer">
          <span className="absolute top-1.5 right-2 font-mono text-[11px] font-medium text-slate-400">
            {formattedId}
          </span>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-24 w-24 object-contain mt-2"
            loading="lazy"
          />
        </div>

        {/* Pokemon Info */}
        <div className="space-y-1.5">
          <h3 className="font-semibold text-slate-800 text-sm capitalize truncate">
            {pokemon.name}
          </h3>

          {/* Types */}
          <div className="flex flex-wrap gap-1">
            {pokemon.types?.map((type) => (
              <PokemonTypeTag key={type} type={type}/>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-3">
        {isInTeam ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFromTeam?.(pokemon);
            }}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] transition-all cursor-pointer"
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToTeam?.(pokemon);
            }}
            disabled={isTeamFull}
            className={`
              w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors
              ${
                isTeamFull
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-amber-400 text-blue-950 hover:bg-amber-300 cursor-pointer'
              }
            `}
          >
            {isTeamFull ? 'Team Full' : 'Add'}
          </button>
        )}
      </div>
    </div>
  );
}


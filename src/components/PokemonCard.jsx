const TYPE_COLORS = {
  normal: 'bg-stone-100 text-stone-700 border-stone-200',
  fire: 'bg-orange-100 text-orange-800 border-orange-200',
  water: 'bg-blue-200 text-blue-900 border-blue-300',
  electric: 'bg-amber-100 text-amber-800 border-amber-200',
  grass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  ice: 'bg-teal-100 text-teal-800 border-teal-200',
  fighting: 'bg-red-100 text-red-800 border-red-200',
  poison: 'bg-purple-100 text-purple-800 border-purple-200',
  ground: 'bg-amber-200/60 text-amber-900 border-amber-300',
  flying: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  psychic: 'bg-pink-100 text-pink-800 border-pink-200',
  bug: 'bg-lime-100 text-lime-800 border-lime-200',
  rock: 'bg-stone-200 text-stone-800 border-stone-300',
  ghost: 'bg-violet-100 text-violet-800 border-violet-200',
  dragon: 'bg-indigo-100 text-indigo-900 border-indigo-300',
  dark: 'bg-slate-700 text-slate-100 border-slate-600',
  steel: 'bg-slate-200 text-slate-800 border-slate-300',
  fairy: 'bg-rose-100 text-rose-800 border-rose-200',
};

export default function PokemonCard({
  pokemon,
  isInTeam = false,
  isTeamFull = false,
  goToPokemon = (id) => console.log(id),
  addToTeam = (id) => console.log(id),
  removeFromTeam = (id) => console.log(id)
}) {
  function clickHandler(e) {
    e.stopPropagation();
    if (isInTeam) {
      removeFromTeam(pokemon.id);
    } else if (!isTeamFull) {
      addToTeam(pokemon.id);
    }
  }

  const formattedId = pokemon?.id ? `#${String(pokemon.id).padStart(3, '0')}` : '';

  return (
    <div
      onClick={() => goToPokemon(pokemon.id)}
      className="bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-150 cursor-pointer"
    >
      <div>
        {/*Image*/}
        <div className="bg-slate-50 rounded-lg p-2 flex flex-col items-center justify-center relative border border-slate-100 mb-2.5">
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
            {pokemon.types?.map((type) => {
              const colorClass = TYPE_COLORS[type.toLowerCase()] || 'bg-slate-100 text-slate-600 border-slate-200';
              return (
                <span
                  key={type}
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize ${colorClass}`}
                >
                  {type}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-3">
        {isInTeam ? (
          <button
            type="button"
            onClick={clickHandler}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={clickHandler}
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
            {isTeamFull ? 'Team Full' : 'Add to Team'}
          </button>
        )}
      </div>
    </div>
  );
}


import { PokemonTypeTag } from "../common/PokemonTypeTag";

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export default function TeamPokemonCard({
  pokemon,
  team = [],
  noDamageTo = [],
  noDamageFrom = [],
  selectPokemon,
  removeFromTeam,
}) {
  const formattedId = pokemon?.id ? `#${String(pokemon.id).padStart(3, '0')}` : '';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between shadow-xs">
      <div className="space-y-3">
        {/* Card Top Bar */}
        <div className="flex items-start justify-between gap-1.5">
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-sm capitalize truncate">
              {pokemon.name}
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {pokemon.types?.map((type) => (
                <PokemonTypeTag key={type} type={type} />
              ))}
            </div>
          </div>
          <span className="font-mono text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
            {formattedId}
          </span>
        </div>

        {/* Image Container */}
        <div
          onClick={() => selectPokemon?.(pokemon.id)}
          className="bg-slate-50 rounded-lg p-2 flex items-center justify-center border border-slate-100 hover:shadow-md hover:border-slate-300 transition-all duration-150 cursor-pointer"
        >
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-24 w-24 object-contain"
            loading="lazy"
          />
        </div>

        {/* Stats Comparison */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-0.5">
            Base Stats
          </span>
          <div>
            {pokemon.stats?.map((stat, sIndex) => {
              const isBest =
                team.length > 1 &&
                team.every(
                  (p) => p.stats && stat.value >= (p.stats[sIndex]?.value ?? 0)
                );

              return (
                <div
                  key={stat.name}
                  className="flex items-center justify-between px-1 py-0.5 text-xs"
                >
                  <span className="text-slate-600 font-medium">
                    {STAT_LABELS[stat.name] || stat.name}
                  </span>
                  <span
                    className={`font-mono text-xs tabular-nums text-right ${
                      isBest
                        ? 'font-bold text-emerald-600'
                        : 'font-medium text-slate-700'
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Immunities */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 shrink-0">
              Can't Damage:
            </span>
            <div className="flex flex-wrap items-center gap-1 min-h-5">
              {noDamageTo.length > 0 ? (
                noDamageTo.map((type) => (
                  <PokemonTypeTag key={type} type={type} />
                ))
              ) : (
                <span className="text-slate-400 text-[11px] italic">
                  None
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 shrink-0">
              Immune To:
            </span>
            <div className="flex flex-wrap items-center gap-1 min-h-5">
              {noDamageFrom.length > 0 ? (
                noDamageFrom.map((type) => (
                  <PokemonTypeTag key={type} type={type} />
                ))
              ) : (
                <span className="text-slate-400 text-[11px] italic">
                  None
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <div className="pt-2.5 border-t border-slate-100">
        <button
          type="button"
          onClick={() => removeFromTeam?.(pokemon)}
          className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { PokemonTypeTag } from "../common/PokemonTypeTag";

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export default function PokemonDetail({
  pokemon,
  team = [],
  isTeamFull = false,
  addToTeam,
  removeFromTeam,
  goBack,
}) {
  const [isShiny, setIsShiny] = useState(false);
  const [isPlayingCry, setIsPlayingCry] = useState(false);

  if (!pokemon) return null;

  const isInTeam = team.some((p) => p.id === pokemon.id);
  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  // calculate total base stats
  const totalStats = pokemon.stats?.reduce((acc, curr) => acc + curr.value, 0) || 0;

  const currentImage = isShiny && pokemon.shinyImage
    ? pokemon.shinyImage
    : pokemon.image;

  // play pokemon cry
  function playCry() {
    try {
      const audio = new Audio(
        `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`
      );
      audio.volume = 0.15;
      setIsPlayingCry(true);
      audio.onended = () => setIsPlayingCry(false);
      audio.onerror = () => setIsPlayingCry(false);
      audio.play().catch(() => setIsPlayingCry(false));
    } catch {
      setIsPlayingCry(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto w-full space-y-4 my-auto">
      {/* Back Button */}
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all shadow-xs cursor-pointer"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span>Back to List</span>
      </button>

      {/* Main Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Image & Shiny Toggle */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-center w-36 h-36 relative">
              <img
                src={currentImage}
                alt={pokemon.name}
                className="w-28 h-28 object-contain transition-all duration-200"
              />
            </div>
            
            {/* Shiny Button */}
            {pokemon.shinyImage && (
              <button
                type="button"
                onClick={() => setIsShiny((prev) => !prev)}
                className={`
                  text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1.5
                  ${
                    isShiny
                      ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }
                `}
              >
                <span>{isShiny ? 'Shiny' : 'Normal'}</span>
              </button>
            )}
          </div>

          {/* Pokemon Info */}
          <div className="flex-1 text-center sm:text-left space-y-2.5 w-full">
            {/* Name & Cry */}
            <div className="flex items-center justify-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 capitalize">
                  {pokemon.name}
                </h2>
                <button
                  type="button"
                  onClick={playCry}
                  title="Play Cry"
                  className={`
                    p-1.5 rounded-lg border transition-all cursor-pointer
                    ${
                      isPlayingCry
                        ? 'bg-amber-300 border-amber-400 text-blue-950 scale-105 shadow-xs'
                        : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-amber-100 hover:text-amber-900 hover:border-amber-300 active:scale-95'
                    }
                  `}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </button>
              </div>

              <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {formattedId}
              </span>
            </div>

            {/* Types */}
            <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
              {pokemon.types?.map((type) => (
                <PokemonTypeTag key={type} type={type} />
              ))}
            </div>

            {/* Physical Info */}
            <div className="flex gap-4 text-xs text-slate-600 justify-center sm:justify-start pt-0.5">
              <div>
                <span className="font-semibold text-slate-700">Height:</span> {pokemon.height} m
              </div>
              <div>
                <span className="font-semibold text-slate-700">Weight:</span> {pokemon.weight} kg
              </div>
            </div>

            {/* Abilities */}
            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 justify-center sm:justify-start text-xs">
                <span className="font-semibold text-slate-700 mr-1">Abilities:</span>
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="capitalize bg-slate-100 border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[11px] font-medium"
                  >
                    {ability.replace('-', ' ')}
                  </span>
                ))}
              </div>
            )}

            {/* Action Button */}
            {(addToTeam || removeFromTeam) && (
              <div className="pt-2">
                {isInTeam ? (
                  <button
                    type="button"
                    onClick={() => removeFromTeam?.(pokemon)}
                    className="w-full sm:w-auto px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 active:scale-95 transition-all cursor-pointer"
                  >
                    Remove from Team
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => addToTeam?.(pokemon)}
                    disabled={isTeamFull}
                    className={`
                      w-full sm:w-auto px-4 py-1.5 rounded-lg text-xs font-semibold transition-all
                      ${
                        isTeamFull
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          : 'bg-amber-400 text-blue-950 hover:bg-amber-300 active:scale-95 cursor-pointer'
                      }
                    `}
                  >
                    {isTeamFull ? 'Team Full' : 'Add to Team'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Base Stats */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Base Stats
            </span>
            <span className="text-[11px] font-semibold text-slate-400 font-mono">
              Total: {totalStats}
            </span>
          </div>

          <div className="space-y-1.5">
            {pokemon.stats?.map((stat) => (
              <div key={stat.name} className="flex items-center gap-2.5 text-xs">
                <span className="w-16 text-slate-600 font-medium text-[11px]">
                  {STAT_LABELS[stat.name] || stat.name}
                </span>
                <span className="w-7 font-mono font-semibold text-slate-800 text-right text-[11px]">
                  {stat.value}
                </span>
                <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (stat.value / 200) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

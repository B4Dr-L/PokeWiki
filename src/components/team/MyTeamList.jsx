import { PokemonTypeTag } from "../common/PokemonTypeTag";
import TeamPokemonCard from "./TeamPokemonCard";
import EmptyTeamSlot from "./EmptyTeamSlot";

const NO_DAMAGE_TO = {
  normal: ['ghost'],
  fire: [],
  water: [],
  electric: ['ground'],
  grass: [],
  ice: [],
  fighting: ['ghost'],
  poison: ['steel'],
  ground: ['flying'],
  flying: [],
  psychic: ['dark'],
  bug: [],
  rock: [],
  ghost: ['normal'],
  dragon: ['fairy'],
  dark: [],
  steel: [],
  fairy: [],
};

const NO_DAMAGE_FROM = {
  normal: ['ghost'],
  fire: [],
  water: [],
  electric: [],
  grass: [],
  ice: [],
  fighting: [],
  poison: [],
  ground: ['electric'],
  flying: ['ground'],
  psychic: [],
  bug: [],
  rock: [],
  ghost: ['normal', 'fighting'],
  dragon: [],
  dark: ['psychic'],
  steel: ['poison'],
  fairy: ['dragon'],
};

export default function MyTeamList({ team = [], removeFromTeam, selectPokemon, goToPokemonList }) {
  // calculating immunities
  const noDamageFrom = team.map(pokemon => [
    ...new Set((pokemon.types || []).flatMap(type => NO_DAMAGE_FROM[type] || []))
  ]);

  const noDamageTo = team.map(pokemon => {
    const types = pokemon.types || [];
    if (types.length === 0) return [];
    const typeImmunities = types.map(type => NO_DAMAGE_TO[type] || []);
    return [
      ...typeImmunities.reduce((acc, curr) => {
        const currSet = new Set(curr);
        return acc.filter(item => currSet.has(item));
      })
    ];
  });

  const allTeamNoDamageTo =
    team.length > 0 && noDamageTo.length > 0
      ? [
          ...noDamageTo.reduce((acc, curr) => {
            const currSet = new Set(curr);
            return acc.filter(item => currSet.has(item));
          })
        ]
      : [];

  return (
    <div className="max-w-4xl mx-auto space-y-5 my-auto w-full">
      {/* Team Coverage Warning */}
      {allTeamNoDamageTo.length > 0 && (
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-800">
              <svg
                className="w-3.5 h-3.5 text-amber-600 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="font-semibold text-amber-950">Your team has no effective attacks against Pokémon of type:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              {allTeamNoDamageTo.map(type => (
                <PokemonTypeTag key={type} type={type} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => {
          const pokemon = team[index];

          return pokemon ? (
            <TeamPokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              team={team}
              noDamageTo={noDamageTo[index]}
              noDamageFrom={noDamageFrom[index]}
              selectPokemon={selectPokemon}
              removeFromTeam={removeFromTeam}
            />
          ) : (
            <EmptyTeamSlot
              key={`empty-slot-${index}`}
              onClick={goToPokemonList}
            />
          );
        })}
      </div>
    </div>
  );
}

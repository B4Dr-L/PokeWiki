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

export function PokemonTypeTag({type}){
    const colorClass = TYPE_COLORS[type.toLowerCase()] || 'bg-slate-100 text-slate-600 border-slate-200';
    return (
        <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize ${colorClass}`}
        >{type}</span>
    )
}
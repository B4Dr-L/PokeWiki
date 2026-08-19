const TYPES = [
  'all',
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
];

export default function FilterBar({ selectedType, onSelectType, totalCount = 0 }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label htmlFor="type-filter" className="text-xs font-bold text-slate-700 whitespace-nowrap">
          Filter by Type:
        </label>
        <select
          id="type-filter"
          value={selectedType}
          onChange={(e) => onSelectType(e.target.value)}
          className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg text-slate-800 capitalize cursor-pointer hover:border-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-all"
        >
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        
        {selectedType !== 'all' && (
          <button
            type="button"
            onClick={() => onSelectType('all')}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2 cursor-pointer transition-colors px-1"
          >
            Reset
          </button>
        )}
      </div>

      <span className="text-xs font-medium text-slate-500 self-end sm:self-auto">
        Showing <strong className="text-slate-800 font-semibold">{totalCount}</strong> Pokémon
      </span>
    </div>
  );
}

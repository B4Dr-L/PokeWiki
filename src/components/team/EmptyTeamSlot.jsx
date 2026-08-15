export default function EmptyTeamSlot({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50/50 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer min-h-124"
    >
      <svg
        className="w-6 h-6 stroke-[1.75]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xs font-medium">Add Pokémon</span>
    </button>
  );
}

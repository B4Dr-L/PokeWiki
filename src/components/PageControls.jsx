export function PageControls({page, totalPages, prevPage, nextPage, isPagePrev, isPageNext}){
    return(
        <div className="flex justify-center gap-5 items-center">
            {/*Previous Button*/}
            <button
              onClick={prevPage}
              disabled={!isPagePrev}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-blue-950 text-sm font-semibold rounded-xl hover:bg-amber-300 shadow-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-400 disabled:active:scale-100 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Previous</span>
            </button>

            {/*Pages Count*/}
            <span className="font-semibold text-slate-700 text-sm">
              Page {page} / {totalPages}
            </span>

            {/*Next Button*/}
            <button
              onClick={nextPage}
              disabled={!isPageNext}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-blue-950 text-sm font-semibold rounded-xl hover:bg-amber-300 shadow-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-400 disabled:active:scale-100 transition-all cursor-pointer"
            >
              <span>Next</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
    )
}
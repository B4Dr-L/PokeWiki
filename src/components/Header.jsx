import logoImg from '../assets/logo.png';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-blue-900 border-b border-blue-800 text-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <button 
          type="button"
          onClick={() => setActiveTab('PokemonList')}
          className="flex items-center gap-2 cursor-pointer focus:outline-hidden"
        >
          <img 
            src={logoImg} 
            alt="PokiWiki Logo" 
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </button>

        <nav className="flex items-center gap-2 bg-blue-950/50 p-1 rounded-xl border border-blue-800/60">
          {/* Pokemons Button */}
          <button
            type="button"
            onClick={() => setActiveTab('PokemonList')}
            className={`
              flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
              ${
                activeTab === 'PokemonList'
                  ? 'bg-amber-400 text-blue-950 font-semibold hover:bg-amber-300'
                  : 'text-blue-100 hover:text-white hover:bg-blue-800/60'
              }
            `}
          >
            <svg 
              className={`w-4 h-4 ${activeTab === 'PokemonList' ? 'text-blue-950' : 'text-blue-200'}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <circle cx="12" cy="12" r="3" fill={activeTab === 'PokemonList' ? 'currentColor' : 'none'} />
            </svg>
            <span>Pokemons</span>
          </button>

          {/* My Team Button */}
          <button
            type="button"
            onClick={() => setActiveTab('MyTeamList')}
            className={`
              flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer
              ${
                activeTab === 'MyTeamList'
                  ? 'bg-amber-400 text-blue-950 font-semibold shadow-xs hover:bg-amber-300'
                  : 'text-blue-100 hover:text-white hover:bg-blue-800/60'
              }
            `}
          >
            <svg 
              className={`w-4 h-4 ${activeTab === 'MyTeamList' ? 'text-blue-950' : 'text-blue-200'}`} 
              viewBox="0 0 24 24" 
              fill={activeTab === 'MyTeamList' ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>My Team</span>
          </button>
        </nav>
      </div>
    </header>
  );
}



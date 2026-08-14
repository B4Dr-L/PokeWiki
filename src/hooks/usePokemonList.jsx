import { useEffect, useState } from "react";
export function usePokemonList(limit = 20){
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)
    const [currUrl, setCurrUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
    const [nextUrl, setNextUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=20`)
    const [count, setCount] = useState(0)

    useEffect(()=>{
        const controller = new AbortController()
        async function fetchPokemons() {
            setLoading(true)
            setError(null)
            try{
                //fetching currUrl
                const listRes = await fetch(currUrl, {signal : controller.signal})
                if (!listRes.ok) throw new Error("Failed to fetch list");
                const listData = await listRes.json()
                setPrevUrl(listData.previous)
                setNextUrl(listData.next)
                setCount(listData.count)
                //fetching all Pokemons from currUrl array
                const detailPromises = listData.results.map(resault => fetch(resault.url, {signal : controller.signal}))
                const detailResponse = await Promise.all(detailPromises)
                const jsonPromises = detailResponse.map(res => res.json())
                const rawPokemons = await Promise.all(jsonPromises)
                const cleanedPokemons = rawPokemons.map((data) => ({
                    id: data.id,
                    name: data.name,
                    image: data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default,
                    types: data.types.map((t) => t.type.name),
                    stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
                    abilities: data.abilities.map((a) => a.ability.name),
                    height: data.height / 10, // in meters
                    weight: data.weight / 10, // in kg
                }));

                setPokemonList(cleanedPokemons)
            }
            catch(err){
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            }
            finally{
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchPokemons()
        return () => controller.abort()
    },[limit,currUrl])

    function prevPage(){
        if(prevUrl) setCurrUrl(prevUrl)
    }

    function nextPage(){
        if(nextUrl) setCurrUrl(nextUrl)
    }

    const isPagePrev = prevUrl !== null
    const isPageNext = nextUrl !== null

    const searchParams = new URLSearchParams(currUrl.split('?')[1] || '')
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const page = Math.floor(offset / limit) + 1
    

    return {
        pokemonList,
        isLoading,
        error,
        prevPage,
        nextPage,
        isPagePrev,
        isPageNext,
        page,
        count
    }
}

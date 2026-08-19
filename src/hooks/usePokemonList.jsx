import { useEffect, useState } from "react";

const TYPE_BASE_URL = "https://pokeapi.co/api/v2/type";
const POKEMON_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export function usePokemonList(limit = 20) {
  const [selectedType, setSelectedType] = useState("all");
  const [page, setPage] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleSelectType(type) {
    setSelectedType(type);
    setPage(1);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPokemons() {
      setLoading(true);
      setError(null);

      try {
        let urlsToFetch = [];

        if (selectedType === "all") {
          const offset = (page - 1) * limit;
          const listRes = await fetch(
            `${POKEMON_BASE_URL}?limit=${limit}&offset=${offset}`,
            { signal: controller.signal }
          );
          if (!listRes.ok) throw new Error("Failed to fetch Pokemon list");
          const listData = await listRes.json();

          setCount(listData.count);
          urlsToFetch = listData.results.map((item) => item.url);
        } else {
          const typeRes = await fetch(`${TYPE_BASE_URL}/${selectedType}`, {
            signal: controller.signal,
          });
          if (!typeRes.ok) throw new Error(`Failed to fetch ${selectedType} Pokemon`);
          const typeData = await typeRes.json();

          const allTypeUrls = typeData.pokemon.map((entry) => entry.pokemon.url);
          setCount(allTypeUrls.length);

          const offset = (page - 1) * limit;
          urlsToFetch = allTypeUrls.slice(offset, offset + limit);
        }

        const detailResponses = await Promise.all(
          urlsToFetch.map((url) => fetch(url, { signal: controller.signal }))
        );
        const rawPokemons = await Promise.all(
          detailResponses.map((res) => res.json())
        );

        const cleanedPokemons = rawPokemons.map((data) => ({
          id: data.id,
          name: data.name,
          image:
            data.sprites?.other?.["official-artwork"]?.front_default ||
            data.sprites?.front_default ||
            "",
          shinyImage:
            data.sprites?.other?.["official-artwork"]?.front_shiny ||
            data.sprites?.front_shiny ||
            "",
          types: data.types.map((t) => t.type.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          abilities: data.abilities.map((a) => a.ability.name),
          height: data.height / 10,
          weight: data.weight / 10,
        }));

        setPokemonList(cleanedPokemons);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPokemons();
    return () => controller.abort();
  }, [limit, page, selectedType]);

  const totalPages = Math.ceil(count / limit) || 1;

  function prevPage() {
    setPage((prev) => Math.max(1, prev - 1));
  }

  function nextPage() {
    setPage((prev) => Math.min(totalPages, prev + 1));
  }

  return {
    pokemonList,
    isLoading,
    error,
    page,
    totalPages,
    count,
    selectedType,
    setSelectedType: handleSelectType,
    prevPage,
    nextPage,
    isPagePrev: page > 1,
    isPageNext: page < totalPages,
  };
}

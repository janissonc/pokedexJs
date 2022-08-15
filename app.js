const fetchPokemon = () => {
    const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonPromeses = [];
    for (let i = 1; i <= 150; i++) {
        pokemonPromeses.push(
            fetch(getPokemonUrl(i))
            .then(res => res.json())
        )
    }
  Promise.all(pokemonPromeses)
  .then(pokemons => {
   
    const lisPokemons = pokemons.reduce((accumulator,pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        accumulator+=`
        <li class="card ${types[0]}">
            <img class="card-image " alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
            <h2 class="card-title">${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
        </li>`;
        return accumulator;
    },'')
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = lisPokemons
    //console.log(lisPokemons)
  })
}


fetchPokemon();
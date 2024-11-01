const pokemonList = document.getElementById('pokemon-list');
const detailsDiv = document.getElementById('pokemon-details');
// Sistema de raridade perfeito hein
function getRarity(index) {
    if (index < 50) return 'comum';
    if (index < 100) return 'raro';
    return 'lendário';
}

async function fetchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await response.json();
    displayPokemon(data.results);
}

function displayPokemon(pokemons) {
    pokemonList.innerHTML = ''; 
    pokemons.forEach((pokemon, index) => {
        const rarity = getRarity(index);
        const pokemonItem = document.createElement('div');
        pokemonItem.classList.add('pokemon', rarity); 
        pokemonItem.innerHTML = `
            <h2>${pokemon.name}</h2>
            <button onclick="showDetails('${pokemon.name}')">Ver Detalhes</button>
        `;
        pokemonList.appendChild(pokemonItem);
    });
}

async function showDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    detailsDiv.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
        <p>Altura: ${data.height / 10} m</p>
        <p>Peso: ${data.weight / 10} kg</p>
    `;
    detailsDiv.classList.remove('hidden');
}

function searchPokemon() {
    const query = document.getElementById('search').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon não encontrado');
            return response.json();
        })
        .then(data => {
            showDetails(data.name);
        })
        .catch(err => alert(err.message));
}

fetchPokemon();

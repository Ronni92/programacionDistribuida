const searchBtn = document.getElementById('search-btn');
const pokemonInput = document.getElementById('pokemon-input');
const pokemonContainer = document.getElementById('pokemon-container');
const loader = document.getElementById('loader');

// Función para buscar Pokémon
async function searchPokemon() {
    const pokemonNameOrId = pokemonInput.value.toLowerCase().trim();
    
    if (!pokemonNameOrId) {
        alert('Por favor ingresa un nombre o ID de Pokémon');
        return;
    }
    
    try {
        loader.style.display = 'block';
        pokemonContainer.innerHTML = '';
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        pokemonContainer.innerHTML = `
            <div class="error">
                ${error.message}
            </div>
        `;
    } finally {
        loader.style.display = 'none';
    }
}

// Función para mostrar el Pokémon
function displayPokemon(pokemon) {
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    
    pokemonContainer.innerHTML = `
        <div class="pokemon-card">
            <h2>${pokemon.name.toUpperCase()} #${pokemon.id}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemon-info">
                <p><strong>Tipo:</strong> ${types}</p>
                <p><strong>Altura:</strong> ${pokemon.height / 10}m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10}kg</p>
                <p><strong>Habilidades:</strong> ${abilities}</p>
            </div>
        </div>
    `;
}

// Event listeners
searchBtn.addEventListener('click', searchPokemon);
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});

// Opcional: Cargar un Pokémon al azar al inicio
function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // Hay 898 Pokémon en la API
    pokemonInput.value = randomId;
    searchPokemon();
}

// Descomenta la siguiente línea si quieres que cargue un Pokémon al azar al inicio
// window.addEventListener('DOMContentLoaded', getRandomPokemon);
const getAPIData = async (url) => {
    try {
        const result = await fetch(url)
        const data = await result.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

const pokeGrid = document.querySelector('.pokegrid')

async function loadPokemon(offset, limit){
    const data= await getAPIData('https://pokeapi.co/api/v2/pokemon/snorlax')
    populatePokeGrid(data)
}

function populatePokeGrid(pokemonArray){
//loop through array and populate individual pokemon cards 
    populatePokeCard(pokemonArray[0])
}

function populatePokeCard(pokemon){
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard,addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))
    //populate the front of the card

    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon){
    const pokeFront = document.createElement('figure')
    pokeFront.className = '.cardFace'
    const pokeImg = document.createElement('img')

}
loadPokemon(0, 0)
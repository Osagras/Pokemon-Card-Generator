const url = "https://pokeapi.co/api/v2/pokemon/"
const card = document.getElementById("card")
const btn = document.getElementById("btn")
const typeColor = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dark: "#705848",
    dragon: "#7038F8",
    steel: "#B8B8D0",
    fairy: "#F0B6BC",
};

let getPokeData = () => {
    // Generate random number between 1 and 151
    let i = Math.floor(Math.random()* 1017) + 1;
    // Combine pokeApi url with i
    const finalUrl = url + i;
    // Fetch generated URL
    fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => generateCard(data)) 
    
}


// Generate Card

let generateCard = (data) => {
    //Get necesaary data and assign it to variables
    console.log(data)
    const id = data.id;
    const imageSrc = data.sprites.other["official-artwork"].front_default;
    const pokeName = data.name;
    const statAtk = data.stats[1].base_stat;
    const statDef = data.stats[2].base_stat;
    const statSpd = data.stats[5].base_stat;

    const types = data.types.map(type => `<p class= "type ${type.type.name}">${type.type.name}</p>`)
    let allTypes = types.join('')

    let pokeId = data.id.toString()
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId
    }


    // Set themeColor based on pokemon type
    const themeColor = typeColor[data.types[0].type.name]
        

    card.innerHTML = `
    <h4 class = "dex">
    #${pokeId}
    </h4>
    <img src=${imageSrc} alt="">
    <h2 class="pokename">${pokeName}</h2>
    <div class="pokemon-types">
        ${allTypes}
    </div>
    <div class="stats">
        <div>
            <h3>${statAtk}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statDef}</h3>
            <p>Defense</p>
        </div>
        <div>
            <h3>${statSpd}</h3>
            <p>Speed</p>
        </div>
    </div>`;
    styleCard(themeColor)
}

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, white)`;
    console.log(styleCard)
}
btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData)

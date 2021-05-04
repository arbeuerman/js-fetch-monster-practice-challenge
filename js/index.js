//once page loads, show first 50 monsters
const monstersUrl = 'http://localhost:3000/monsters';
const monsters = document.getElementById('monster-container');
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}
let page = 1;

showTopMonsters(1);

function showTopMonsters()
{
    page = page < 1 ? 1 : page;
    const monstersUrlWithParams = `${monstersUrl}/?_limit=1000&_page=${page}`;
    fetch(monstersUrlWithParams)
    .then(res => res.json())
    .then(displayMonsters);
}

function displayMonsters(monstersData)
{
    monsters.innerHTML = '';
    monstersData.forEach(displayMonster);
}

function displayMonster(monster)
{
    const monsterElement = document.createElement('div');
    monsterElement.innerHTML = `
        <h4>Name: ${monster.name}</h4>
        <ul>
            <li> Age: ${monster.age}</li>
            <li> Description: ${monster.description}</li>
        </ul>
        <br></br>
    `;
    monsters.appendChild(monsterElement);
}

//have a form to create a new monster
const monsterForm = document.getElementById('monster-form');
monsterForm.addEventListener('submit', createNewMonster)

function createNewMonster(event)
{
    event.preventDefault();
    const name = event.target.name.value;
    const age = event.target.age.value;
    const description = event.target.description.value;
    const monster = {
        name: name,
        age: age,
        description: description
    };

    fetch(monstersUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(monster)
    })
    .then(res => res.json())
    .then(displayMonster);
}

//add button to go to next page of next 50 monsters
const forwardButton = document.getElementById('forward');
forwardButton.addEventListener('click', ()=>goToPage(1));
const backwardButton = document.getElementById('back');
backwardButton.addEventListener('click', ()=>goToPage(-1));

function goToPage(number)
{
    page = page + number;
    // console.log(page);
    showTopMonsters();
}
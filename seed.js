const axios = require('axios');
const { addOrUpdateCharacter } = require('./dynamo')

const seedData = async () => {

    const url = "http://hp-api.herokuapp.com/api/characters"

    try {
        const { data: characters } = await axios.get(url);
        const charactersPromise = characters.map((character, index) => addOrUpdateCharacter({...character, id: index + ''}));
        await Promise.all(charactersPromise);
    } catch (error) {
        console.error(error)
    }
}

seedData();
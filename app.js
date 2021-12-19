const express = require('express');
const app = express();
const { getCharacters, getCharacterById, addOrUpdateCharacter, deleteCharacter } = require('./dynamo')

app.use(express.json());

app.get('/characters', async (request, response) => {
    const { Items: characters } = await getCharacters();
    return response.json(characters)
})

app.get('/characters/:id', async (request, response) => {
    const { id } = request.params;
    const {Item: character} = await getCharacterById(id);
    return response.json(character)
})

app.put('/characters', async (request, response) => {
    const { body } = request;
    const { id } = body;
    await addOrUpdateCharacter(body);
    return response.json({message: 'Personagem criado/atualizado', id})
})

app.delete('/characters/:id', async (request, response) => {
    const { id } = request.params;
    await deleteCharacter(id);
    return response.json({message: 'Personagem deletado', id})
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
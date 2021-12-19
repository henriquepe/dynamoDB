const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "harrypotter-api";

const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME
    }
    const characters = await dynamoClient.scan(params).promise();
    console.log('characters', characters)
    return characters;
}

const addOrUpdateCharacter = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character
    }
    return await dynamoClient.put(params).promise();
}

const getCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }

    const character = await dynamoClient.get(params).promise()
    console.log('character', character)

    return character
}

const deleteCharacter = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id
        }
    }

    return await dynamoClient.delete(params).promise()
}

module.exports = {
    dynamoClient,
    getCharacterById,
    getCharacters,
    addOrUpdateCharacter,
    deleteCharacter
}


// getCharacterById("0")
// getCharacters();
// addOrUpdateCharacter({
//     id: "0",
//     "name": "Harry Potter",
//     "alternate_names": [
//       ""
//     ],
//     "species": "human",
//     "gender": "male",
//     "house": "Gryffindor",
//     "dateOfBirth": "31-07-1980",
//     "yearOfBirth": 1980,
//     "wizard": true,
//     "ancestry": "half-blood",
//     "eyeColour": "green",
//     "hairColour": "black",
//     "wand": {
//       "wood": "holly",
//       "core": "phoenix feather",
//       "length": 11
//     },
//     "patronus": "stag",
//     "hogwartsStudent": true,
//     "hogwartsStaff": false,
//     "actor": "Daniel Radcliffe",
//     "alternate_actors": [
//       ""
//     ],
//     "alive": true,
//     "image": "http://hp-api.herokuapp.com/images/harry.jpg"
//   })
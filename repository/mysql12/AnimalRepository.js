const db = require('../../config/mysql12/db');
const animalSchema = require('../../model/joi/Animal');

exports.getAnimals = () => {
    const query = 'SELECT a._id as a_id, a.animalName, a.species, a.birthDate, a.age, a.kidFriendly, vol._id as vol_id,  vol.volFirstName, vol.volLastName, vol.volEmail, vol.phoneNumber, adopt._id as adopt_id, ' +
        'adopt.firstName, adopt.lastName, adopt.email ' +
        'FROM Animal a ' +
        'left join Volunteer vol on a.vol_id = vol._id ' +
        'left join Adopter adopt on a.adopt_id = adopt._id'
    return db.promise().query(query)
        .then((results, fields) => {
            const animals = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results [0][i];
                const animal = {
                    _id: row.a_id,
                    animalName: row.animalName,
                    species: row.species,
                    birthDate: row.birthDate,
                    age: row.age,
                    kidFriendly: row.kidFriendly,
                    adopter: {
                        _id: row.adopt_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        email: row.email
                    },
                    volunteer: {
                        _id: row.vol_id,
                        firstName: row.volFirstName,
                        lastName: row.volLastName,
                        email: row.volEmail,
                        phoneNumber: row.phoneNumber,
                    }
                };
                animals.push(animal);
            }
            console.log(animals);
            return animals;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getAnimalByID = (animalId) => {

    const query = 'SELECT a._id as a_id, a.animalName, a.species, a.birthDate, a.age, a.kidFriendly, vol._id as vol_id,  vol.volFirstName, vol.volLastName, vol.volEmail, vol.phoneNumber, adopt._id as adopt_id, ' +
        'adopt.firstName, adopt.lastName, adopt.email ' +
        'FROM Animal a ' +
        'left join Volunteer vol on a.vol_id = vol._id ' +
        'left join Adopter adopt on a.adopt_id = adopt._id ' +
        'where a._id = ?'
    return db.promise().query(query, [animalId])
        .then((results, fields) => {
            const row = results [0][0];
            if (!row) {
                return {};
            }
            const animal = {
                _id: parseInt(animalId),
                animalName: row.animalName,
                species: row.species,
                birthDate: row.birthDate,
                age: row.age,
                kidFriendly: row.kidFriendly,
                adopter: {
                    _id: row.adopt_id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    email: row.email,
                },
                volunteer: {
                    _id: row.vol_id,
                    firstName: row.volFirstName,
                    lastName: row.volLastName,
                    email: row.volEmail,
                    phoneNumber: row.phoneNumber
                }
            };
            console.log(animal);
            return animal;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createAnimal = (newAnimalData) => {

    const vRes = animalSchema.validate(newAnimalData, {abortEarly:false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    console.log('createAnimal');
    console.log(newAnimalData);
    const sql = 'INSERT into Animal (animalName, species, birthDate, age, kidFriendly, adopt_id, vol_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
    return db.promise().execute(sql, [newAnimalData.animalName, newAnimalData.species, newAnimalData.birthDate, newAnimalData.age, newAnimalData.kidFriendly, newAnimalData.adopt_id, newAnimalData.vol_id]);
};

exports.updateAnimal = (animalId, animalData) => {

    const vRes = animalSchema.validate(animalData, {abortEarly:false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    const animalName = animalData.animalName;
    const species = animalData.species;
    const birthDate = animalData.birthDate;
    const age = animalData.age;
    const kidFriendly = animalData.kidFriendly;
    const adopt_id = animalData.adopt_id;
    const vol_id = animalData.vol_id;

    const sql = 'UPDATE Animal set animalName = ?, species = ?, birthDate = ?, age = ?, kidFriendly = ?, adopt_id = ?, vol_id = ? where _id = ?'
    return db.promise().execute(sql, [ animalName, species, birthDate, age, kidFriendly, adopt_id, vol_id, animalId]);

};

exports.deleteAnimal = (animalId) => {

    const sql1 = 'DELETE FROM Animal where _id = ?'

    return db.promise().execute(sql1, [animalId]);
};

exports.deleteManyAnimals = (animalIds) => {
    const sql = 'DELETE FROM Animal WHERE _id IN (?)'
    return db.promise().execute(sql, [animalIds]);
}


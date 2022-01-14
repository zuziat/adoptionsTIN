const db = require('../../config/mysql12/db');
const adoptSchema = require('../../model/joi/Adopter')

exports.getAdopters = () =>{
    return db.promise().query('SELECT * FROM Adopter')
        .then((results, fields) =>{
            console.log(results[0]);
            return results [0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        });
};

exports.getAdopterByID = (adoptId) =>{

    const query = 'SELECT adopt._id as adopt_id, adopt.firstName, adopt.lastName, adopt.email, vol._id as vol_id,  vol.volFirstName, vol.volLastName, vol.volEmail, vol.phoneNumber, ' +
        'a._id as a_id, a.animalName, a.species, a.birthDate, a.age, a.kidFriendly ' +
        'FROM Adopter adopt ' +
        'left join Animal a on a.adopt_id = adopt._id ' +
        'left join Volunteer vol on a.vol_id = vol._id ' +
        'where adopt._id = ?'
    return db.promise().query(query, [adoptId] )
        .then((results, fields) =>{
            const firstRow = results [0][0];
            if(!firstRow){
                return {};
            }
            const adopter = {
                _id: parseInt(adoptId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                email: firstRow.email,
                adoptions: []
            }
            for( let i=0; i<results[0].length; i++){
                const row = results[0][i];
                if(row.a_id){
                    const adoption = {
                        _id: row.a_id,
                        animalName: row.animalName,
                        species: row.species,
                        volunteer: {
                            _id: row.vol_id,
                            firstName: row.volFirstName,
                            lastName: row.volLastName,
                            email: row.volEmail,
                            phoneNumber: row.phoneNumber
                        }

                    };
                    adopter.adoptions.push(adoption);
                }
            }
            return adopter;
        })
        .catch(err=>{
            console.log(err);
            throw err;
        })
};

exports.createAdopter = (newAdopterData) =>{

    const vRes = adoptSchema.validate(newAdopterData, {abortEarly:false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    const firstName = newAdopterData.firstName;
    const lastName = newAdopterData.lastName;
    const email = newAdopterData.email;

    const sql = 'INSERT into Adopter (firstName, lastName, email) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email]);

};

exports.updateAdopter = (adoptId, adopterData) =>{

    const vRes = adoptSchema.validate(adopterData, {abortEarly:false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    const firstName = adopterData.firstName;
    const lastName = adopterData.lastName;
    const email = adopterData.email;

    const sql = 'UPDATE Adopter set firstName = ?, lastName = ?,  email= ? where _id = ?'
    return db.promise().execute(sql, [firstName, lastName, email, adoptId]);
};

exports.deleteAdopter = (adopterId) =>{
    const sql1 = 'DELETE FROM Animal where adopt_id = ?'
    const sql2 = 'DELETE FROM Adopter where _id = ?'

    return db.promise().execute(sql1, [adopterId])
        .then(()=>{
            db.promise().execute(sql2, [adopterId]);
        });

};
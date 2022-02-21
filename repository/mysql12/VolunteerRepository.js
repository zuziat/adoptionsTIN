const db = require('../../config/mysql12/db');
const volSchema = require('../../model/joi/Volunteer');

exports.getVolunteers = () => {
    return db.promise().query('SELECT * FROM Volunteer')
        .then((results, fields) => {
            console.log(results[0]);
            return results [0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getVolunteerByID = (volId) => {

    const query = 'SELECT  vol._id as _id,  vol.volFirstName, vol.volLastName, vol.volEmail, vol.phoneNumber, ' +
        'a._id as a_id, a.animalName, a.species, a.birthDate, a.age, a.kidFriendly, adopt._id as adopt_id, adopt.firstName, adopt.lastName, adopt.email ' +
        'FROM Volunteer vol ' +
        'left join Animal a on a.vol_id = vol._id ' +
        'left join Adopter adopt on a.adopt_id = adopt._id ' +
        'where vol._id = ?'
    return db.promise().query(query, [volId])
        .then((results, fields) => {
            const firstRow = results [0][0];
            if (!firstRow) {
                return {};
            }
            const volunteer = {
                _id: parseInt(volId),
                firstName: firstRow.volFirstName,
                lastName: firstRow.volLastName,
                email: firstRow.volEmail,
                phoneNumber: firstRow.phoneNumber,
                adoptions: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.a_id) {
                    const adoption = {
                        _id: row.a_id,
                        animalName: row.animalName,
                        species: row.species,
                        adopter: {
                            _id: row.adopt_id,
                            firstName: row.firstName,
                            lastName: row.lastName,
                            email: row.email
                        }

                    };
                    volunteer.adoptions.push(adoption);
                }
            }


            return volunteer;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};


exports.createVolunteer = (newVolData) => {

    const vRes = volSchema.validate(newVolData, {abortEarly: false});
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const firstName = newVolData.volunteerName;
    const lastName = newVolData.lastName;
    const email = newVolData.email;
    const phoneNumber = newVolData.phoneNumber;
    const sql = 'INSERT into Volunteer (volFirstName, volLastName, volEmail, phoneNumber) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email, phoneNumber]);

};

exports.updateVolunteer = (volId, volData) => {

    const vRes = volSchema.validate(volData, {abortEarly: false});
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const firstName = volData.volunteerName;
    const lastName = volData.lastName;
    const email = volData.email;
    const phoneNumber = volData.phoneNumber;
    const sql = 'UPDATE Volunteer set volFirstName = ?, volLastName = ?,  volEmail = ?, phoneNumber = ? where _id = ?'
    return db.promise().execute(sql, [firstName, lastName, email, phoneNumber, volId]);
};

exports.deleteVolunteer = (volId) => {

    const sql1 = 'DELETE FROM Animal where vol_id = ?'
    const sql2 = 'DELETE FROM Volunteer where _id = ?'

    return db.promise().execute(sql1, [volId])
        .then(() => {
            db.promise().execute(sql2, [volId]);
        });
};

exports.findByEmail = (email) => {
    const query = 'SELECT  vol._id as _id,  vol.volFirstName, vol.volLastName, vol.volEmail, vol.phoneNumber, vol.password, ' +
        'a._id as a_id, a.animalName, a.species, a.birthDate, a.age, a.kidFriendly, adopt._id as adopt_id, adopt.firstName, adopt.lastName, adopt.email ' +
        'FROM Volunteer vol ' +
        'left join Animal a on a.vol_id = vol._id ' +
        'left join Adopter adopt on a.adopt_id = adopt._id ' +
        'where vol.volEmail = ?'
    return db.promise().query(query, [email])
        .then((results, fields) => {
            const firstRow = results [0][0];
            if (!firstRow) {
                return {};
            }
            const volunteer = {
                _id: firstRow._id,
                firstName: firstRow.volFirstName,
                lastName: firstRow.volLastName,
                email: firstRow.volEmail,
                phoneNumber: firstRow.phoneNumber,
                password: firstRow.password,
                adoptions: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.a_id) {
                    const adoption = {
                        _id: row.a_id,
                        animalName: row.animalName,
                        species: row.species,
                        adopter: {
                            _id: row.adopt_id,
                            firstName: row.firstName,
                            lastName: row.lastName,
                            email: row.email
                        }

                    };
                    volunteer.adoptions.push(adoption);
                }
            }


            return volunteer;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}


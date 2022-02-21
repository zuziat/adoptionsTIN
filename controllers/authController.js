const VolunteerRepository = require('../repository/mysql12/VolunteerRepository')

exports.login = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    VolunteerRepository.findByEmail(email)
        .then(vol =>{
            if(!vol){
                res.render('index',{
                    navLocation:'',
                    loginError: "Nieprawiodłowy login lub hasło!!!!"
                })
            }else if(vol.password === password){
                req.session.loggedUser = vol;
                res.redirect('/');
            }else {
                res.render('index',{
                    navLocation: '',
                    loginError: "Nieprawiodłowy login lub hasło???"
                })
            }
        })
        .catch(err =>{
            console.log(err);
        });
}

exports.logout = (req, res, next) =>{
    req.session.loggedUser = undefined;
    res.redirect('/');
}
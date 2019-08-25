var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next()
     } else {
        var sessionToken = req.headers.authorization;
        console.log(sessionToken) 
        if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' }); 
        else { 
            jwt.verify(sessionToken, "secret", (err, decoded) => { 
                console.log(decoded);
                //5
                //below this basically finds a the user which matches the token, then next sends it to any routers that use this validation.
                if(decoded){
                    console.log('attempting to find user')
                    User.findOne({where: { id: decoded.id}}).then(user => { //6
                        req.user = user; //7
                        next();
                    },
                    function(){ //8
                        res.status(401).send({error: 'Not authorized'});
                    });
                } else { //9
                    res.status(400).send({error: 'Not authorized'});
                }
            });
        }
    }
}
const jwtToken = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const getAuth = req.get('Authorization');
    if(!getAuth) {
        req.isAuth = false;
        //console.log(req.isAuth);
        return next();
    }
    const token = getAuth.split(' ')[1];
    if(!token || token == '') {
        req.isAuth = false;
        //console.log(req.isAuth);
        return next();
    }
    let decodedJwtToken;
    try {
        decodedJwtToken = jwtToken.verify(token, 'key');
    } catch(err) {
        req.isAuth = false;
        //console.log(req.isAuth);
        return next();
    }
    if(!decodedJwtToken) {
        req.isAuth = false;
        //console.log(req.isAuth);
        return next();
    }
    req.isAuth = true;
    req.userId = decodedJwtToken.userId;
    //console.log(req.isAuth);
    next();

};
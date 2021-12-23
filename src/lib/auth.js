module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();

        }
        return res.redirect('/');
    },
    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/controlenvases');
    },
    isNotUserAdmin(req,res,next){
        if(req.user.rol === 'ADMINISTRADOR'){
            return next();
        }
        return res.redirect('/controlenvases');

    }
}

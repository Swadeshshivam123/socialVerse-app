
//We'll access this function in "routes/users.js"
module.exports.profile = function(req, res){
    res.render('user_profile', {
        title: 'Users/profile'
    });
};

//Rendering the 'Sign Up' page for user
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'socialVerse | Sign Up'
    });
};

//Rendering the 'Sign In' page for user
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'socialVerse | Sign In'
    });
};
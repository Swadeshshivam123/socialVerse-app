
//We'll access this function in "routes/users.js"
module.exports.profile = function(req, res){
    res.render('user_profile', {
        title: 'Users/profile'
    });
};
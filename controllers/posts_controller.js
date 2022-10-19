
//We'll access this function in "routes/posts.js"

module.exports.addpost = function(req, res){
    res.render('posts', {
        title: 'Posts/add posts'
    });
};
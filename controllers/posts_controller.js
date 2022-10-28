//Creating controller for 'posts'

//Importing 'post.js' model(database) from 'models' directory.
const Post = require('../models/post');

//We'll access these functionalities in "routes/posts.js"


//Creating a post from the data obtainde from the 'create-post' form.
// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id,
//     },
//     //Callback Function
//     function(err, post){
//         //Error Handling
//         if(err){
//             console.log("Error in creating post.!");
//         }
//         return res.redirect('back');
//     }
//     );
// };

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}
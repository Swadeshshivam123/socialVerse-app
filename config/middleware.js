//Middleware to take out the flash messages from 'req.flash' and passing them to be available in 'res.flash' to be used in the 'views'
module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}
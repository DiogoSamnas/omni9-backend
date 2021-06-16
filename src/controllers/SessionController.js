const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const {email , name} = req.body;

        let user = await User.findOne({email});
        
        if(!user){
            user = await User.create({name,email});
        }

        return res.json(user);
    }
};
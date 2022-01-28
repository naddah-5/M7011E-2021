const crypt = require('bcryptjs');
const token = require('jsonwebtoken');
const User = require('../../models/user');


module.exports = {
    createUser: async args => {
        try {
            const dbUser = await User.findOne({email: args.userInput.email})
            if(dbUser) {
             throw new Error('Email address is already used by another user')
        }
            const hashedPassword = await crypt.hash(args.userInput.password, 14)
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                birthDate: args.userInput.birthDate,
                address: args.userInput.address
            });
            const result = await user.save();
      
            return {...result._doc, password: null, _id: result.id};
      
        }  catch(err) {
            throw err;
        } 
    },
    getUser: async (args,req) => {
        //if(!req.isAuthenticated) {
            //throw new Error('Not authorized!');
        //}
        try {
            const user = await User.findOne({_id: args.getUser.userId})
            return {...user._doc,
                _id: user.id};

        } catch(err) {
            throw err;
        }
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email :email});
        if(!user) {
            throw new Error('The user does not exist');
        }
        const check = await crypt.compare(password, user.password);
        if(!check) {
            throw Error('Incorrect credentials');
        }
        const getToken = token.sign({userId: user.id, email: user.email},'key',{
            expiresIn: '1h'
            
        });
        return {userId: user.id, token: getToken, tokenExpiration: 1};
    }
};



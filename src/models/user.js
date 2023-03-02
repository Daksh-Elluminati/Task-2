const mongoose = require('mongoose');
const validator = require('validator');

mongoose.set('strictQuery', true)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if (validator.isMobilePhone(value)) {
                throw new Error("Please enter a valid phone number")
            }
        }
    },avatar: {
        type: String
    }
},{
    timestamps: true
})

userSchema.methods.toJSON = function () {  
    const user = this
    const userObject = user.toObject()
    
    delete userObject.createdAt,
    delete userObject.updatedAt,
    delete userObject.__v;
    return userObject;
}

const User = mongoose.model('User', userSchema);

module.exports = User

/* Add user check
const user = new User({
    name: 'Daksh Ghetia',
    email: 'email1@gmail.com',
    phone: '+1242 7043327239'
})

user.save().then((result) => {
    console.log('User inserted successfully');
}).catch((error) => {
    console.log(error);
});
*/

const mongoose = require('mongoose')
const crypto = require('crypto')
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minLength: [2, "Name must be atleast 2 letters long"]
    },
    email: { 
        type: String, 
        required: true,  
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: { 
        type: String,
        required: true, 
        minLength: [6, "Password must be atleast 6 letters long"]},
    level: { 
        type: String, 
        required: true,
        enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"], 
        default: "BEGINNER"
    },
    is_admin: {type: Boolean, default :false}
})



UserSchema.pre("save", async function(next)  {
    var user = this
    if(user.isModified("password")) {
        const hashed = crypto.createHash("sha1").update(user.password).digest("hex")
        user.password = hashed
    }
    if(user.isModified("email")) {
        const existingUser = await User.findOne({email : user.email})
        if(existingUser) {
            return next("Email address already exists")
        }
    }
    next()
})

UserSchema.methods.comparePassword = function(candidatePassword) {
    var user = this
    const hashed = crypto.createHash("sha1").update(candidatePassword).digest("hex")
    if(user.password !== hashed) return false // passwords do not match
    return true // passwords do  match
}

const User = mongoose.model("users", UserSchema)



module.exports = User
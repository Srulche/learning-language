

const User = require('../models/User')
const { createToken } = require('../utils')



// create a new user with the user object
// throws email already exists exception
async function signUp(user) {
    const newUser = await User.create(user)
    return newUser
}


async function signIn(user) {
    const existingUser = await User.findOne({email: user.email})
    if(!existingUser.comparePassword(user.password)) {
        throw "Passwords do not match"
    }
    // create token

    const token = createToken({
        id: existingUser._id,
        is_admin: existingUser.is_admin
    })

    return token
}


async function me(userPartial) {
    const user = await User.findById(userPartial.id)
    return user
}


module.exports = {
    signUp,
    signIn,
    me
}
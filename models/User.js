const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        fullName: {
            type: String,
            required: true,
        },
        mobileNumber: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        address: {
            type: String,
            default: null
        },
        profileImage: {
            type: String,
            default: null
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        userType: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema)
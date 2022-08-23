const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const LikedImagesSchema = mongoose.Schema(
    {
        imageId: {
            type: mongoose.Schema.ObjectId, ref: 'PhotoGallery',
            default: null
        },
        userId: {
            type: mongoose.Schema.ObjectId, ref: 'User',
            default: null
        },
        like: {
            type: Boolean,
            default: false,
        },
        dislike: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
)
LikedImagesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('LikedImages', LikedImagesSchema)

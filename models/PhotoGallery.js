const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const PhotoGallerySchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        },
        imageName: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true
    }
)
PhotoGallerySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PhotoGallery', PhotoGallerySchema)
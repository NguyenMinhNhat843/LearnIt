const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'please provide tittle'],
        unique: true
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        default: 'TO LEARN',
        enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('courses', CourseSchema);
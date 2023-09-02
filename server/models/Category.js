// In this file I have described how our Category model should look like by describing Schema for that which means what type of data should category model store.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "This is a mandatory field"]
    },
    image: {
        type: String,
        required: [true, "This is a mandatory field"]
    },
});


// In this line we are doing two things:
// 1) We are making the model of our schema by the name Category.
// 2) We are exporting it so that we can use it in other files also.
module.exports = mongoose.model('Category', categorySchema);
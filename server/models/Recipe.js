// In this fiel we are describing how our recipe model should look like by describing the schema for that which means which type of data hsould be stored in Recipe model.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: [true, "This is a mandatory field"]
    },
    description:{
        type: String,
        required: [true, "This is a mandatory field"]
    },
    email:{
        type: String,
        required: [true, "This is a mandatory field"]
    },
    ingredients:{
        type: Array,
        required: [true, "This is a mandatory field"]
    },
    category:{
        type: String,
        required: [true, "This is a mandatory field"],
        // Here, we are describing an enum.
        // Enum is a schema type option which conatins set of values of same type which are allowed for that field.
        // Like here, we only allowed to add these 5 values to category. If we try to add other it will throw an error.
        enum: ["Thai", "American", "Chinese", "Mexican", "Indian"]
       
    },
    image:{
        type: String,
        required: [true, "This is a mandatory field"]
    },
});

//This .index part we are only doing for the search. Come here when you building page for search box. This is known as indexing.
recipeSchema.index({name:'text', description:'text'})  
// Wildcard indexing
recipeSchema.index({"$**": 'text'});  


// Here, we are doing two things:
// 1) We are making model from our defined schema by the naem Recipe
// 2) We are exporting that model so that we could use it in different files.

module.exports = mongoose.model('Recipe', recipeSchema);



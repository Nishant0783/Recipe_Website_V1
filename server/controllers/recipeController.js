require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');




/***
 * GET/
 * Homepage
 */
exports.homepage = async(req, res)=>{
    try{
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber)
        const latest = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        const thai = await Recipe.find({category: "Thai"}).limit(limitNumber);
        const american = await Recipe.find({category: "American"}).limit(limitNumber);
        const chinese = await Recipe.find({category: "Chinese"}).limit(limitNumber);

        const food = { latest, thai, american, chinese };

        res.render('index', {title: 'Cooking Blog -Home', categories, food});
    }catch(err){
        res.status(500).send({message: err.message || "Error Occured"});
    }
    // res.render("index", { title: 'Cooking Blog - Home' } );
}


  

/***
 * GET/ categories
 * Categories
 */
exports.exploreCategories = async(req, res)=>{
    try{
     
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        const categoryId = "Explore Latest";

        
 
        res.render('categories', {title: 'Cooking Blog -Categories', categories, categoryId});
    }catch(err){
        res.status(500).send({message: err.message || "Error Occured"});
    }
    // res.render("index", { title: 'Cooking Blog - Home' } );
}



/***
 * GET/ categories/:id
 * Categories by Id
 */
exports.exploreCategoriesById = async(req, res)=>{
    try{
        let categoryId = req.params.id;
    
        const limitNumber = 20;
        const categoriesById = await Recipe.find({'category': categoryId}).limit(limitNumber);
        res.render('categories', {title: 'Cooking Blog -Categories', categoriesById, categoryId});
    }catch(err){
        res.status(500).send({message: err.message || "Error Occured"});
    }
    // res.render("index", { title: 'Cooking Blog - Home' } );
}
        
     

        
       






/*** 
 * GET /recipe/:id
 * Recipe
 */
exports.exploreRecipe = async(req, res)=>{
    try{
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        
        res.render('recipe', {title: 'Cooking Blog -Recipe', recipe});
    }catch(err){
        res.status(500).send({message: err.message || "Error Occured"});
    }
    // res.render("index", { title: 'Cooking Blog - Home' } );
}
    



/*** 
 * post /search 
 * Search
 */
exports.searchRecipe = async(req, res)=>{
    try{
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive: true}});
        // res.json(recipe);
        res.render('search', { title: 'Cooking Blog -Search', recipe});
    }catch(err){
        res.status(500).send({message: err.message || "Error Occured"});
    }
}



/*** 
 * GET /exploreLatest
 * Explore Latest
 */
exports.exploreLatest = async(req, res)=>{
    try{
       const limitNumber = 20;
       const recipe = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        
        res.render('exploreLatest', {title: 'Cooking Blog -Explore Latest', recipe});
    }catch(err){
        res.status(500).send({message: err.message || "Error Occured"});
    }
    // res.render("index", { title: 'Cooking Blog - Home' } );
}



/*** 
 * GET /exploreRandom
 * Random Latest
 */
exports.exploreRandom = async(req, res)=>{
    try{
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random()*count);
        let recipe = await Recipe.findOne().skip(random).exec();
        // res.json(recipe);
        res.render('exploreRandom', {title: 'Cooking Blog -Explore Random', recipe});
   }catch(err){
       res.status(500).send({message: err.message || "Error Occured"});
   }
   // res.render("index", { title: 'Cooking Blog - Home' } );
}
        



/*** 
 * GET /submitRecipe
 * Submit Recipe
 */
exports.submit = async(req, res)=>{
    const infoErrorsObj = req.flash('infoError');
    const infoSubmitObj = req.flash('infoSubmit');
    
    res.render('submitRecipe', {title: 'Cooking Blog -Submit Recipe', infoErrorsObj, infoSubmitObj});
}


/*** 
 * POST /submitRecipe
 * Submit Recipe
 */
exports.submitRecipeOnPost = async(req, res)=>{
    try{
        let imageUploadFile;
        let uploadPath;
        let newImageName;
        if(!req.files || Object.keys(req.files).length === 0){
            console.log("No files were uploaded");
        }else{
            imageUploadFile = req.files.image
            newImageName = Date.now()+imageUploadFile.name;

            uploadPath = require('path').resolve('./')+'/public/uploads/' + newImageName;
            imageUploadFile.mv(uploadPath, function(err){
                if(err){
                    return res.status(500).send(err);
                }
            })
        }
        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description ,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        });
        await newRecipe.save();
        req.flash('infoSubmit', 'Recipe has been added.');
        res.redirect('/submitRecipe');
    }catch(err){
        req.flash('infoError', err);
        res.redirect('/submitRecipe');
    }
}




        





    







    























































// async function insertDummyCategoryData(){
//     try{
//         await Category.insertMany([
//             {
//                 name:"Thai",
//                 image: "thai-food.jpg"
//             },
//             {
//                 name:"American",
//                 image: "american-food.jpg"
//             },
//             {
//                 name:"Chinese",
//                 image: "chinese-food.jpg"
//             },
//             {
//                 name:"Mexican",
//                 image: "mexican-food.jpg"
//             },
//             {
//                 name:"Indian",
//                 image: "indian-food.jpg"
//             },
//             {
//                 name:"Spanish",
//                 image: "spanish-food.jpg"
//             },
//         ]); 
//     }catch(err){
//         console.log(err);
//     }
// }

// insertDummyCategoryData();





// async function insertDummyRecipeData(){
//     try{
//         await Recipe.insertMany([
//       { 
//         name: "Pasta",
//         description: "Indulge in the comforting embrace of our delectable pasta dish that brings together the finest ingredients to create a symphony of flavors. Our signature pasta recipe boasts al dente pasta perfectly coated in a velvety marinara sauce, enriched with aromatic herbs and succulent tomatoes, each bite reminiscent of an Italian countryside. As you take your first forkful, you'll encounter tender pieces of grilled chicken, adding a protein-packed twist to this classic favorite.",
//         email: "recipeemail@raddy.co.uk",
//         ingredients: [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         category: "Mexican", 
//         image: "southern-friend-chicken.jpg"
//       },
//       { 
//         name: "Noodles",
//         description: "Delve into the irresistible world of noodles with our mouthwatering recipe. These tender strands of delight are expertly crafted, offering a medley of flavors that dance on your taste buds. Indulge in the harmonious blend of textures as each noodle seamlessly combines with our savory sauce, a symphony of umami-infused ingredients. Whether you prefer the bold notes of soy and ginger or the fiery kick of chili and garlic, our noodles promise a delightful culinary journey. With each forkful, you'll experience a burst of satisfaction, as the delicate balance of ingredients creates a dish that's both comforting and exciting. Elevate your dining experience with our tantalizing noodle creation.",
//         email: "recipeemail@raddy.co.uk",
//         ingredients: [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         category: "Chinese", 
//         image: "southern-friend-chicken.jpg"
//       },
//       {
//         name: "Indian Curry",
//         description: "Embark on a flavorful voyage with our authentic Indian curry recipe. Immerse yourself in the rich tapestry of spices that define this culinary masterpiece. Our curry is a harmonious blend of aromatic herbs and carefully selected spices, simmered to perfection. Tender chunks of protein or hearty vegetables bathe in the luxurious sauce, absorbing the essence of ginger, garlic, and fragrant cardamom. Each spoonful unveils a symphony of tastes, from the warmth of cumin to the subtle heat of chili. Served with fluffy basmati rice or fresh naan, this curry experience encapsulates the heart and soul of Indian cuisine, offering a captivating feast for your senses.",
//         email: "user@example.com",
//         ingredients: [
//             "1 cup yogurt",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//         ],
//         category: "Indian",
//         image: "burger.jpg"
//       },
//       {
//         name: "Classic Burger",
//         description: "Savor the timeless delight of our classic burger recipe. Crafted to perfection, this iconic favorite captures the essence of American comfort food. A succulent beef patty, seasoned to perfection, takes center stage, nestled within a soft, toasted bun. Layers of crisp lettuce, juicy tomato slices, and zesty pickles provide a refreshing crunch, while the tangy kiss of special sauce adds an irresistible dimension. Topped with melted cheddar cheese, the burger's decadent richness is a true indulgence. Each bite is a symphony of textures and flavors, a reminder of simple pleasures and the timeless joy of relishing a perfectly crafted burger.",
//         email: "user@example.com",
//         ingredients: [
//             "1 level teaspoon beef patty",
//             "1 level teaspoon lettuce",
//             "1 level teaspoon hot smoked paprika",
//         ],
//         category: "American",
//         image: "burger.jpg"
//       },
//       {
//         name: "Spicy Thai Curry",
//         description: "Embark on a culinary adventure with our Spicy Thai Curry recipe. This vibrant dish is a tantalizing fusion of flavors that transport you to the bustling markets of Thailand. Succulent pieces of tender protein, enveloped in a bold and aromatic blend of red curry paste, coconut milk, and fragrant herbs, create a symphony of taste and heat. The balance of lemongrass, kaffir lime leaves, and Thai basil infuses every bite with an exotic essence. Ignite your taste buds with the perfect harmony of spice and creaminess, complemented by a bed of fragrant jasmine rice. Discover the art of Thai cuisine in every mouthful.",
//         email: "user@example.com",
//         ingredients: [
//             "1 level teaspoon Chicken",
//             "1 level teaspoon Coconut milk",
//             "1 level teaspoon That-curry paste",
//         ],
//         category: "Thai",
//         image: "thai_curry.jpg"
//     }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDummyRecipeData();





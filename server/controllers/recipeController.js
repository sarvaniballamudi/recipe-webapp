require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

//GET /
exports.homepage = async(req,res) => {

    try {
        const categories = await Category.find({}).limit(5);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(5);
        const food = {latest};
        res.render("index", {title: "Mana Ruchulu - An Authentic Telugu Recipes Blog", categories, food});     
    } catch (error) {
        console.log(error);
    }
}

//GET /recipes/:id
exports.getRecipesById = async(req,res) => {
    try {
        const resultRecipe = await Recipe.findById(req.params.id);
        res.render("recipe", {title: "Mana Ruchulu - Recipe", resultRecipe});
    } catch (error) {
        console.log(error);
    }
}

exports.getCategoryById = async(req, res) => {
    try{
        const resultCategories = await Recipe.find({"category": req.params.id});
        res.render("categories", {title: "Mana Ruchulu - Explore Categories", resultCategories});
    } catch (error) {
        console.log(error);
    }
}

//GET /categories
exports.getCategories = async(req,res) => {
    try {
        const categories = await Category.find({}).limit(6);
        res.render("categories", {title: "Mana Ruchulu - Explore Categories", categories});
    } catch (error) {
        console.log(error);
    }
}

exports.searchRecipes = async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm;
        const searchQuery = { 
            $text: { 
                $search: searchTerm, 
                $diacriticSensitive: true
            }
        }; //see future.txt
        let recipe = await Recipe.find(searchQuery);
        res.render("search", { title: "Mana Ruchulu - Search", recipe});
    } catch(error) {
        console.log(error);
    }
}

exports.submitRecipe = async (req, res) => {
    try {
        const errorsObj = req.flash("infoErrors");
        const submitObj = req.flash("infoSubmit"); 
        res.render("submitRecipe", {"title": "Submit your recipe", errorsObj, submitObj});
    } catch (error) {
        console.log(error);
    }
}

exports.addRecipe = async (req, res) => {
    try {
        let imageFile, uploadPath, newImageName;
        if(!req.files || Object.keys(req.files).length === 0) {
            console.log("No file uploaded.");
        } else {
            imageFile = req.files.image;
            newImageName = Date.now() + imageFile.name;

            uploadPath = require("path").resolve("./") +"/public/images/uploads/" + newImageName;

            imageFile.mv(uploadPath, (err) => {
                if(err) {
                    res.status(500).send(err);
                }
            })
        }
        const newRecipe = new Recipe({
            name: req.body.name,
            image: newImageName,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            category: req.body.category
        });

        await newRecipe.save();

        req.flash('infoSubmit', 'Recipe has been added.');
        res.redirect('/submit-recipe');
        
    } catch (error) {
        req.flash('infoErrors', error);
        res.redirect('/submit-recipe');
    }
}

exports.about = async (req, res) => {
    try {
        res.render("about", {title: "Mana Ruchulu - About Us"});
    } catch (error) {
        console.log(error);
    }
}

// async function addDummyRecipeData() {
//     await Recipe.insertMany([
//         {
//             "name": "Appalu",
//             "image": "appam.jpg",
//             "ingredients": [
//                 "1½ cup water",
//                 "1½ tsp ghee",
//                 "1 cup coarse rava",
//                 "1 cup Sugar",
//                 "¼ tsp cardamom powder",
//                 "Ghee for frying"
//             ],
//             "instructions": [
//                 "In a large kadai take 1 cup water and ½ tsp ghee.",
//                 "Get the water to a boil.",
//                 "Add 1 cup rava stirring continuously to avoid any lump formation.",
//                 "Keep stirring until the water is absorbed completely.",
//                 "Cover, and simmer for 2 minutes making sure the rava is cooked well.",
//                 "Now add 1 cup sugar and mix well.",
//                 "Sugar starts to melt, mash the rava if there are any lumps.",
//                 "Cover and simmer for 2 minutes until the water is absorbed completely.",
//                 "The mixture turns soft and fluffy.",
//                 "Transfer to a plate and cool slightly.",
//                 "Add 1 tsp ghee and ¼ tsp cardamom powder. mix well.",
//                 "Knead for a minute making sure the dough is soft and non-sticky.",
//                 "Grease hands with oil and pinch a ball sized dough.",
//                 "Smoothen out and flatten slightly.",
//                 "Deep fry in hot oil or ghee. frying in ghee will enhance the flavour.",
//                 "Flip over and fry on both sides on medium flame.",
//                 "Fry until the appalu turns golden brown and crisp.",
//                 "Press slightly, and remove oil. drain off over kitchen towel to remove excess oil."
//             ],
//             "category": "Sweets"
//         }, 
//         {
//             "name": "Aloo Fry",
//             "image": "aloofry.jpg",
//             "ingredients": [
//                 "2 tbsp oil",
//                 "4 Aloo Cubed",
//                 "¾ tsp chilli powder",
//                 "½ tsp salt"
//             ],
//             "instructions": [
//                 "In a large kadai heat 2 tbsp oil.",
//                 "Add 4 potato and mix well making sure the oil is coated well. make sure to cut the aloo on equal sizes and rinse well.",
//                 "Stir occasionally, and fry on medium flame.",
//                 "Spread the aloo over the kadai making sure the base is roasted well.",
//                 "Once the base turns golden brown, give a stir.",
//                 "Fry on medium flame until the aloo turns golden brown and crisp.",
//                 "now add ¾ tsp chilli powder and ½ tsp salt. mix well."
//             ],
//             "category": "Curries"   
//         }
//     ])
// }

// addDummyRecipeData();

// async function addDummyCategory(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "Breakfast",
//         "image": "breakfast.jpg"
//       },
//       {
//         "name": "Curries",
//         "image": "curry.jpg"
//       }, 
//       {
//         "name": "Pickles",
//         "image": "pachadi.jpg"
//       },
//       {
//         "name": "Sweets",
//         "image": "sweet.jpg"
//       }, 
//       {
//         "name": "Snacks",
//         "image": "snacks.jpg"
//       },
//       {
//         "name": "Podulu",
//         "image": "podi.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// addDummyCategory();


//½ Cup Ghee, 1 Cup Rava, 2 tbsp Raisins, 2 tbsp Cashews, 3 Cups Hot Water, ½ Cup Sugar

// Add ¼ cup ghee to the pan., Add dry fruits, rava to the pan., Roast rava on medium flame till it turns golden brown., Add hot water to the roasted rava and mix., Rava combines to a soft mould.,  Add sugar to the rava and let dissolve., Now add cardamom powder and food colour (optional).,  Add the remaining ¼ cup Ghee and stir well until ghee floats., Enjoy hot or cold!
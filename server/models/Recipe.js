const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: Array,
    instructions: Array,
    category: { //see future.txt
        type: String,
        enum: ["Breakfast", "Curries", "Pickles", "Sweets", "Snacks", "Podulu"]
    }
})

recipeSchema.index({name: "text"});

module.exports = mongoose.model("Recipe", recipeSchema);
const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController.js");

router.get("/", recipeController.homepage);
router.get("/categories", recipeController.getCategories);
router.get("/recipes/:id", recipeController.getRecipesById);
router.get("/categories/:id", recipeController.getCategoryById);
router.post("/recipes/search", recipeController.searchRecipes);
router.get("/submit-recipe", recipeController.submitRecipe);
router.post("/submit-recipe", recipeController.addRecipe);
router.get("/about", recipeController.about);

module.exports = router;
let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let addInstructionsBtn = document.getElementById("addInstructionsBtn");

let ingredientList = document.querySelector('.ingredientList');
let instructionList = document.querySelector(".instructionList");

let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];
let instructionDiv = document.querySelectorAll(".instructionDiv")[0];

addIngredientsBtn.addEventListener('click', () => {
  let newIngredients = ingredientDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});

addInstructionsBtn.addEventListener("click", () => {
    let newInstructions = instructionDiv.cloneNode(true);
    let input = newInstructions.getElementsByTagName("input")[0];
    input.value = "";
    instructionList.appendChild(newInstructions);
});
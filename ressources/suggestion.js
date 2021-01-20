// selection elements
const result = document.getElementById("result");
const chooseButton = document.getElementById("chooseButton");
const resetButton = document.getElementById("resetButton");
const operators = document.querySelectorAll(`input[type="radio"]`);

// console.log(operators);
let selectedOperator;
reset();



// action du bouton restButton
function reset() { 
    result.value = null;
    operators.forEach(function (operator) {
      operator.checked = false;
    });
    chooseButton.style.color='black';

  }


 //action du chooseButton 
  function check() {
    switch (selectedOperator) {
      case "game1": //réponse fausse
        result.value = "On aurait bien aimé!"; 
        chooseButton.style.color='red';
        break;
      case "game2": //réponse correcte 
        result.value = "Bien vu !";
        chooseButton.style.color='green';
        break;  
      
    }
  }

  // listeners
operators.forEach(function (operator) {
    operator.addEventListener("change", function (event) {
      selectedOperator = event.target.id;
    });
  });
  resetButton.addEventListener("click", reset);
  chooseButton.addEventListener("click", check);
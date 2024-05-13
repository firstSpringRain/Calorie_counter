let textInputs = document.querySelectorAll('input[type="text"]');
let submitButton = document.querySelector('.form__submit-button');
let resultBlock = document.querySelector('.counter__result');
let counterForm = document.querySelector('.counter__form');
let clearButton = document.querySelector('.form__reset-button');
let caloriesNorm = document.getElementById('calories-norm');
let caloriesMinimal = document.getElementById('calories-minimal');
let caloriesMaximal = document.getElementById('calories-maximal');
let age = document.getElementById('age');
let height = document.getElementById('height');
let weight = document.getElementById('weight');
let minimal = document.getElementById('activity-minimal');
let low = document.getElementById('activity-low');
let medium = document.getElementById('activity-medium');
let high = document.getElementById('activity-high');
let maximal = document.getElementById('activity-maximal');
let activities = document.querySelectorAll('input[name="activity"]');
let isMan = document.getElementById('gender-male');


textInputs.forEach((textInput) => {
    textInput.addEventListener('change', function() {
        if (age.value !== '' && height.value !== '' && weight.value !== '') {
            submitButton.disabled = false;
        } else if (textInput.value === '') {
            submitButton.disabled = true;
        } else if (textInput.value !== '') {
            clearButton.disabled = false;
        }
    })
})

counterForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    resultBlock.classList.remove("counter__result--hidden");
    resultBlockFill();
})

clearButton.addEventListener('click', function() {
    resultBlock.classList.add("counter__result--hidden");
})

activities.forEach((activity) => {
    activity.addEventListener('change', function() {
        if (minimal.checked) {
            activity.value = minimal.value;
        } else if (low.checked) {
            activity.value = low.value; 
        } else if (medium.checked) {
            activity.value = medium.value;
        } else if (high.checked) {
            activity.value = high.value;
        } else if (maximal.checked) {
            activity.value = maximal.value;
        }
    });
})

let coef;

function getCoef() {
    if (minimal.checked) {
        coef = 1.2;
    } else if (low.checked) {
        coef = 1.375;
    } else if (medium.checked) {
        coef = 1.55;
    } else if (high.checked) {
        coef = 1.725;
    } else if (maximal.checked) {
        coef = 1.9;
    }
    return coef;
}

function resultBlockFill() {
    for (let i = 0; i < activities.length; i++) {
        if (isMan.checked) {
            caloriesNorm.textContent = Math.round(((10*weight.value) + (6.25*height.value) - (5*age.value) + 5)*getCoef(activities[i].checked));
        } else {
            caloriesNorm.textContent = Math.round(((10*weight.value) + (6.25*height.value) - (5*age.value) - 161)*getCoef(activities[i].checked));
        }
        caloriesMaximal.textContent = Math.round(1.15*Number(caloriesNorm.textContent));
        caloriesMinimal.textContent = Math.round(0.85*Number(caloriesNorm.textContent));
    }
}

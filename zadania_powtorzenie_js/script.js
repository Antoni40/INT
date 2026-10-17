//<--Zadanie 1-->
const clickMeButton = document.querySelector('#clickMeButton');
clickMeButton.addEventListener('click', () => {
    alert("Cześć! Smacznej kawusi!");
});

//<--Zadanie 2-->
const submitAgeButton = document.querySelector('#submitAgeButton');

submitAgeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const studentAge = document.querySelector('#studentAgeInput').value.trim();

    if(studentAge.trim() === ''){
        alert("Pole jest puste, podaj liczbę");
        return;
    }

    const studentAgeNumber = Number(studentAge);
    if(isNaN(studentAgeNumber)){
        alert("Wprowadzona wartosc nie jest liczbą");
    } else if(studentAgeNumber >= 18){
        alert("Jesteś pełnoletni")
    } else if (studentAgeNumber >= 0 && studentAgeNumber < 18){
        alert("Nie jesteś pełnoletni")
    } else {
        alert("Wiek jest nieprawidłowy")
    }
});

//<--Zadanie 3-->
const shoppingList = ["mleko", "jajka", "ziemniaki"];
const shoppingForm = document.querySelector('#shoppingForm');
const shoppingListElm = document.querySelector('#shoppingListElm');
const shoppingFormCheckboxesDiv = document.querySelector('#shoppingFormCheckboxes');

let checkboxesDivContent = "";
for (const shoppingItem of shoppingList) {
    checkboxesDivContent += `<div> 
        <input type="checkbox" id="item-${shoppingItem}" name="${shoppingItem}">
        <label for="item-${shoppingItem}">${shoppingItem}</label>
    </div>`;
}
shoppingFormCheckboxesDiv.innerHTML = checkboxesDivContent;

shoppingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const allInputItems = document.querySelectorAll('#shoppingForm input');
    
    shoppingListElm.innerHTML = "";
    let shoppingListContent = "";
    for (const inputItem of allInputItems) {
        if(inputItem.checked) {
            shoppingListContent += `<li>${inputItem.name}</li>`;
        }
    }
    shoppingListElm.innerHTML = shoppingListContent;
});

//<--Zadanie 4-->
const personalDataForm = document.querySelector('#personalDataForm');
personalDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#firstNameInput').value.trim();
    const age = document.querySelector('#ageInput').value;
    const isAgeValid = age !== "" && !isNaN(Number(age)) && age >= 0;
    const isNameValid = name.trim() !== '';

    if(isAgeValid && isNameValid){
        alert(`Twoje imie to: ${name}, a wiek to ${age}`);
    } else {
        alert('Wprowadzone dane są nieprawidłowe');
    }

})


const PI = Math.PI;

//<--Zadanie 1-->
function getOppositeNumber(number) {
    if(isNaN(Number(number)) || number.trim() === ""){
        console.log("Wprowadzono nieprawidlowa wartosc");
        return;
    }
    return (number !== 0) ? -number : number; 
}

const absForm = document.querySelector('#absNumberForm');
absForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const number = document.querySelector('#absNumberInput').value;
    console.log(`Podales cyfre: ${number} cyfra przeciwna to: ${getOppositeNumber(number)}`);
});

//<--Zadanie 2-->
const isUserMature = age => {
    (!isNaN(Number(age)) && age !== '') ? 
        ((age >= 18) ? console.log("Jesteś pełnoletni") : console.log("Nie jesteś pełnoletni")) 
        : console.log("Wprowadzony wiek jest błędny");
}

const age = 10;
isUserMature(age);

//<--Zadanie 3-->
const radius = 5;
const logCircuit = (!isNaN(Number(radius)) && radius > 0) ? 
    () => {console.log(`Obwód kola dla podanego promienia: ${2 * PI * radius}`)} :
    () => {console.log("Podano nieprawidlowy promien")};

logCircuit();

//<--Zadanie 4-->
function logAvgMinMax(array) {
    if(array instanceof Array && array.length > 0) {
        const arrayLength = array.length;
        let arraySum = 0;
        let minValue = array[0];
        let maxValue = array[0];

        for (const item of array) {
            arraySum += item;
            minValue = (minValue > item) ? item : minValue;
            maxValue = (maxValue < item) ? item : maxValue;
        }

        console.log(`Średnia wynosi: ${arraySum / arrayLength}`);
        console.log(`Minimalna wartość wynosi: ${minValue}`);
        console.log(`Maksymalna wartość wynosi: ${maxValue}`);

    } else {
        console.log("Niepoprawny argument (nie podano tablicy)");
    }
}

logAvgMinMax([1, 2, 10, 35, -10, 20, 11]);
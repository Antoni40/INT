//<--zadanie 1-->
setTimeout(() => {
  console.log("Hello World.");
})

//<--zadanie 2-->
const osoba = {
  imie: "Jan",
  nazwisko: "Kowalski"
}
const person = {
  name: "Piotr",
  surname: "Zyla"
}

function checkIfNamePresent(person) {
  try {
    if (person.name == undefined){
      throw new Error("Nie ma pola w obiekcie o nazwie name");
    }
    console.log(person.name);
  } catch(err) {
    console.log(err.message);
  }
}

checkIfNamePresent(osoba);
checkIfNamePresent(person);

//<--zadanie 3-->
function isEven(num) {
  if(num % 2) return "Liczba parzysta";
  else return "Liczba nieparzysta";
}

function checkNumber(num, callback){
  return callback(num);
}

checkNumber(10, isEven);

//<--zadanie 4-->
function randomTask() {
  return new Promise((resolve, reject) => {
    const random = Math.floor(Math.random() * 10) + 1;
    if(random <= 5){
      resolve("sukces");
    } else {
      reject("niepowodzenie");
    }
  })
}

randomTask()
  .then((message) => {console.log(message)})
  .catch((err) => {console.log(err)})


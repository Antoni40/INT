//---Zadanie 1---
class KontoBankowe {
  #saldo = 0;

  getSaldo() {
    return this.#saldo;
  }
  deposit(amount) {
    this.#saldo += amount; 
  }
  withdraw(amount) {
    this.#saldo -= amount;
  }
}

//--Testy--
const kontobankowe = new KontoBankowe();
console.log(`Saldo konta bankowego wynosi: ${kontobankowe.getSaldo()}`);
kontobankowe.deposit(100);
console.log(`Saldo konta bankowego wynosi: ${kontobankowe.getSaldo()}`);
kontobankowe.withdraw(50);
console.log(`Saldo konta bankowego wynosi: ${kontobankowe.getSaldo()}`);

//---Zadanie 2---
class Person {
  static introducePerson(name, surname) {
    return (name && surname) ? `Nazywam się ${name} ${surname}` : `Podano nieprawidlowe imie lub nazwisko`;
  }
}

//--Testy--
Person.introducePerson("Antoni", "Lubomski");
Person.introducePerson(10, 5);

//---Zadanie 3---
const Osoba = {
  greeting() {
    return "Witam cię bardzo serdecznie";
  }
}

const Uczen = Object.create(Osoba);
Uczen.gradesList = [1, 5, 6, 2];

Uczen.countAvgGrade = function() {
    let sum = 0;
    for(let grade of this.gradesList) {
      sum += grade;
    }
    return sum / this.gradesList.length;
}
//--Testy--
console.log(`Oceny ucznia: ${Uczen.gradesList}`);
console.log(`Średnia ocen ucznia: ${Uczen.countAvgGrade()}`);


//---Zadanie 4---
class SrodekTransportu {
  marka;
  model;
  srodowisko;
  
  constructor() {
    if(this.constructor == SrodekTransportu)
      throw new Error("Nie mozna stworzyc obiektu klasy abstrakcyjnej");

    this.marka = "-";
    this.model = "-";
    this.srodowisko = "-";
    
  }

  getMarka() {
    return this.marka;
  }
  getModel() {
    return this.model;
  }
  getTyp() {
    return this.srodowisko;
  }

  setMarka(marka) {
    return (marka.length >= 0) ? this.marka = marka : "Podano nie prawidlowe dane";
  }
  setModel(model) {
    return (model.length >= 0) ? this.model = model : "Podano nie prawidlowe dane";
  }
  setTyp(typ) {
    return (typ.length >= 0) ? this.typ = typ : "Podano nie prawidlowe dane";
  }
}

class Samolot extends SrodekTransportu {
  #typSamolotu;

  constructor() {
    super();
    this.#typSamolotu = "-";
  }
  
  getTypSamolotu() {
    return this.#typSamolotu;
  }
  
  setTypSamolotu(typSamolotu) {
    return (typSamolotu.length >= 0) ? this.#typSamolotu = typSamolotu : "Podano nie prawidlowe dane";
  }
}

class Auto extends SrodekTransportu {
  #paliwo;

  constructor() {
    super();
    this.#paliwo = "-";
  }

  getPaliwo() {
    return this.#paliwo;
  }
  
  setPaliwo(paliwo) {
    return (paliwo.length >= 0) ? this.#paliwo = paliwo : "Podano nie prawidlowe dane";
  }
}

class Lodz extends SrodekTransportu {
  #typLodzi;

  constructor() {
    super();
    this.#typLodzi = "-";
  }

  getTypLodzi() {
    return this.#typLodzi;
  }
  
  setTypLodzi(typLodzi) {
    return (typLodzi.length >= 0) ? this.#typLodzi = typLodzi : "Podano nie prawidlowe dane";
  }

}

//--Testy--
try {
  const trans = new SrodekTransportu();
} catch(err) {
  console.log(err);
}
const lodz = new Lodz();
lodz.setTypLodzi("Motorówka");
console.log(`Typ lodzi to: ${lodz.getTypLodzi}`);

//---Zadanie 5---
// Na klasach
class Psowate {
  dajGlos() {
    console.log("Nie mam glosu");
  }
}

class Pies extends Psowate {
  dajGlos() {
    console.log("Hau, hau!");
  }
}

class Wilk extends Psowate {
  dajGlos() {
    console.log("hauuuuuuuu (wycie)");
  }
}

class Szczeniak extends Pies {
  dajGlos() {
    console.log("Hau, hau! (wysokim tonem)");
  }
}

//--Testy--
const pies1 = new Szczeniak();
pies1.dajGlos();

// Na prototypach
const psowate = {
  dajGlos() {
    console.log("Nie mam glosu");
  }
}

const pies = Object.create(psowate);
pies.dajGlos = () => {
  console.log("Hau, hau!");
}

const wilk = Object.create(psowate);
wilk.dajGlos = () => {
  console.log("hauuuuuuuu (wycie)");
}

const szczeniak = Object.create(Pies);
szczeniak.dajGlos = () => {
    console.log("Hau, hau! (wysokim tonem)");
}

//--Testy--
szczeniak.dajGlos();


//---Zadanie 6---
class Artysta {
  constructor() {
    if(this.constructor == Artysta) {
      throw new Error("Nie można utworzyć obiektu klasy abstrakcyjnej");
    }
  }

  tworzDzielo(){};
  kontempluj(){};
}

class Rzezbiarz extends Artysta {
  tworzDzielo() {
    return "Tworze dzielo i rzezbie";
  }
  kontempluj() {
    return "Mysle nad rzezba";
  }
}

class Malarz extends Artysta {
  tworzDzielo() {
    return "Tworze dzielo i maluje";
  }
  kontempluj() {
    return "Mysle nad obrazem";
  }
}

class Pisarz extends Artysta {
  tworzDzielo() {
    return "Tworze dzielo i pisze";
  }
  kontempluj() {
    return "Mysle nad poematem";
  }
}

//--Testy--
const pisarz = new Pisarz();
console.log(pisarz.tworzDzielo());
console.log(pisarz.kontempluj());

//---Zadanie 7---
const usersList = [];
const userSignInForm = document.querySelector('#userForm');
userSignInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let czyFormularzWypelnionyPrawidlowo = true
  
  const firstNameInput = document.querySelector('#userForm #nameInput');
  const secondNameInput = document.querySelector('#userForm #surnameInput');
  const emailInput = document.querySelector('#userForm #emailInput');
  const passwordInput = document.querySelector('#userForm #surnameInput'); 

  czyFormularzWypelnionyPrawidlowo = WalidacjaUzytkownik.checkIfStringValid(firstNameInput.value) || 
    WalidacjaUzytkownik.checkIfStringValid(secondNameInput.value) || 
    WalidacjaUzytkownik.checkIfStringValid(emailInput.value) || WalidacjaUzytkownik.checkIfPasswordValid(passwordInput.value);

  if(!czyFormularzWypelnionyPrawidlowo){
    alert("Podano nieprawidlowe dane uzupełnij formularz ponownie");
    firstNameInput.value = "";
    secondNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  } else {
    user = new Uzytkownik(firstNameInput.value, secondNameInput.value, emailInput.value, passwordInput.value);
    usersList.push(user);
    user.wyswietl();
    console.log(`Lista wszystkich uzytkowników ${usersList}`);
  }
}) 

class WalidacjaUzytkownik {
  static checkIfStringValid(string) {
    if (string.length > 0) {
      return true;
    } else { 
      return false;
    }
  }

  static checkIfPasswordValid(password) {
    const passwordPattern = /(?=.[0-9]).{8}/;
    return passwordPattern.test(password);
  } 
}

class Uzytkownik {
  #imie;
  #nazwisko;
  #email;
  #haslo;

  constructor(imie, nazwisko, email, haslo){
    this.#imie = (WalidacjaUzytkownik.checkIfStringValid(imie)) ? imie : "-";
    this.#nazwisko = (WalidacjaUzytkownik.checkIfStringValid(nazwisko)) ? nazwisko : "-";
    this.#email = (WalidacjaUzytkownik.checkIfStringValid(email)) ? email : "-";
    this.#haslo = (WalidacjaUzytkownik.checkIfPasswordValid(haslo)) ? haslo : "-";
  }

  getImie() {
    return this.#imie;
  }
  getNazwisko() {
    return this.#nazwisko;
  }
  getEmail() {
    return this.#email;
  }

  wyswietl() {
    console.log(`Imie: ${this.#imie} Nazwisko: ${this.#nazwisko} E-mail: ${this.#email} Hasła nie podam`);
  }
}


//---Zadanie 8---
class Kalkulatorprosty {
  static dodaj(a, b){
    return a + b;
  }
  static odejmij(a, b){
    return a - b;
  }
  static pomnoz(a, b){
    return a * b;
  }
  static podziel(a, b){
    if(b === 0){
      throw new Error("Nie mozna dzielic przez 0");
    } else {
      return a / b;
    }
  }
  //pierwiastek i procent
  static obliczPierwiastek(pole){
    if(pole < 0) throw new Error("Nie można policzyć pierwiastka z liczby ujemnej");

    let dokladnosc = 0.000001;
    let a = 1;
    let b = pole;

    while(Kalkulatorprosty.wartoscAbsolutna(a - b) >= dokladnosc) {
      a = (a + b) / 2;
      b = pole / a;
    }

    return a;
  }

  static obliczProcent(a, b) {
    return (a / 100) * b;
  }

  static wartoscAbsolutna(a) {
    if(a >= 0) return a;
    else return -a;
  }
}

//--Testy--
console.log(`Pierwiastek z 3 = ${Kalkulatorprosty.obliczPierwiastek(3)}`);
console.log(`3 + 2 = ${Kalkulatorprosty.dodaj(3, 2)}`);
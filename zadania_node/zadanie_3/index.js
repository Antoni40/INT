const http = require('http');
const fs = require('fs');

fs.readFile("employees.json", "utf-8", (err, data) => {
    if(err) console.log("Error while reading a file", err);
    else {
        try {
            const jsonData = JSON.parse(data);
            const employees = jsonData.employees;
            console.log(employees);

            const newEmployee = {
                id: 4,
                name: "Tomasz",
                surname: "Kowalski",
                job: "Manager"
            }

            employees.push(newEmployee);

            fs.writeFile("employees.json", JSON.stringify(jsonData, null, 4), (err) => {
                if(err) console.log("Error while writing to file: ", err);
                else console.log("Employee added successfully");
            })

            fs.readFile("employees.json", (err, data) => {
                if(err) console.log("Error while reading a file", err);

                const jsonData = JSON.parse(data);
                const employees = jsonData.employees;

                const newlyAddedEmployee = employees.find(employee => employee.id = 4);
                console.log(`Nowy pracownik to: ${newlyAddedEmployee.name} ${newlyAddedEmployee.surname} o id ${newlyAddedEmployee.id}`);
            })
        } catch(err) {
            console.log("Error while parsing", err);
        }
    }
})
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const id = document.getElementById('id');
const salary = document.getElementById('salary');
const addPerson = document.getElementById('addPerson');
const personList = document.getElementById('personsList');
const calcStats = document.getElementById('calcStats');
const idStats = document.getElementById('statsAll');
const showCompany = document.getElementById('showCompany');

class Person {
    constructor(firstName,lastName, age, id) {
        this._firstName = firstName;
        this._lastName = lastName;
        this.age = +age;
        this._id = +id;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
}

class Employee extends Person {
    constructor(firstName,lastName, age, id, salary) {
        super(firstName,lastName, age, id)
        this._salary = +salary;
    }

    get salary() {
        return this._salary;
    }

    set salary(value) {
        this._salary = value;
    }
}

class Company {
    constructor(name) {
        this.name = name;
        this._employees = [];
    }

    addEmployee(employee) {
        if (!this.findEmployeeById(employee.id)) {
            this._employees.push(employee);
        }
    }

    findEmployeeById(id) {
        return this._employees.find(item => item.id === id);
    }

    removeEmployee(id) {
        const index = this._employees.findIndex(item => item.id === id);
        this._employees.splice(index, 1);
    }

    get findMaxAge() {
            return this._employees.reduce((acc, item) => acc.age > item.age ? acc : item);
    }

    get findAverAge() {
        return this._employees.reduce((accum,item) => accum + item.age, 0) / this._employees.length;
    }

    get findMinAge() {
        return this._employees.reduce((acc,item) => acc.age < item.age ? acc : item);
    }

    get findAllSal() {
       return this._employees.reduce((acc, item) => acc + item.salary, 0);
    }

    get findAverSal() {
        return this._employees.reduce((acc, item) => acc + item.salary, 0) / this._employees.length;
    }

    get quantity() {
        return this._employees.length;
    }
}

const apple = new Company('Apple');

// add Employee in Company
addPerson.onclick = function () {

    const firstName1 = firstName.value.trim();
    const lastName1 = lastName.value.trim();
    const age1 = age.value;
    const id1 = id.value;
    const salary1 = salary.value;

        if (firstName1 && lastName1 && age1 && id1 && salary1) {
            if (age1 <= 0 || id1 <= 0 || salary1 <= 0) throw new Error("This numbers is not add");
            const employee = new Employee(firstName1, lastName1, age1, id1, salary1);
            if (apple.findEmployeeById(employee.id)) {
                alert("With this idi already have");
                id.value = '';
                throw new Error("With this already ID");
            } else {
                apple.addEmployee(employee);
                clearsAllInputs();
                console.log(employee);
            }
        } else {
            alert("You entered empty");
            throw new Error("You entered empty");
        }
}

// show all Employee in Company
showCompany.onclick = function () {
   showAllEmployee();
}
// click Stat Employee
calcStats.onclick = function () {
    viewStats();
}

// show all Employee
function showAllEmployee() {
    personList.innerHTML = '';

    for (let i = 0; i < apple._employees.length; i++) {

        const elemLi = document.createElement('li');
        const fNameSpan = document.createElement("span");
        const lNameSpan = document.createElement('span');
        const ageSpan = document.createElement('span');
        const idSpan = document.createElement('span');
        const salSpan = document.createElement('span');
        const fText = document.createTextNode(`First-Name: ${apple._employees[i].firstName}`);
        const lText = document.createTextNode(`Last-Name: ${apple._employees[i].lastName}`);
        const ageText = document.createTextNode(`My-age: ${apple._employees[i].age}`);
        const idText = document.createTextNode(`Your id: ${apple._employees[i].id}`);
        const salText = document.createTextNode(`My-salary: ${apple._employees[i].salary}`);

        fNameSpan.appendChild(fText);
        lNameSpan.appendChild(lText);
        ageSpan.appendChild(ageText);
        idSpan.appendChild(idText)
        salSpan.appendChild(salText);

        elemLi.append(fNameSpan, lNameSpan, ageSpan,idSpan, salSpan,);
        addDelEmployee(elemLi);

        personList.appendChild(elemLi);

    }
}

// delete Employee from Company
function addDelEmployee(elemLi) {
    const delEmployee = document.createElement('button');
    const delEmployeeText = document.createTextNode('Del');
    delEmployee.appendChild(delEmployeeText);

    delEmployee.onclick = function () {
        apple.removeEmployee();
        elemLi.remove();
        delEmployee.remove();
        viewStats();
    }
    elemLi.appendChild(delEmployee);
}

// show all Stats
function viewStats() {
    idStats.innerText = '';

    const maxSpan = document.createElement('span');
    const averSpan = document.createElement('span');
    const minSpan = document.createElement('span');
    const allSalarySpan = document.createElement('span');
    const averSalarySpan = document.createElement('span');
    const allSpan = document.createElement('span');
    const maxText = document.createTextNode(`Max => ${apple.findMaxAge.age}`);
    const averText = document.createTextNode(`Average => ${apple.findAverAge}`);
    const minText = document.createTextNode(`Min => ${apple.findMinAge.age}`);
    const allSalaryText = document.createTextNode(`All sal => ${apple.findAllSal}`);
    const averSalaryText = document.createTextNode(`Aver sal => ${apple.findAverSal}`);
    const allText = document.createTextNode(`All Persons => ${apple.quantity}`);

    maxSpan.appendChild(maxText);
    averSpan.appendChild(averText);
    minSpan.appendChild(minText);
    allSalarySpan.appendChild(allSalaryText);
    averSalarySpan.appendChild(averSalaryText);
    allSpan.appendChild(allText);
    idStats.append(maxSpan, averSpan, minSpan, allSalarySpan, averSalarySpan, allSpan,);
}

// clearsAllInputs
function clearsAllInputs() {
    firstName.value = lastName.value = age.value = id.value = salary.value = '';
}


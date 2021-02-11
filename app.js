const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Using inquirer to gather information about the development team members,
// and to create objects for each team member (using the classes as blueprints)
start();
let arr = [];

function start() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "What is the employee's job role?",
                choices: ["Engineer", "Manager", "Intern", "I'm finished"]
            }
        ])
        .then(function (answer) {
            if (answer.role === "Engineer") {
                askEngineer();
            }
            else if (answer.role === "Manager") {
                askManager();
            }
            else if (answer.role === "Intern") {
                askIntern();
            }
            else if (answer.role === "I'm finished") {
                buildTeam();
            }
        })
}

function buildTeam() {
        let thing = render(arr);
   
        fs.writeFileSync(outputPath, thing)
}

function askEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "engName",
                message: "What is the employee's name?"
            },
            {
                type: "input",
                name: "engEmail",
                message: "What is the employee's email?"
            },
            {
                type: "input",
                name: "engGithub",
                message: "What is the employee's GitHub username?"
            }
        ])
        .then(function (answer) {
            let id =  uuid.v4();
            let eng = new Engineer(id, answer.engName, answer.engEmail, answer.engGithub);
            arr.push(eng);
            console.log("Saved!")
            start();
        })
     
}

function askManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "mgrName",
                message: "What is the manager's name?"
            },
            {
                type: "input",
                name: "mgrEmail",
                message: "What is the manager's email?"
            },
            {
                type: "input",
                name: "mgrOfficeNum",
                message: "What is the manager's office phone number?"
            }
        ])
        .then(function (answer) {
            let id =  uuid.v4();
            let mgr = new Manager(id, answer.mgrName, answer.mgrEmail, answer.mgrOfficeNum);
            arr.push(mgr);
            console.log("Saved!")
            start();
        })
      
}

function askIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "intName",
                message: "What is the intern's name?"
            },
            {
                type: "input",
                name: "intEmail",
                message: "What is the intern's email?"
            },
            {
                type: "input",
                name: "intSchool",
                message: "What school does the intern attend?"
            }
        ])
        .then(function (answer) {
            let id =  uuid.v4();
            let int = new Intern(id, answer.intName, answer.intEmail, answer.intSchool);
            arr.push(int);
            console.log("Saved!")
            start();
        })
      
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.



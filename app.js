const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const ADD = "Add Team Member", EXIT = "Exit";
const render = require("./lib/htmlRenderer");
const { exit } = require("process");

let employeeList = [];

//Initialize Function
async function generatorPrompt() {
console.log("Team Generator Main Menu");
    try {
        let answer = await inquirer.prompt({
            name: "addOrExit",
            type: "list",
            message: "Would you like to add a Team Member or Exit?",
            choices: [ADD, EXIT]
        });

        switch (answer.addOrExit) {

            case ADD:
                return add();
            case EXIT:
                return exit();

        }
    } catch (error) {
        throw error;
    }
}
//Add Team Member
async function add() {
    console.log("Add Team Member")
    try {
        let answer = await inquirer.prompt([
            {
                type:"input",
                name: "name",
                message: "Enter Team Member's name."
            },
            {
                type:"input",
                name: "id",
                message: "Enter Team Member's ID."
            },
            {
                type:"input",
                name: "email",
                message: "Enter Team Member's Email"
            },
            {
                type:"list",
                name: "role",
                message: "What is your role?",
                choices: ["Manager", "Engineer", "Intern"]
            },
            {
                type: "input",
                name: "github",
                message: "Enter the employee's GitHub username.",
                when: answer => answer.role === "Engineer"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Enter office number.",
                when: answer => answer.role === "Manager"
            },
            {
                type: "input",
                name: "school",
                message: "Enter the employee's school.",
                when: answer => answer.role === "Intern"
            }

        ]);
    } catch (error) {
        throw error;
    }
}

//Initialize function
async function init() {
    try {
        
        await generatorPrompt();
        const html = render(employeeList);
        fs.writeFileSync(outputPath, html);
        console.log("Created Team!")
        
    } catch (error){
        console.log(error);
    }
};

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// this is for the inquirer.js code
const inquirer = require("inquirer");

//questions
// What would you like to do?
// Options: View all depts, view all employees,add a dept
// add a role, add an employee, update an employee role

const triggerQuestion = [
  // initial selector question
  {
    type: "list",
    name: "next",
    message: "What would you like to do?",
    choices: [
      {
        name: "View all departments",
        value: "deptAll",
      },
      {
        name: "View all employees",
        value: "employeeAll",
      },
      {
        name: "Add a department",
        value: "addDept",
      },
      {
        name: "Add a role",
        value: "addRole",
      },
      {
        name: "Add an employee",
        value: "addEmployee",
      },
      {
        name: "Update an employee role",
        value: "updateEmployeeRole",
      },
      {
        name: "Update an employee's manager",
        value: "updateEmployeeManager",
      },
    ],
  },
  // add role prompt
  {
    type: "input",
    name: "role",
    message: "What role would you like to add?",
    when: ({ next }) => {
      if (next === "addRole") {
        return true;
      } else {
        return false;
      }
    },
    validate: (roleValidator) => {
      if (roleValidator) {
        return true;
      } else {
        console.log("Please enter a role.");
        return false;
      }
    },
  },
  //   add role salary
  {
    type: "input",
    name: "roleSalary",
    message: "What is that role's salary?",
    when: ({ next }) => {
      if (next === "addRole") {
        return true;
      } else {
        return false;
      }
    },
    validate: (roleValidator) => {
      if (roleValidator) {
        return true;
      } else {
        console.log("Please enter a salary.");
        return false;
      }
    },
  },
  //   assign the role to a dept
  {
    type: "list",
    name: "assignDept",
    message: "Which department does the role belong to?",
    // choices will be pulled from mysql
    // object will be { label : roleName, value: roleId}
    choices: [
      { name: "Flight", value: "1" },
      { name: "Resarch and Developement", value: "2" },
    ],
    when: ({ next }) => {
      if (next === "addRole") {
        return true;
      } else {
        return false;
      }
    },
  },
  // add dept prompt
  {
    type: "input",
    name: "dept",
    message: "What department would you like to add?",
    when: ({ next }) => {
      if (next === "addDept") {
        return true;
      } else {
        return false;
      }
    },
    validate: (deptValidator) => {
      if (deptValidator) {
        return true;
      } else {
        console.log("Please enter a department.");
        return false;
      }
    },
  },
  //add employee prompts
  //   first name
  {
    type: "input",
    name: "employeeFirstName",
    message: "What is the employee's first name?",
    when: ({ next }) => {
      if (next === "addEmployee") {
        return true;
      } else {
        return false;
      }
    },
    validate: (employeeValidator) => {
      if (employeeValidator) {
        return true;
      } else {
        console.log("Please enter their first name.");
        return false;
      }
    },
  },
  //   last name
  {
    type: "input",
    name: "employeeLastName",
    message: "What is the employee's last name?",
    when: ({ next }) => {
      if (next === "addEmployee") {
        return true;
      } else {
        return false;
      }
    },
    validate: (employeeValidator) => {
      if (employeeValidator) {
        return true;
      } else {
        console.log("Please enter their last name.");
        return false;
      }
    },
  },
  //   assign role
  {
    type: "list",
    name: "employeeRole",
    message: "What is the employee's role?",
    // pull roles from mysql
    choices: ["Pilot", "Engineer", "Scientist"],
    when: ({ next }) => {
      if (next === "addEmployee") {
        return true;
      } else {
        return false;
      }
    },
  },
  //   update employee selection
  {
    type: "list",
    name: "selectEmployee",
    message: "Which employee would you like to change?",
    //   choices will be pulled from mysql
    // object will be { label : employeeName, value: employeeId}
    choices: [
      { name: "Bob", value: "1" },
      { name: "Jeb", value: "2" },
    ],
    when: ({ next }) => {
      if (next === "updateEmployeeRole" || next === "updateEmployeeManager") {
        return true;
      } else {
        return false;
      }
    },
  },
  //   update role
  {
    type: "list",
    name: "updateRole",
    message: "Which role should they have?",
    // choices will be pulled from mysql
    // object will be { label : roleName, value: roleId}
    choices: [
      { name: "Engineer", value: "1" },
      { name: "Pilot", value: "2" },
    ],
    when: ({ next }) => {
      if (next === "updateEmployeeRole") {
        return true;
      } else {
        return false;
      }
    },
  },
  //   updated manager
  {
    type: "list",
    name: "updateManager",
    message: "Which manager are they assigned to?",
    // choices will be pulled from mysql
    // object will be { label : roleName, value: roleId}
    choices: [
      { name: "Kraken", value: "1" },
      { name: "The Claw", value: "2" },
    ],
    when: ({ next }) => {
      if (next === "updateEmployeeManager") {
        return true;
      } else {
        return false;
      }
    },
  },
];

//function to prompt add departments
function addDeptPrompt() {
  inquirer.prompt(addDeptQuestion).then(function (response) {
    console.log(response);
  });
}

// function to prompt add employees
function addEmployeePrompt() {
  inquirer.prompt(addEmployeeQuestion).then(function (response) {
    console.log(response);
  });
}

// function to prompt add employees
function addRolePrompt() {
  inquirer.prompt(addEmployeeQuestion).then(function (response) {
    console.log(response);
  });
}

//function to route next set of questions
function routeQuestion(value) {
  value = value.next;
  const nextValues = {
    //   will have a funct to show all dept
    deptAll: 1,
    //   will have a funct to show all employees
    employeeAll: 2,
    //   will have a funct to show all roles
    roleAll: 3,
    addDept: 4,
    addEmployee: 5,
    addRole: 6,
    updateEmployeeRole: 7,
  };
  console.log(nextValues[value]);
  return nextValues[value];
}

// function to initialize app
function init() {
  inquirer.prompt(triggerQuestion).then(function (response) {
    // routeQuestion(response);
    console.log(response);
    return response;
  });
}

init();

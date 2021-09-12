// this is for the inquirer.js code
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
// const ConfirmPrompt = require("inquirer/lib/prompts/confirm");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // {TODO: Add your MySQL password}
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// required to make queries work as promises
function queryPromise(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

// creates array of employee names
// each employee name is associated with its id number
async function getEmployeeNames() {
  let query = "SELECT id, first_name, last_name FROM employees";
  const rows = await queryPromise(query);

  let employees = [];
  for (const row of rows) {
    let fullName = row.first_name + " " + row.last_name;
    employees.push({
      name: fullName,
      value: row.id,
    });
  }

  return employees;
}

async function getManagerNames() {
  let query = "SELECT id, first_name, last_name FROM employees";
  const rows = await queryPromise(query);

  let managers = [];
  for (const row of rows) {
    let fullName = row.first_name + " " + row.last_name;
    managers.push({
      name: fullName,
      value: row.id,
    });
  }

  return managers;
}

// creates array of role names
async function getRoleNames() {
  let query = "SELECT title, id FROM roles";
  const rows = await queryPromise(query);

  let roles = [];
  for (const row of rows) {
    roles.push({
      name: row.title,
      value: row.id,
    });
  }

  return roles;
}

// returns array of department names
// used for creating choices in employee creation question
async function getDeptNames() {
  let query = "SELECT id, name FROM departments";
  const rows = await queryPromise(query);

  let departments = [];
  for (const row of rows) {
    departments.push({
      name: row.name,
      value: row.id,
    });
  }

  return departments;
}

// view all employees
async function viewEmployees() {
  const query =
    "SELECT employees.id AS employee_id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, roles.salary AS salary, departments.name AS department, managers.first_name AS manager_first_name, managers.last_name AS manager_last_name FROM employees  JOIN roles ON employees.role_id = roles.id JOIN managers ON employees.manager_id = managers.id JOIN departments ON roles.department_id = departments.id;";
  const result = await queryPromise(query);
  console.table(result);
  // prompts to continue or close app
  continuePrompt();
}

// view all departments
async function viewDept() {
  console.log("loading all departments...");
  const query = "SELECT * FROM departments";
  const result = await queryPromise(query);
  console.table(result);
  continuePrompt();
}

// viewDept();

// view all roles
async function viewRoles() {
  const query = "SELECT * FROM roles";
  const result = await queryPromise(query);
  console.table(result);
  continuePrompt();
}

// query add employee to data base
async function addEmployee(values) {
  console.log(values);
  const query =
    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
  // creates array with values input by the user
  const input = [
    values.employeeFirstName,
    values.employeeLastName,
    values.employeeRole,
    values.updateManager,
  ];
  console.log("adding to employees");
  const result = await queryPromise(query, input);
  console.log(result);

  // updates manager table
  const query2 = "INSERT INTO managers (first_name, last_name) VALUES (?,?)";
  const input2 = [values.employeeFirstName, values.employeeLastName];

  console.log("adding to manager list");
  const result2 = await queryPromise(query2, input2);
  console.log(result2);

  viewEmployees();
}

// query add department to data base
async function addDept(values) {
  const query = "INSERT INTO departments (name) VALUES (?)";
  console.log(values);
  const input = [values.dept];

  const result = await queryPromise(query, input);
  viewDept();
}

// query add role to data base
async function addRole(values) {
  const query =
    "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
  console.log(values);
  const input = [values.role, values.roleSalary, values.assignDept];

  const result = await queryPromise(query, input);
  viewRoles();
}

async function updateEmployeeRole(values) {
  console.log(values);
  const query = "UPDATE employees SET role_id = ? WHERE id = ?";
  // creates array with values input by the user
  const input = [values.employeeRole, values.selectEmployee];
  const result = await queryPromise(query, input);
  viewEmployees();
}

async function updateEmployeeManager(values) {
  console.log(values);
  const query = "UPDATE employees SET manager_id = ? WHERE id = ?";
  // creates array with values input by the user
  const input = [values.updateManager, values.selectEmployee];
  const result = await queryPromise(query, input);
  viewEmployees();
}

async function createQuestions() {
  const employees = await getEmployeeNames();
  const roles = await getRoleNames();
  const departments = await getDeptNames();
  const managers = await getManagerNames();

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
        {
          name: "Exit",
          value: "exit",
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
    // add role salary
    {
      type: "number",
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
    // assign the role to a dept
    {
      type: "list",
      name: "assignDept",
      message: "Which department does the role belong to?",
      // choices will be pulled from mysql
      // object will be { label : roleName, value: roleId}
      choices: departments,
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
    // update employee selection
    {
      type: "list",
      name: "selectEmployee",
      message: "Which employee would you like to change?",
      //   choices will be pulled from mysql
      // object will be { label : employeeName, value: employeeId}
      choices: employees,
      when: ({ next }) => {
        if (next === "updateEmployeeRole" || next === "updateEmployeeManager") {
          return true;
        } else {
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
      choices: roles,
      when: ({ next }) => {
        if (next === "addEmployee" || next === "updateEmployeeRole") {
          return true;
        } else {
          return false;
        }
      },
    },
    //   assign manager
    {
      type: "list",
      name: "updateManager",
      message: "Which manager are they assigned to?",
      // choices will be pulled from mysql
      // object will be { label : roleName, value: roleId}
      choices: managers,
      when: ({ next }) => {
        if (next === "updateEmployeeManager" || next === "addEmployee") {
          return true;
        } else {
          return false;
        }
      },
    },
  ];

  return triggerQuestion;
}

//function to route next set of questions
async function routeQuestion(value) {
  let next = value.next;
  switch (next) {
    case "deptAll":
      return viewDept();
    case "employeeAll":
      return viewEmployees();
    case "roleAll":
      return viewRoles();
    case "addDept":
      return addDept(value);
    case "addEmployee":
      return addEmployee(value);
    case "addRole":
      return addRole(value);
    case "updateEmployeeRole":
      return updateEmployeeRole(value);
    case "updateEmployeeManager":
      return updateEmployeeManager(value);
  }
  // console.log(nextValues[value]);
  // return nextValues[value];
}

// function to initialize app
async function init() {
  const triggerQuestion = await createQuestions();
  // viewEmployees();
  inquirer.prompt(triggerQuestion).then(function (response) {
    routeQuestion(response);
  });
}

async function continuePrompt() {
  const confirm = await inquirer.prompt({
    type: "confirm",
    name: "continue",
    message: "Would you like to continue?",
  });
  if (confirm.continue) {
    init();
  } else {
    // exit application
    db.end();
  }
}

// createNoneManager();
init();

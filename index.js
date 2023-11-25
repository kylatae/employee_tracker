const inquirer = require('inquirer');
const db = require('db/db.js')


qPrompt = [
  {
    type: 'list',
    message: 'What would you like to do? (Use Arrow Keys)',
    name: 'menuChoice',
    choices: 
      ['View All Employees', 
      'Add Employee', 
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit'] 
  }
]



function mainMenu() {
 
  inquirer.prompt(qPrompt)
  .then((data=>{
    switch(data) {
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'Add Department':
        addDepartment();
    }

  }))

  
}

mainMenu();

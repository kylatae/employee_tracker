const inquirer = require('inquirer');

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
}

mainMenu();

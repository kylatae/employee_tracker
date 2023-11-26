const inquirer = require('inquirer');

const db = require('./db/db.js')

function programLogo(itemTitle){
  console.clear()
  console.log(`█████████████████████████████████████`)
  console.log(`█                                   █`)
  console.log(itemTitle)
  console.log(`█                                   █`)
  console.log(`█████████████████████████████████████`)
}

const mainMenu = () =>{
  inquirer.prompt([
    {
      type: 'list',
      message: `
What would you like to do?`,
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
  ]).then((data=>{
      console.log("in the then")
      switch(data.menuChoice) {
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
          break;
        case 'Quit':
          exitProgram();
      }
  }))

};


const viewAllEmployees = () =>{
  programLogo(`█         View All Employees        █`);
  const req = `SELECT * FROM employee`;
  db.promise().query(req)
    .then((data)=>{
      console.table(data[0]);
      mainMenu();    
    })
    .catch((err) => console.log(err));
}

const addEmployee = () =>{


  mainMenu();
}

const updateEmployeeRole = () =>{


  mainMenu();
}

const viewAllRoles = () =>{


  mainMenu();
}

const addRole = () =>{

  mainMenu(); 
}

const viewAllDepartments = () =>{


  mainMenu();
}

const addDepartment = () =>{


  mainMenu();
}

const exitProgram = () =>{
  programLogo(`█ Thanks for using Employee Tracker █`);
  console.log ('')
  process.exit(1)
}
programLogo(`█          Employee Tracker         █`);
mainMenu();

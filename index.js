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
    }).catch((err) => console.log(err));    
}

const addEmployee = async () =>{
  programLogo(`█            Add Employee           █`);
  const roles = await db.promise().query("SELECT * FROM role");
  var rolesDisp = [];
  for (i = 0; i < roles[0].length; i++){
    rolesDisp.push({
      name: roles[0][i].title,
      value: roles[0][i].id,
    });
  }
  const[employees] = await db.promise().query("SELECT * FROM employee");
  const employeesDisp = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id 
  }))
  employeesDisp.push({
    name: "No Manager",
    value: null
  })
  inquirer.prompt([
    {
      name: "role",
      type: "list",
      message: "What is the new employees role?",
      choices: rolesDisp
    },
    {
      name: "first_name",
      type: "input",
      message: "What is the new employees first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the new employees last name?"
    },
    {
      name: "manager",
      type: "list",
      message: "Who will the report to?",
      choices: employeesDisp
    }
  ]).then((data)=>{
    db.query(`INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("${data.first_name}", "${data.last_name}", "${data.manager}", "${data.role}")`);
    programLogo(`█           Employee Added          █`);
    console.log (`${data.first_name} ${data.last_name} has been added to the records.`)
    mainMenu();  
  }).catch((err) => console.log(err));
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

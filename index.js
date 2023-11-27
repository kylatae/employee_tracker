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
  db.promise().query(`SELECT e1.id,
      e1.first_name,
      e1.last_name,
      role.title,
      department.name AS department,
      role.salary,
      CONCAT(e2.first_name," ", e2.last_name) as manager
      FROM employee e1
      JOIN role ON e1.role_id = role.id 
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee e2 on e1.manager_id = e2.id
      ORDER BY id ASC`)
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
  const employeesDisp = employees.map((employeeMap) => ({
    name: `${employeeMap.first_name} ${employeeMap.last_name}`,
    value: employeeMap.id 
  }))
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
    mainMenu();  
  }).catch((err) => console.log(err));
}

const updateEmployeeRole = async () =>{
  programLogo(`█        Update Employee Role       █`);
  const roles = await db.promise().query("SELECT * FROM role");
  var rolesDisp = [];
  for (i = 0; i < roles[0].length; i++){
    rolesDisp.push({
      name: roles[0][i].title,
      value: roles[0][i].id,
    });
  }
  const[employees] = await db.promise().query("SELECT * FROM employee");
  const employeesDisp = employees.map((employeeMap) => ({
    name: `${employeeMap.first_name} ${employeeMap.last_name}`,
    value: employeeMap.id 
  }))
  inquirer.prompt([
    {
      name: "update",
      type: "list",
      message: "Which employee needs their role to be updated?",
      choices: employeesDisp
    },
    {
      name: "role",
      type: "list",
      message: `What is their new Role?`,
      choices: rolesDisp
    }
  ]) .then((data) =>{
    console.log (data.role)
    console.log (data.update)
    
    db.query(`UPDATE employee SET role_ID = ${data.role} WHERE id = ${data.update}`)
    programLogo(`█       Employee Role Updated       █`);
    mainMenu();
  }).catch((err) => console.log(err));
}

const viewAllRoles = () =>{
  programLogo(`█           View All Roles          █`);
  db.promise().query(`SELECT role.id,
    role.title,
    role.salary,
    department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
    ORDER BY id ASC`)
    .then((data)=>{
      console.table(data[0]);
      mainMenu();    
    }).catch((err) => console.log(err));   
}

const addRole = async () =>{
  programLogo(`█            Add New Role           █`);
  const departments = await db.promise().query("SELECT * FROM department");
  var deptDisp= [];
  for (i = 0; i < departments[0].length; i++){
    deptDisp.push({
      name: departments[0][i].name,
      value: departments[0][i].id
    })
  }
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary?"
    },
    {
      name: "department",
      type: "list",
      message: "Which department is the new role for?",
      choices: deptDisp
    }
  ]).then((data) => {
  db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", "${data.salary}", "${data.department}")`)
  programLogo(`█             Role Added            █`);
  mainMenu();  
  }).catch((err) => console.log(err));
}

const viewAllDepartments = () =>{
  programLogo(`█        View All Departments       █`);
  db.promise().query(`SELECT * FROM department ORDER BY id ASC`)
    .then((data)=>{
      console.table(data[0]);
      mainMenu();    
    }).catch((err) => console.log(err));  
}

const addDepartment = () =>{
  programLogo(`█           Add Department          █`);
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What is the name of the new department?"
    }
  ]).then((data) => {
    db.query(`INSERT INTO department (name) VALUES ("${data.name}")`)
    programLogo(`█          Department Added         █`);
    mainMenu();
  })
}

const exitProgram = () =>{
  programLogo(`█ Thanks for using Employee Tracker █`);
  console.log ('')
  process.exit(1)
}
programLogo(`█          Employee Tracker         █`);
mainMenu();

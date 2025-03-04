import pool from 'connection.js';
import inquirer from 'inquirer';

const viewDepartments = async () => {
    const result = await pool.query('SELECT * FROM department');
    return result.rows
};

const viewRoles = async () => {
    const result = await pool.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role
        JOIN department ON role.department_id = department.id`); 
        return result.rows
};

const viewEmployees = async () => {
    const result = await pool.query(`
         SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
             CONTACT(manager.first_name || ' ' || manager.last_name, 'None') AS manager
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
      return result.rows
};

const addDepartment = async () => {
    const { departmentName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter new department name'
        },
    ]);
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [departmentName]);
        console.log(`Department "${departmentName}" successfully created.`)
    } catch (error) {
        console.error('Error creating department.');
    }
}

const addRole = async () => {
    const departments = await pool.query("SELECT * FROM department");
    const departmentChoices = departments.rows.map(dept => ({name: dept.name, value: dept.id }));

    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter new role title'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter new role salary'
        },
        {
            type: 'list',
            name: 'title',
            message: 'Select the department for the new role',
            choices: departmentChoices
        },
    ]);
    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
        console.log(`Role "${departmentName}" successfully created.`);
    } catch (error) {
        console.error('Error creating role.');
    }
}

const addEmployee = async () => {
    const roles = await pool.query("SELECT * FROM role");
    const roleChoices = roles.rows.map(role => ({name: role.title, value: dept.id }));

    const employees = await pool.query("SELECT * FROM employee");
    const managerChoices = employees.rows.map(emp => ({name: `${emp.first_name} ${emp.last_name}`, value: dept.id }));
    managerChoices.unshift({name: "None", value: null})

    const { firstName, lastName, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter first name'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter last name'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role of the employee',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is their manager?',
            choices: roleChoices
        },
    ]);
    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, role_id, manager_id]);
        console.log(`${firstName} ${lastName} successfully added.`);
    } catch (error) {
        console.error('Error adding employee.');
    }
}

const uppdateRole = async () => {
    const employees = await pool.query("SELECT * FROM employee");
    const employeeChoices = employees.rows.map(emp => ({name: `${emp.first_name} ${emp.last_name}`, value: dept.id }));

    const roles = await pool.query("SELECT * FROM role");
    const roleChoices = roles.rows.map(role => ({name: role.title, value: dept.id }));

    const { employee_id, newRole_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select employee',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newRole_id',
            message: 'Select new role',
            choices: roleChoices
        },
    ]);
    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRole_id, employee_id]);
        console.log(`Role successfully added.`);
    } catch (error) {
        console.error('Error updated employee role.');
    }
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    uppdateRole
}
import pool from 'connection.js';
import inquirer from 'inquirer';
import queries from 'queries.js';

const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
            ],
        },
    ]);

    switch (choice) {
        case 'View All Employees':
            await queries.viewEmployees(pool);
            break;
        case 'Add Employee':
            await queries.addEmployee(pool);
            break;
        case 'Update Employee Role':
            await queries.updateRole(pool);
            break;
        case 'View All Roles':
            await queries.viewRoles(pool);
            break;
        case 'Add Role':
            await queries.addRole(pool);
            break;
        case 'View All Departments':
            await queries.viewDepartments(pool);
            break;
        case 'Add Department':
            await queries.addDepartment(pool);
            break;
        case 'Quit':
            pool.end();
            return;

    }
    mainMenu();
}

mainMenu();
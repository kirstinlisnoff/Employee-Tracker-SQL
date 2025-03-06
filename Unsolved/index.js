import { pool } from '/Users/kirstinnoff/Desktop/repositories/github/HW10-SQL/Unsolved/connection.js';
import inquirer from 'inquirer';
import { viewDepartments, viewEmployees, viewRoles, addDepartment, addEmployee, addRole, updateRole} from './queries.js';


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
            await viewEmployees(pool);
            console.table(employee);
            break;
        case 'Add Employee':
            await addEmployee(pool);
            break;
        case 'Update Employee Role':
            await updateRole(pool);
            break;
        case 'View All Roles':
            await viewRoles(pool);
            break;
        case 'Add Role':
            await addRole(pool);
            break;
        case 'View All Departments':
            await viewDepartments(pool);
            break;
        case 'Add Department':
            await addDepartment(pool);
            break;
        case 'Quit':
            pool.end();
            return;

    }
    mainMenu();
}

mainMenu();
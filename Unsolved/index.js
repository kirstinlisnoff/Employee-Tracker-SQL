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
            const employees = await viewEmployees(pool);
            console.table(employees);
            break;
        case 'Add Employee':
            await addEmployee(pool);
            break;
        case 'Update Employee Role':
            await updateRole(pool);
            break;
        case 'View All Roles':
            const roles = await viewRoles(pool);
            console.table(roles);
            break;
        case 'Add Role':
            await addRole(pool);
            break;
        case 'View All Departments':
            const departments = await viewDepartments(pool);
            console.table(departments);
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
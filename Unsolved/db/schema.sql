-- Active: 1741234105010@@127.0.0.1@5432@employees_db
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
\c employees_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    Foreign Key (department_id) REFERENCES department(id) ON DELETE SET NULL
);
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    Foreign Key (role_id) REFERENCES role(id) ON DELETE SET NULL,
    Foreign Key (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT
);

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

CREATE TABLE managers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30)
);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "None", "None",1 , 1);

INSERT INTO managers (id, first_name, last_name)
VALUES (1, "None", "None");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "None", 0, 1);

INSERT INTO departments (id, name)
VALUES (1, "None");
-- employees
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "None", "None",1 , 1);

-- managers
-- the id, first_name, and last_name should match the values for the employee listed above
-- the managers list needs to match the employee list as every employee is able to be listed as a manager
INSERT INTO managers (id, first_name, last_name)
VALUES (1, "None", "None");

-- roles
INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "None", 0, 1);

-- departments
INSERT INTO departments (id, name)
VALUES (1, "None");
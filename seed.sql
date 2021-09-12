-- departments
INSERT INTO departments (id, name)
VALUES 
(1, "Research and Development"),
(2, 'Flight'),
(3, 'Construction'),
(4, 'Management');

-- roles
INSERT INTO roles (id, title, salary, department_id)
VALUES 
(1, 'Pilot', 10000, 2),
(2, 'Scientist', 40000, 1),
(3, 'Engineer', 60000, 3),
(4, 'Manager', 100000, 4);

-- managers
INSERT INTO managers (id, first_name, last_name)
VALUES
(1, 'Jeb', 'Kerman'),
(2, 'Bob', 'Kerman'),
(3, 'Bill', 'Kerman'),
(4, 'Player', 'One');

-- employees
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'Jeb', 'Kerman', 2, 4),
(2, 'Bob', 'Kerman', 3, 4),
(3, 'Bill', 'Kerman', 3, 4),
(4, 'Player', 'One', 4, 4);


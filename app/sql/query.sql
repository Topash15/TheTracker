---- Creates a show all table

SELECT
  -- Select the columns from both tables --
  employees.id AS employee_id,
  employees.first_name AS first_name,
  employees.last_name AS last_name,
  roles.title AS title,
  roles.salary AS salary,
  departments.name AS department,
  managers.first_name AS manager_first_name,
  managers.last_name AS manager_last_name

FROM employees
  -- Defines relationship between two tables --
JOIN roles ON employees.role_id = roles.id
JOIN managers ON employees.manager_id = managers.id
JOIN departments ON roles.department_id = departments.id;
CREATE DATABASE IF NOT EXISTS extra_hours;

CREATE USER 'admin'@'localhost' IDENTIFIED BY '5n4i3m2d1a';
GRANT ALL PRIVILEGES ON extra_hours.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;

/*
use extra_hours;

CREATE TABLE extra_hours.hour_types (
	id INT(10) AUTO_INCREMENT not null,
	description VARCHAR(50) not null,
	percentage DECIMAL(10, 2) not null,
	PRIMARY KEY (id)
);

-- Tabla hour_types
INSERT INTO extra_hours.hour_types (description, percentage) VALUES 
    ('Overtime - Weekday', 1.5),
    ('Overtime - Weekend', 2.0),
    ('Holiday', 2.5),
    ('Night Shift', 1.25),
    ('Special Assignment', 3.0);

commit;

CREATE TABLE extra_hours.areas(
	id int(10) AUTO_INCREMENT not null,
	area_name VARCHAR(50) not null,
	PRIMARY KEY (id)	
);

-- Tabla areas
INSERT INTO areas (area_name) VALUES
('Human Resources'),
('Finance'),
('Engineering'),
('Marketing'),
('Sales'),
('Operations'),
('IT'),
('Customer Service'),
('Product Development'),
('Research and Development'),
('Logistics'),
('Administration'),
('Quality Assurance'),
('Legal'),
('Procurement'),
('Public Relations'),
('Training'),
('Business Development'),
('Support Services'),
('Data Analysis');

	
commit;

CREATE TABLE extra_hours.jobs (
    job_id INT(10) AUTO_INCREMENT,         -- Clave primaria autoincremental
    job_name VARCHAR(50) NOT NULL,         -- Nombre del trabajo
    description TEXT,                      -- Descripción opcional del trabajo
    PRIMARY KEY (job_id)
);


-- Tabla jobs
INSERT INTO jobs (job_name, description) VALUES
('Software Engineer', 'Responsible for developing and maintaining software applications.'),
('Data Analyst', 'Analyzes data to help businesses make informed decisions.'),
('Project Manager', 'Manages project timelines, budgets, and team coordination.'),
('HR Specialist', 'Handles recruitment, employee relations, and HR policies.'),
('Marketing Manager', 'Develops and implements marketing strategies to promote products.'),
('Sales Representative', 'Engages with clients to sell products and services.'),
('Operations Manager', 'Oversees daily operations and ensures efficiency in processes.'),
('Financial Analyst', 'Provides financial insights and investment advice.'),
('Product Manager', 'Responsible for product planning and execution throughout the lifecycle.'),
('Customer Support', 'Provides support to customers and resolves their issues.'),
('Quality Assurance', 'Ensures product quality by testing and identifying defects.'),
('Business Analyst', 'Analyzes business needs and provides solutions for improvement.'),
('Network Administrator', 'Maintains and supports the organization’s computer networks.'),
('Database Administrator', 'Manages database systems for data storage and retrieval.'),
('Legal Advisor', 'Provides legal guidance and handles legal matters for the organization.'),
('Training Coordinator', 'Organizes and manages employee training programs.'),
('Logistics Coordinator', 'Coordinates and manages logistics and supply chain operations.'),
('Procurement Specialist', 'Handles purchasing of goods and services for the organization.'),
('Public Relations Specialist', 'Manages the organization’s public image and media relations.'),
('IT Support Specialist', 'Provides technical support to employees and maintains IT systems.');


commit;

CREATE TABLE extra_hours.employees (
    id INT(10) AUTO_INCREMENT not null,          -- AUTO_INCREMENT se usa en lugar de AUTOINCREMENT
    employee_id VARCHAR(50) NOT NULL,
    employee_name VARCHAR(50) NOT NULL,
    job_id INT(10) NOT NULL,
    salary DECIMAL(10, 2),              -- Definir el tamaño y la precisión de DECIMAL
    manager CHAR(1) NOT NULL,
    area INT(10) NOT NULL,
    PRIMARY KEY (id),
	UNIQUE KEY (employee_id),
	FOREIGN KEY (area) REFERENCES extra_hours.areas(id) -- PRIMARY KEY debe referirse a la columna "id"	
	ON DELETE CASCADE
    ON UPDATE CASCADE,
	FOREIGN KEY (job_id) REFERENCES extra_hours.jobs(job_id) -- PRIMARY KEY debe referirse a la columna "id"	
	ON DELETE CASCADE
    ON UPDATE CASCADE
);

	
INSERT INTO employees (employee_id, employee_name, manager, salary, area_id, job_id) VALUES
('E001', 'Alice Johnson', 'M001', 4500.00, 10, 20),
('E002', 'Bob Smith', 'M002', 4800.00, 9, 19),
('E003', 'Charlie Davis', 'M001', 4600.00, 8, 18),
('E004', 'Diana Brown', 'M003', 5000.00, 7, 17),
('E005', 'Evan Wilson', 'M002', 4700.00, 6, 16),
('E006', 'Fiona White', 'M001', 5200.00, 5, 15),
('E007', 'George Clark', 'M004', 4950.00, 4, 14),
('E008', 'Hannah Lewis', 'M003', 5300.00, 3, 13),
('E009', 'Ian Walker', 'M002', 4800.00, 2, 12),
('E010', 'Jessica Hall', 'M004', 5100.00, 1, 11),
('E011', 'Kevin Young', 'M001', 5400.00, 20, 1),
('E012', 'Laura Adams', 'M003', 4750.00, 19, 2),
('E013', 'Mike Scott', 'M002', 4900.00, 18, 3),
('E014', 'Nancy Evans', 'M001', 5500.00, 17, 4),
('E015', 'Oscar King', 'M004', 5150.00, 16, 5),
('E016', 'Pauline Perez', 'M003', 4600.00, 15, 6),
('E017', 'Quincy Torres', 'M002', 5050.00, 14, 7),
('E018', 'Rachel Garcia', 'M001', 5250.00, 13, 8),
('E019', 'Steve Robinson', 'M004', 4900.00, 12, 9),
('E020', 'Tina Martinez', 'M003', 5300.00, 11, 10);


commit;



DELIMITER //

CREATE PROCEDURE extra_hours.UpdateITEmployeeExtraHours(
    IN p_employee_id INT,
    IN p_start_datetime DATETIME,
    IN p_end_datetime DATETIME,
    IN p_hour_price DECIMAL(10,2),
    IN p_comments VARCHAR(255),
    IN p_extra_hour_type_id INT
)
BEGIN
    DECLARE v_department VARCHAR(50);
    DECLARE v_exists INT;
    DECLARE v_total_hours DECIMAL(10,2);
    DECLARE v_total_payment DECIMAL(10,2);
    DECLARE v_id INT;
    
    -- Check if employee exists and is from IT department
    SELECT department INTO v_department
    FROM employees
    WHERE employee_id = p_employee_id;
    
    -- Validate employee exists and belongs to IT department
    IF v_department IS NULL THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Employee not found';
    ELSEIF v_department != 'IT' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Employee does not belong to IT department';
    END IF;
    
    -- Validate datetime inputs
    IF p_start_datetime >= p_end_datetime THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'End datetime must be after start datetime';
    END IF;
    
    -- Validate extra hour type exists
    IF NOT EXISTS (SELECT 1 FROM extra_hour_types WHERE id = p_extra_hour_type_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid extra hour type';
    END IF;
    
    -- Calculate total hours (in decimal format)
    SET v_total_hours = TIMESTAMPDIFF(SECOND, p_start_datetime, p_end_datetime) / 3600.0;
    
    -- Validate total hours
    IF v_total_hours <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Total hours must be greater than 0';
    ELSEIF v_total_hours > 24 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Total hours cannot exceed 24 hours per day';
    END IF;
    
    -- Calculate total payment
    SET v_total_payment = v_total_hours * p_hour_price;
    
    -- Check if record already exists for this datetime range
    SELECT id INTO v_id
    FROM extra_hours
    WHERE employee_id = p_employee_id
    AND (
        (p_start_datetime BETWEEN start_datetime AND end_datetime) OR
        (p_end_datetime BETWEEN start_datetime AND end_datetime) OR
        (start_datetime BETWEEN p_start_datetime AND p_end_datetime)
    );
    
    -- Update or insert the record
    IF v_id IS NOT NULL THEN
        UPDATE extra_hours
        SET 
            start_datetime = p_start_datetime,
            end_datetime = p_end_datetime,
            hour_price = p_hour_price,
            amount_extra_hours = v_total_hours,
            comments = p_comments,
            total_extra_hour = v_total_hours,
            total_payment = v_total_payment,
            employee_id = p_employee_id,
            extra_hour_type_id = p_extra_hour_type_id,
            updated_at = NOW()
        WHERE 
            id = v_id;
    ELSE
        INSERT INTO extra_hours (
            start_datetime,
            end_datetime,
            hour_price,
            amount_extra_hours,
            comments,
            total_extra_hour,
            total_payment,
            employee_id,
            extra_hour_type_id,
            created_at,
            updated_at
        ) VALUES (
            p_start_datetime,
            p_end_datetime,
            p_hour_price,
            v_total_hours,
            p_comments,
            v_total_hours,
            v_total_payment,
            p_employee_id,
            p_extra_hour_type_id,
            NOW(),
            NOW()
        );
    END IF;
    
    -- Commit the transaction
    COMMIT;
    
END //

DELIMITER ;
*/
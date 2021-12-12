CREATE TRIGGER `department_total_employee` BEFORE INSERT ON `employees`
 FOR EACH ROW UPDATE departments SET `total_employee` = total_employee+1 WHERE `department_id` = NEW.`department_id`
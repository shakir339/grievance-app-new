CREATE DATABASE IF NOT EXISTS grievance_system;

USE grievance_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaints (
  id VARCHAR(20) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  status ENUM('pending', 'in-progress', 'resolved', 'rejected') DEFAULT 'pending',
  user_id INT,
  attachment_path VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE updates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_id VARCHAR(20) NOT NULL,
  user_id INT,
  message TEXT NOT NULL,
  update_type ENUM('system', 'staff', 'user') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (complaint_id) REFERENCES complaints(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, email, phone, password, role) VALUES 
('Admin User', 'admin@example.com', '1234567890', '$2y$10$6Y5.THnV58ubhvFBQ4PQSuKvyOzArcpS1BqzNUHhq3hIgsG9/Yx8q', 'admin');

INSERT INTO complaints (id, title, description, category, status, user_id) VALUES
('GR2023001', 'Sample Complaint 1', 'This is a sample complaint for testing', 'Technical', 'pending', 1),
('GR2023002', 'Sample Complaint 2', 'Another sample complaint for testing', 'Billing', 'in-progress', 1);

INSERT INTO updates (complaint_id, user_id, message, update_type) VALUES
('GR2023001', 1, 'Complaint registered', 'system'),
('GR2023002', 1, 'Complaint registered', 'system'),
('GR2023002', 1, 'We are looking into your issue', 'staff');

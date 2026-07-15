
# PHP Backend Setup for XAMPP

This document explains how to set up the PHP backend for the Grievance Redressal System using XAMPP.

## Setup Instructions

1. Install XAMPP from [https://www.apachefriends.org](https://www.apachefriends.org)
2. Start the Apache and MySQL services from the XAMPP Control Panel
3. Create a folder named `grievance-api` in your XAMPP `htdocs` directory (typically `C:/xampp/htdocs/` on Windows or `/Applications/XAMPP/htdocs/` on Mac)
4. Create the following directory structure inside the `grievance-api` folder:

```
grievance-api/
├── config/
│   └── database.php
├── auth/
│   ├── login.php
│   ├── register.php
│   └── logout.php
├── complaints/
│   ├── list.php
│   ├── detail.php
│   ├── submit.php
│   └── update.php
└── uploads/
```

5. Configure the `database.php` file for MySQL connection
6. Implement the PHP endpoints according to the API structure defined in the frontend services

## Basic Database Configuration

Create this file at `config/database.php`:

```php
<?php
// Database connection parameters
$host = "localhost";
$dbname = "grievance_system";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password is blank

// Create connection
function connect_db() {
    global $host, $dbname, $username, $password;
    
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        // Set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

// Enable CORS for development
header("Access-Control-Allow-Origin: http://localhost:5173"); // Update this to match your React dev server
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Handle pre-flight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
```

## Required Database Tables

Execute these SQL queries in phpMyAdmin to create the necessary tables:

```sql
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
```

## Example Implementation for Login

Create this file at `auth/login.php`:

```php
<?php
// Include database connection
require_once '../config/database.php';

// Only allow POST requests for this endpoint
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit();
}

try {
    $conn = connect_db();
    
    // Get user by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
    $stmt->bindParam(":email", $data['email']);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verify password
        if (password_verify($data['password'], $user['password'])) {
            // Generate a simple token (in production, use a proper JWT library)
            $token = bin2hex(random_bytes(32));
            
            // Return user info and token
            echo json_encode([
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role'],
                ],
                'token' => $token,
                'message' => 'Login successful'
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
        }
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'User not found']);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
```

Additional PHP endpoints should be implemented similarly, following the service structure defined in the frontend code.

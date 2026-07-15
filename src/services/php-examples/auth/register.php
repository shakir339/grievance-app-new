<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and password are required']);
    exit();
}

$phone = isset($data['phone']) ? $data['phone'] : '';

try {
    $conn = connect_db();
    
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
    $stmt->bindParam(":email", $data['email']);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Email already in use']);
        exit();
    }
    
    $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("INSERT INTO users (name, email, phone, password) VALUES (:name, :email, :phone, :password)");
    $stmt->bindParam(":name", $data['name']);
    $stmt->bindParam(":email", $data['email']);
    $stmt->bindParam(":phone", $phone);
    $stmt->bindParam(":password", $hashed_password);
    $stmt->execute();
    
    $user_id = $conn->lastInsertId();
    
    $token = bin2hex(random_bytes(32));
    
    echo json_encode([
        'user' => [
            'id' => $user_id,
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => 'user',
        ],
        'token' => $token,
        'message' => 'Registration successful'
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>

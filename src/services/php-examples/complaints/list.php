<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    $conn = connect_db();
    
    $stmt = $conn->prepare("
        SELECT c.*, DATE_FORMAT(c.created_at, '%Y-%m-%d') as date
        FROM complaints c 
        ORDER BY c.created_at DESC
    ");
    $stmt->execute();
    $complaints = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($complaints);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>

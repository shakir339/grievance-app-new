<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Complaint ID is required']);
    exit();
}

$id = $_GET['id'];

try {
    $conn = connect_db();
    
    $stmt = $conn->prepare("
        SELECT c.*, DATE_FORMAT(c.created_at, '%Y-%m-%d') as date
        FROM complaints c 
        WHERE c.id = :id
        LIMIT 1
    ");
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Complaint not found']);
        exit();
    }
    
    $complaint = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $stmt = $conn->prepare("
        SELECT u.*, u.created_at as timestamp, us.name as user_name, us.role
        FROM updates u
        LEFT JOIN users us ON u.user_id = us.id
        WHERE u.complaint_id = :id
        ORDER BY u.created_at ASC
    ");
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $updates = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $complaint['updates'] = $updates;
    
    if (!empty($complaint['attachment_path'])) {
        $complaint['attachments'] = [$complaint['attachment_path']];
    } else {
        $complaint['attachments'] = [];
    }
    
    echo json_encode($complaint);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>

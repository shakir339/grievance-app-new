<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
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

$data = json_decode(file_get_contents('php://input'), true);

if ((!isset($data['status']) || empty($data['status'])) && 
    (!isset($data['comment']) || empty($data['comment']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Status or comment is required']);
    exit();
}

try {
    $conn = connect_db();
    
    $stmt = $conn->prepare("SELECT id FROM complaints WHERE id = :id LIMIT 1");
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Complaint not found']);
        exit();
    }
    
    if (isset($data['status']) && !empty($data['status'])) {
        $status = $data['status'];
        
        $valid_statuses = ['pending', 'in-progress', 'resolved', 'rejected'];
        if (!in_array($status, $valid_statuses)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid status value']);
            exit();
        }
        
        $stmt = $conn->prepare("UPDATE complaints SET status = :status WHERE id = :id");
        $stmt->bindParam(":status", $status);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        
        $message = "Status updated to: " . ucfirst($status);
        $stmt = $conn->prepare("
            INSERT INTO updates (complaint_id, user_id, message, update_type) 
            VALUES (:complaint_id, 1, :message, 'staff')
        ");
        $stmt->bindParam(":complaint_id", $id);
        $stmt->bindParam(":message", $message);
        $stmt->execute();
    }
    
    if (isset($data['comment']) && !empty($data['comment'])) {
        $comment = $data['comment'];
        $stmt = $conn->prepare("
            INSERT INTO updates (complaint_id, user_id, message, update_type) 
            VALUES (:complaint_id, 1, :message, 'staff')
        ");
        $stmt->bindParam(":complaint_id", $id);
        $stmt->bindParam(":message", $comment);
        $stmt->execute();
    }
    
    echo json_encode([
        'message' => 'Complaint updated successfully'
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>

<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

function generateComplaintId() {
    $year = date('Y');
    
    try {
        $conn = connect_db();
        $stmt = $conn->prepare("
            SELECT COUNT(*) as count 
            FROM complaints 
            WHERE id LIKE :pattern
        ");
        $pattern = "GR$year%";
        $stmt->bindParam(":pattern", $pattern);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $count = $result['count'] + 1;
        return "GR" . $year . str_pad($count, 3, '0', STR_PAD_LEFT);
    } catch(PDOException $e) {
        return "GR" . $year . rand(100, 999);
    }
}

if (isset($_POST['title']) && isset($_POST['description']) && isset($_POST['category'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $category = $_POST['category'];
    $user_id = 1;
    
    $attachment_path = null;
    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == 0) {
        $uploads_dir = '../uploads/';
        
        if (!is_dir($uploads_dir)) {
            mkdir($uploads_dir, 0755, true);
        }
        
        $filename = uniqid() . '_' . basename($_FILES['attachment']['name']);
        $target = $uploads_dir . $filename;
        
        if (move_uploaded_file($_FILES['attachment']['tmp_name'], $target)) {
            $attachment_path = $filename;
        }
    }
} else {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['title']) || !isset($data['description']) || !isset($data['category'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Title, description, and category are required']);
        exit();
    }
    
    $title = $data['title'];
    $description = $data['description'];
    $category = $data['category'];
    $user_id = 1;
    $attachment_path = null;
}

try {
    $conn = connect_db();
    
    $complaint_id = generateComplaintId();
    
    $stmt = $conn->prepare("
        INSERT INTO complaints (id, title, description, category, user_id, attachment_path) 
        VALUES (:id, :title, :description, :category, :user_id, :attachment_path)
    ");
    $stmt->bindParam(":id", $complaint_id);
    $stmt->bindParam(":title", $title);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":category", $category);
    $stmt->bindParam(":user_id", $user_id);
    $stmt->bindParam(":attachment_path", $attachment_path);
    $stmt->execute();
    
    $message = "Complaint registered";
    $stmt = $conn->prepare("
        INSERT INTO updates (complaint_id, user_id, message, update_type) 
        VALUES (:complaint_id, :user_id, :message, 'system')
    ");
    $stmt->bindParam(":complaint_id", $complaint_id);
    $stmt->bindParam(":user_id", $user_id);
    $stmt->bindParam(":message", $message);
    $stmt->execute();
    
    echo json_encode([
        'id' => $complaint_id,
        'message' => 'Complaint submitted successfully'
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>

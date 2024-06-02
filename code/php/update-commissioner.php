<?php
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
		http_response_code(405); // Method Not Allowed
		echo json_encode(['message' => 'Method Not Allowed']);
		exit;
	}

	if (!isset($_POST['wallet']) || !isset($_POST['task'])) {
		http_response_code(400); // Bad Request
		echo json_encode(['message' => 'Wallet address and task value are required']);
		exit;
	}

	$walletAddress = $_POST['wallet'];
	$taskValue = (int) $_POST['task'];

	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

	try {
		$stmt = $my_Db_Connection->prepare("UPDATE users SET commissioner_task = :task WHERE account = :wallet");
		$stmt->bindParam(':wallet', $walletAddress);
		$stmt->bindParam(':task', $taskValue, PDO::PARAM_INT);
		$stmt->execute();

		if ($stmt->rowCount() > 0) {
		    echo json_encode(['message' => 'Commissioner task updated successfully']);
		}
		else {
		    http_response_code(404); // Not Found
		    echo json_encode(['message' => 'No user found for the provided wallet address or no change needed']);
		}
	}
	catch (PDOException $e) {
		http_response_code(500); // Internal Server Error
		echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
	}
?>
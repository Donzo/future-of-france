<?php
	header('Content-Type: application/json');

	if (!isset($_GET['wallet']) || empty($_GET['wallet'])) {
		http_response_code(400); // Bad Request
		echo json_encode(['message' => 'Wallet address is required']);
		exit;
	}

	$walletAddress = $_GET['wallet'];

	//Including the database connection file
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

	try {
		$stmt = $my_Db_Connection->prepare("SELECT commissioner_task FROM users WHERE account = :wallet LIMIT 1");
		$stmt->bindParam(':wallet', $walletAddress);
		$stmt->execute();

		if ($row = $stmt->fetch()) {
			echo json_encode(['commissioner_task' => $row['commissioner_task']]);
		} else {
			http_response_code(404); // Not Found
			echo json_encode(['message' => 'No user found for the provided wallet address']);
		}
	}
	catch (PDOException $e) {
		http_response_code(500); // Internal Server Error
		echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
	}
?>
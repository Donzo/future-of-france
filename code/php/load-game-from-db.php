<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

	try {
		$my_Db_Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		// SQL to check if the user exists and retrieve levels
		$sql = "SELECT current_level, last_level_passed FROM users WHERE account = :account";
		$stmt = $my_Db_Connection->prepare($sql);
		$stmt->bindParam(':account', $_POST['account']);
		$stmt->execute();

		$result = $stmt->fetch(PDO::FETCH_ASSOC);

		if ($result){
			echo json_encode(["status" => "success", "data" => $result]);
		}
		else{
			echo json_encode(["status" => "error", "message" => "User not found"]);
		}
	}
	catch(PDOException $e) {
		echo json_encode(["status" => "error", "message" => $e->getMessage()]);
	}
	finally {
		$my_Db_Connection = null; // Close connection
	}
?>
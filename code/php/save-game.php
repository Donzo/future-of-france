<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

	try {
		$my_Db_Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		//SQL to insert or update user levels
		$sql = "INSERT INTO users (account, current_level, last_level_passed)
						VALUES (:account, :currentLevel, :lastLevelPassed)
						ON DUPLICATE KEY UPDATE 
						current_level = VALUES(current_level),
						last_level_passed = VALUES(last_level_passed)";

		$stmt = $my_Db_Connection->prepare($sql);
		$stmt->bindParam(':account', $_POST['account']);
		$stmt->bindParam(':currentLevel', $_POST['currentLevel'], PDO::PARAM_INT);
		$stmt->bindParam(':lastLevelPassed', $_POST['lastLevelPassed'], PDO::PARAM_INT);

		$stmt->execute();

		echo json_encode(["status" => "success"]);
	}
	catch(PDOException $e) {
		echo json_encode(["status" => "error", "message" => $e->getMessage()]);
	}
	finally {
		$my_Db_Connection = null; // Close connection
	}
?>
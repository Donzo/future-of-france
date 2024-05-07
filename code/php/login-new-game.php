<?php

	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

	try {
		$my_Db_Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		$sql = "INSERT INTO users (account, last_level_passed) VALUES (:account, :level) ON DUPLICATE KEY UPDATE last_level_passed = VALUES(last_level_passed)";
		$stmt = $my_Db_Connection->prepare($sql);
		$stmt->bindParam(':account', $_POST['account']);
		$stmt->bindParam(':level', $_POST['level'], PDO::PARAM_INT);

		$stmt->execute();

		echo json_encode(["status" => "success"]);
	}
	catch(PDOException $e) {
		echo json_encode(["status" => "error", "message" => $e->getMessage()]);
	}
	finally{
		$my_Db_Connection = NULL;
	}
?>
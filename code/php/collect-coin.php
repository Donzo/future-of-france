<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

	if (isset($_GET['coinNumber']) && isset($_GET['account'])) {
		$coinNumber = $_GET['coinNumber'];
		$account = $_GET['account'];
		$coinColumn = "c" . $coinNumber; //Construct the column name dynamically based on coin number

		try {
			$my_Db_Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$my_Db_Connection->beginTransaction();

			// Check if the coin is available (i.e., FALSE)
			$checkCoinSql = "SELECT $coinColumn FROM blue_coins WHERE account = :account AND $coinColumn = 0";
			$checkStmt = $my_Db_Connection->prepare($checkCoinSql);
			$checkStmt->bindParam(':account', $account);
			$checkStmt->execute();

			if ($checkStmt->rowCount() == 0) {
				throw new Exception("Coin is not available for collection.");
			}

			// Update the coin as collected (set to TRUE)
			$updateCoinSql = "UPDATE blue_coins SET $coinColumn = TRUE, total_coins_found = total_coins_found + 1, coins_held = coins_held + 1 WHERE account = :account";
			$updateStmt = $my_Db_Connection->prepare($updateCoinSql);
			$updateStmt->bindParam(':account', $account);
			$updateStmt->execute();

			$my_Db_Connection->commit();
			echo json_encode(["status" => "success", "message" => "Coin collected successfully and coin counts updated."]);
		}
		catch (Exception $e) {
			$my_Db_Connection->rollBack();
			echo json_encode(["status" => "error", "message" => $e->getMessage()]);
		}
		finally {
			$my_Db_Connection = NULL;
		}
	}
	else {
		echo json_encode(["status" => "error", "message" => "Missing parameters."]);
	}
?>
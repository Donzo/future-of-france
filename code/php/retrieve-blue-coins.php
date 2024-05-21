<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

	if (isset($_GET['account'])) {
		$account = $_GET['account'];

		try {
			$my_Db_Connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			// Prepare SQL to select all coin columns for the given account
			$sql = "SELECT * FROM blue_coins WHERE account = :account";
			$stmt = $my_Db_Connection->prepare($sql);
			$stmt->bindParam(':account', $account);
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOC);

			if ($result) {
				$collectedCoins = [];
				foreach ($result as $coin => $status) {
					if ($status && $coin != 'account') { // Ensure we only take coin fields
						$collectedCoins[$coin] = $status;
					}
				}
				echo json_encode(["status" => "success", "collectedCoins" => $collectedCoins]);
			}
			else {
				echo json_encode(["status" => "error", "message" => "No coin data found for the account."]);
			}
		}
		catch (PDOException $e) {
			echo json_encode(["status" => "error", "message" => $e->getMessage()]);
		}
	}
	else {
		echo json_encode(["status" => "error", "message" => "Missing account parameter."]);
	}
?>
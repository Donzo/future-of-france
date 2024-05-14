<?php
	
	//Check if wallet is provided
	if (isset($_GET['wallet'])) {
		$walletAddress = $_GET['wallet'];
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

		// Prepare and execute the SELECT statement
		$stmt = $my_Db_Connection->prepare(
			"SELECT current_level, last_level_passed, arbi_test_eth_sent 
			 FROM users WHERE account = :wallet");
		$stmt->bindParam(':wallet', $walletAddress);
		$stmt->execute();

		// Fetch the result
		if ($row = $stmt->fetch()){
			if ($row['current_level'] == 4 && $row['last_level_passed'] >= 3 && !$row['arbi_test_eth_sent']) {
				// Call the ETH sending script here
				//echo json_encode(['message' => 'Conditions ARE met for sending ETH']);
				define('AmServerSide', TRUE);
				require_once($_SERVER['DOCUMENT_ROOT'] . "/code/php/arbi-eth-sending-script.php");
			}
			else{
				echo json_encode(['message' => 'Conditions not met for sending ETH']);
			}
		}
		else{
			echo json_encode(['message' => 'No user found']);
		}
	}
	else{
		die('Invalid request parameters.');
	}
?>
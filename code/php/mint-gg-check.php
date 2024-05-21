<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");
	
	//Check if wallet and token are provided
	if (isset($_GET['wallet'])) {

		$walletAddress = $_GET['wallet'];

		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/mysql-connect.php');

		//Prepare and execute the SELECT statement
		$stmt = $my_Db_Connection->prepare("SELECT graduation_gift_minted FROM users WHERE account = :wallet AND gg_mint_requests <= 7");
		$stmt->bindParam(':wallet', $walletAddress);
		$stmt->execute();

		//Initialize variable to hold mint value
		$ggMinted = "1";

		//Fetch the result
		if ($row = $stmt->fetch()) {
			$ggMinted = $row['graduation_gift_minted']; 
		}
		
		$response = json_encode(['ggMinted' => "$ggMinted"]); //return string
		echo $response;

		//Increase Mint Requests with Each File Check
		$stmt2 = $my_Db_Connection->prepare("UPDATE users SET gg_mint_requests = gg_mint_requests + 1 WHERE account = :wallet");
		$stmt2->bindParam(':wallet', $walletAddress);
		$stmt2->execute();
		
		$my_Db_Connection = NULL;
		
	}
	else {
		die('Invalid request parameters.');
	}
?>
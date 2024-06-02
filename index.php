<!DOCTYPE html>
<html>
<head>
	
	<?php
		//META TAGS 
		//Page Title, Description, Social Images, Favicons, and Web Fonts 
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/meta-tags.php";
		
		//CSS
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/css/style.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/css/sys-msgs.php";
		
		//JS 
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/font-preloader.php";
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/img-preloader.php";
	?>
	
	<script>
		<?php
			//WEB3JS INTERFACE CODE
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/web3js/web3.min.js";
			//Wallet Connection Code
			require_once $_SERVER['DOCUMENT_ROOT'] . "/code/js/wallet-connect.php";
		?>
	</script>
	
	<!-- Game Files -->
	<script type="text/javascript" src="lib/impact/impact.js"></script>
	<script type="text/javascript" src="lib/game/main.js"></script>
</head>
<body>
	<?php
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/php/mysql-connect.php";
	?>	
	<canvas id="canvas"></canvas>
	<!-- Captures Player Input In-Game -->
	<input type="text" id="playerInput" style="position: absolute; left: -9999px; top: 0px;">
	<?php
		//System Messages HTML - Alert Boxes and Such
		require_once $_SERVER['DOCUMENT_ROOT'] . "/code/html/system-messages.php";
		
		//Custom Alert and Sys Message Boxes Called Like This:
		//popAlert(1);
		//popConfirm(1);
		//popMiningBox(1, "0x0x0x0x0x0x")
		//popInputBox(1);
	?>	
</body>
<footer>	
	<?php
		//Functions for Interacting with Smart Contracts
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-01.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-02.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-03.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-04.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-05.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-06.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-07.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-08.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-09.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-10.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-11.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-12.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/blue-key-token-functions.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/graduation-gift-functions.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/js.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/sys-msgs.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/aave-contract-functions.php');
	?>
</footer>
</html>

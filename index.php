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
	?>	
</body>
<footer>	
	<?php
		//Additional JS
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/abi-01.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/contract-functions.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/js.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/code/js/sys-msgs.php');
	?>
</footer>
</html>

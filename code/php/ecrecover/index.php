<?php
	
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/vendor/autoload.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/ecrecover_helper.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/AddressCodec.class.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/AddressValidation.class.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/Base58.class.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/PointMathBCMATH.class.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/PointMathGMP.class.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/PrivateKey.class.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/SECp256k1.class.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/Signature.class.php');
	require_once($_SERVER['DOCUMENT_ROOT'] . '/code/php/ecrecover/CryptoCurrencyPHP/Wallet.class.php');
	

	
	$msg = 'Sign here to login.';
	echo "<br/>MSG: <br/>" . $msg;
	$signed = '0x0d8bd255b3d79b7e7a0080c2933eafec18bb73b8aa6b3dadae22d60f2aa1762870702b42fd4d1b641faf4397f3e05196036776512ebe290d2fb4ae86537097a41b';
	echo "<br/> &nbsp; <br/>Signature: <br/>" . $signed;
	echo "<br/> &nbsp; <br/>Signer: <br/>";
	echo personal_ecRecover($msg, $signed), "\n";

?>
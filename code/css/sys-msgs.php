<style>
		/******************************************
					SYSTEM MESSAGE BOXES CSS
		*******************************************/
		
		#sysMsgBoxBG{
			position: absolute;
			top: 0;
			height: 150%;
			left: 0;
			width: 100%;
			background: #000000;
			opacity: .75;
			display: none;
		}
		.sysMsgBox{
			position: absolute;
			background: rgba(235, 235, 237);
			color: rgb(27, 32, 48);
			border: 8px solid #0047AB;
			border-radius: 4px;
			box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
			border-radius: 4px;
			box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25);
				display: -webkit-box;
				display: -webkit-flex;
				display: -ms-flexbox;
			top: 20%;
			height: 60%;
			width: 60%;
			margin-left: auto;
			margin-right: auto;
			left: 0;
			right: 0;
			text-align: left;
		}
		.sysMsgBoxTitle{
			font-family: "Jersey 25", sans-serif;
			font-size: 3.25em;
			font-weight: 700;
			margin: 1.25em 0em .25em;
			text-align: center;
			z-index: 101;
		}
		.sysMsgBoxBody{
			margin: 1.5em 2em .25em;
			font-family: "Jersey 25", sans-serif;
			font-weight: 400;
			font-size: 2.2em;
			z-index: 100;
		}
		#alertBox{
			display: none;
		}
		#confirmBox{
			display: none;
		}
		#inputBox{
			display: none;
		}
		#miningInfoBox{
			display: none;
			background: #FFFFFF;
		}
		#miningInfoLoadingWheelDiv{
			max-height: 25vh;
			z-index: -100;
		}
		#miningInfoLoadingWheelDiv img{
			max-height: 25vh;
			z-index: -99;
		}
		#eth-input-field{
			margin-bottom: 3em;
		}
		#eth-input{
			width: 20%;
			height: 2em;
			font-size: 1.75em;
			padding: .5em;
		}
		.sysMsgBoxButtons{
			position: absolute;
			bottom: 20px;
			margin-left: auto;
			margin-right: auto;
			left: 0;
			right: 0;
			text-align: center;
		}
		.sysMsgButton{
			font-family: "Jersey 25", sans-serif;
			padding: .5em 2em;
			font-size: 2em;
			margin: 1em 2em;
			cursor: pointer;
		}
	</style>
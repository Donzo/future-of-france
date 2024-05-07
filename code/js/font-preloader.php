<!-- Preload Web Fonts -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.1.0/fontfaceobserver.standalone.js"></script>
	<script>
		document.addEventListener("DOMContentLoaded", function() {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');

		// Define Font Face Observers for each font
		var jersey25 = new FontFaceObserver('Jersey 25');
		var jersey10 = new FontFaceObserver('Jersey 10');
		var jersey10Charted = new FontFaceObserver('Jersey 10 Charted');

		//Use Promise.all to wait for all fonts to load
		Promise.all([
			jersey25.load(),
			jersey10.load(),
			jersey10Charted.load()
		]).then(function () {
			console.log('All fonts are available');
			//Setup the canvas or redraw the screen after fonts are loaded
			ctx.font = '20px "Jersey 10", sans-serif';
			ctx.fillText("Jersey 10 loaded!", 50, 100);
			ctx.font = '20px "Jersey 25", sans-serif';
			ctx.fillText("Jersey 25 loaded!", 50, 130);
			ctx.font = '20px "Jersey 10 Charted", sans-serif';
			ctx.fillText("Jersey 10 Charted loaded!", 50, 160);
		}).catch(function (e) {
				console.log('One or more fonts are not available:', e);
				//Fallback font if any font fails to load
				ctx.font = '20px sans-serif'; 
				ctx.fillText("Loading failed for one or more fonts.", 50, 100);
			});
		});
	</script>
ig.module(
	'plugins.dialogue-tool'
)
.requires(
	'impact.impact'
)
.defines(function(){

	DialogueTool = ig.Class.extend({ 
		uniformTextSize: "40px", // Use pixels directly for the font size
		defaultFontName: "Sans-serif", // Default font name
		//Orange
		defaultFontColor: "#FF8C00", // Default font color
		//White
		fontColor2: "#F8F8FF", // Other font colors
		//Green
		fontColor3: "#39FF14",
		
		//Blue and Purple
		strkClr:"#191970",
		strkClr2:"#8A2BE2",
		
		//Style Switches
		color2: false,
		color3: false,
		
		isItalic: false, // Control italic style
		currentChunkIndex: 0,
		textChunks: [],
		textMeasures: [],
		
		init: function() {
			// Initialization code if needed
		},

		prepareTextChunks: function(context, text, maxWidth, maxHeight, lineHeight) {
			this.textChunks = this.chunkText(context, text, maxWidth, maxHeight, lineHeight);
			this.currentChunkIndex = 0;
		},
		//Used to find txt that fits on one slide for prompt making.
		measureText: function(context, text, maxWidth, maxHeight, lineHeight) {
			const words = text.split(' ');
			let currentLine = '';
			let totalHeight = 0;

			context.font = (this.isItalic ? "italic " : "") + this.uniformTextSize + " " + this.defaultFontName;

			for (const word of words) {
				const testLine = currentLine + word + ' ';
				const metrics = context.measureText(testLine);
		
				if (metrics.width > maxWidth) {
					totalHeight += lineHeight;
					if (totalHeight > maxHeight) {
						return false; // As soon as we exceed maxHeight, return false
					}
					currentLine = word + ' '; // Start a new line with the current word
				}
				else{
				//Otherwise, add the word to the current line
					currentLine = testLine;
				}
			}

			// Add the final line height (if any line exists)
			if (currentLine) {
				totalHeight += lineHeight;
			}
			return totalHeight <= maxHeight;
		},
		
		chunkText: function(context, text, maxWidth, maxHeight, lineHeight) {
			let chunks = [];
			let words = text.split(' ');
			let currentLine = '';
			let currentPage = [];
			let currentPageHeight = 0;

			context.font = this.uniformTextSize + ' ' + this.defaultFontName; // Set the font for measurement

			words.forEach(word => {
				let testLine = currentLine + word + " ";
				let metrics = context.measureText(testLine);

				if (metrics.width > maxWidth && currentLine !== '') {
					currentPage.push(currentLine);
					currentLine = word + " ";
					currentPageHeight += lineHeight;

					if (currentPageHeight + lineHeight > maxHeight) {
						chunks.push(currentPage.join("\n"));
						currentPage = [];
						currentPageHeight = 0;
					}
				} else {
					currentLine = testLine;
				}
			});

			if (currentLine !== '') {
				currentPage.push(currentLine);
			}

			if (currentPage.length > 0) {
				chunks.push(currentPage.join("\n"));
			}
			return chunks;
		},

		displayTextChunk: function(context, chunk, x, startY, lineHeight, stroke, strokeColor, strokeWidth) {
		    context.font = (this.isItalic ? "italic " : "") + this.uniformTextSize + ' ' + this.defaultFontName;
			context.fillStyle = this.color2 ? this.fontColor2 : this.defaultFontColor; //Use a Different Color

			context.strokeStyle = strokeColor ? strokeColor : this.strkClr; // Default stroke color
			if (this.color3){
				console.log('color 3 is on...')
				context.fillStyle = this.fontColor3;
				context.strokeStyle = this.strkClr2;
			}
			context.lineWidth = strokeWidth ? strokeWidth : parseInt(this.uniformTextSize.replace('px', '')) * 0.1;

			if (chunk) {
				let lines = chunk.split("\n");
				let y = startY; // Start from the specified startY, adjust as needed for padding

				lines.forEach((line, index) => {
				if (stroke) {
					context.strokeText(line, x, y + lineHeight * index); // Stroke the text
				}
				context.fillText(line, x, y + lineHeight * index); // Fill the text
			});
			}
			else{
				ig.game.dBoxUp = false;
				ig.game.dialogueNum = 0;
			}
		}

	});

});


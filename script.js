document.addEventListener("DOMContentLoaded", () => {
	const grid = document.createElement("div");
	grid.setAttribute("class", "grid");
	document.getElementById("game-container").appendChild(grid);

	// Creating cells
	for (let i = 0; i < 100; i++) {
		const cell = document.createElement("div");
		cell.setAttribute("class", "cell");
		grid.appendChild(cell);
	}

	// Starting position for Pac-Man
	let pacmanCurrentIndex = 44;
	grid.children[pacmanCurrentIndex].classList.add("pacman");

	// Mark some cells as walls (for testing)
	const wallIndices = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10, // Top row for demonstration
		15,
		25,
		35,
		45,
		55,
		65,
		75,
		85,
		95, // Left column for demonstration
	];
	wallIndices.forEach((index) => grid.children[index].classList.add("wall"));

	// Move Pac-Man with collision detection
	function movePacman(e) {
		const attemptedNextIndex = calculateNextIndex(
			pacmanCurrentIndex,
			e.keyCode
		);
		if (!grid.children[attemptedNextIndex].classList.contains("wall")) {
			grid.children[pacmanCurrentIndex].classList.remove("pacman");
			pacmanCurrentIndex = attemptedNextIndex;
			grid.children[pacmanCurrentIndex].classList.add("pacman");
		}
	}

	function calculateNextIndex(currentIndex, keyCode) {
		switch (keyCode) {
			case 37: // left arrow key
				if (currentIndex % 10 !== 0) return currentIndex - 1;
				break;
			case 38: // up arrow key
				if (currentIndex - 10 >= 0) return currentIndex - 10;
				break;
			case 39: // right arrow key
				if (currentIndex % 10 < 9) return currentIndex + 1;
				break;
			case 40: // down arrow key
				if (currentIndex + 10 < 100) return currentIndex + 10;
				break;
		}
		return currentIndex; // Return current index if no valid move is possible
	}

	document.addEventListener("keyup", movePacman);
});

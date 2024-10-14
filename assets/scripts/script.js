
let currentIndex = 0;


function createArrows() {
	const arrow_left = document.createElement("img");
	arrow_left.setAttribute("class", "arrow arrow_left");
	arrow_left.setAttribute("src", "./assets/images/arrow_left.png");
	arrow_left.setAttribute("alt", "fleche gauche");
	banner.appendChild(arrow_left);



	const arrow_right = document.createElement("img");
	arrow_right.setAttribute("class", "arrow arrow_right");
	arrow_right.setAttribute("src", "./assets/images/arrow_right.png");
	arrow_right.setAttribute("alt", "fleche droite");
	banner.appendChild(arrow_right);

	// Gestionnaire d'événement pour le clic sur la flèche gauche
	arrow_left.addEventListener('click', function () {
		let lastIdex = currentIndex;
		currentIndex = (currentIndex - 1);
		updateCarousel(currentIndex, 'left');
		updateDots(currentIndex, lastIdex); // Mettez à jour les points indicateurs
	});

	// Gestionnaire d'événement pour le clic sur la flèche droite
	arrow_right.addEventListener('click', function () {
		let lastIdex = currentIndex;
		currentIndex = (currentIndex + 1);
		updateCarousel(currentIndex, 'right');
		updateDots(currentIndex, lastIdex); // Mettez à jour les points indicateurs
	});

}

function createDots() {

	for (let j = 0; j < slideLength; j++) {
		const dot = document.createElement("div"); //on créé les div dots
		dot.setAttribute("class", "dot");

		let id = `dot_${j}`; // on leur ajoute des Id pour les appeler plus facilement
		dot.setAttribute("id", id);

		dot.addEventListener("click", function () {
			console.log("click: " + j)
			// au clic sur un dot, celui-ci est activé (class dot_activated) le Content (img, text) et l'index sont modifiés.			
			updateCarousel(j, "dotClic");
			updateDotsOnClic(j);
		})
		dotsDiv.appendChild(dot); // les dots sont ajoutés à la div principale
	}
}

function updateDotsOnClic(index) {
	let active = `dot_${index}`;
	activeDot = document.getElementById(active);
	activeDot.setAttribute("class", "dot dot_selected");

	for(let i=0; i<slides.length; i++){
		if(i!== index)
		{
			document.getElementById(`dot_${i}`).setAttribute("class", "dot")

		}
	}
}
// Fonction pour mettre à jour les points indicateurs
function updateDots(index, lastIdex) {
	let active = `dot_${index}`;
	let lastActive = `dot_${lastIdex}`;

	activeDot = document.getElementById(active);
	lastActiveDot = document.getElementById(lastActive);

	activeDot.setAttribute("class", "dot dot_selected");
	if (lastIdex !== undefined) {
		lastActiveDot.setAttribute("class", "dot");
	}

}

// Fonction pour mettre à jour les points indicateurs, l'image et le texte
function updateCarousel(index, direction) {
	//correction du bug pour la première et la dernière image
	if (currentIndex === -1 && direction === 'left') {
		currentIndex = slides.length - 1;
	} else if (currentIndex === slides.length && direction === 'right') {
		currentIndex = 0;
	} else if (direction === 'dotClic') {
		currentIndex = index;
		console.log(`Clic sur  ${direction}` + currentIndex);
	}

	// Mettre à jour l'image
	const imagePath = `assets/images/slideshow/${slides[currentIndex].image}`;
	bannerImg.src = imagePath;
	bannerImg.alt = `Slide ${currentIndex + 1}`;

	// Mettre à jour le texte
	const tagLine = slides[currentIndex].tagLine;
	document.querySelector('p').innerHTML = tagLine;

	console.log(`Clic sur la flèche ${direction}`);
}
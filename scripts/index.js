const uls = document.querySelectorAll("ul");
const button = document.querySelector("button");
const maxAantal = uls[0].querySelectorAll("li").length - 12;

// make a function that will be called when the lever is clicked, add a class to the button and remove it when the animation is done
const lever = document.getElementById('lever');

lever.addEventListener('click', () => {
    lever.classList.add('spinning');
    setTimeout(() => {
        lever.classList.remove('spinning');
    }, 800);

	document.body.setAttribute("style", "height: 100%; margin-top: 5rem; margin-bottom: 10rem;");
})

function spin() {
	uls.forEach(ul => {
		ul.style.setProperty("--aantal", 0);
		
		setTimeout(() => {
			ul.style.setProperty("--dur", 1);
			aantal = Math.floor( Math.random() * maxAantal ) + 12;
			ul.style.setProperty("--aantal", aantal);
			
			ul.addEventListener("transitionend", () => {
				ul.style.setProperty("--dur", 0);
			});
			
		}, 1);
		
		
	});
}

button.onclick = spin;
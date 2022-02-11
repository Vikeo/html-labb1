function toggleMenu() {
	if (document.getElementById("menu-container").innerHTML == "") {
		console.log("print menu");
		printMenu();
		//document.getElementById("menu").classList.add("menu");
		//document.getElementById("menu-item").style.color = "white";
	} else {
		console.log("unprint menu");
		unprintMenu();
	}
}

function printMenu() {
	document.getElementById(
		"menu-container"
	).innerHTML = `<div id="menu" class="menu">
                <a href="./index.html" class="menu-item">Hem</a>
                <a href="./pages/courses.html" class="menu-item">Kurser</a>
                <a href="#admin" class="menu-item">Admin</a>
            </div>`;
}

function unprintMenu() {
	document.getElementById("menu-container").innerHTML = ``;
}

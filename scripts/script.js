function toggleMenu(menu) {
	if (menu.dataset.state == "inactive") {
		console.log("slide menu");
		menuSlideIn(menu);
	} else {
		console.log("unslide menu");
		menuSlideOut(menu);
	}
}

function menuSlideIn(menu) {
	menu.classList.remove("menu-transition-out");
	menu.classList.add("menu-transition-in");
	menu.dataset.state = "active";
}
function menuSlideOut(menu) {
	menu.classList.add("menu-transition-out");
	menu.classList.remove("menu-transition-in");
	menu.dataset.state = "inactive";
}

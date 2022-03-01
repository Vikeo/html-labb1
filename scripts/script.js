class Course {
	constructor(id, title, description, image, length, price) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.image = image;
		this.length = length;
		this.price = price;
	}
}

const cart = [];
const courses = [];

//Hämtar de kurser som finns från början från en json-fil
fetch("courses.json")
	.then((response) => response.json())
	.then((data) => {
		data.forEach((el) => {
			const course = new Course(
				el.id,
				el.title,
				el.description,
				el.image,
				el.length,
				el.price
			);
			courses.push(course);
		});
	});

function toggleMenu(menu) {
	if (menu.dataset.state == "slide-out") {
		console.log("slide menu");
		menuSlideIn(menu);
	} else {
		console.log("unslide menu");
		menuSlideOut(menu);
	}
}

function toggleCart(cart) {
	//TODO show/hide cart

	if (cart.dataset.state !== "active") {
		cart.dataset.state = "active";
		cart.style.display = "block";
	} else {
		cart.dataset.state = "inactive";
		cart.style.display = "none";
	}
}

function toggleModal(modal) {
	if (modal.dataset.state !== "active") {
		modal.dataset.state = "active";
		modal.style.display = "block";
	} else {
		modal.dataset.state = "inactive";
		modal.style.display = "none";
	}
}

function menuSlideIn(menu) {
	menu.classList.remove("menu-transition-out");
	menu.classList.add("menu-transition-in");
	menu.dataset.state = "slide-in";
}
function menuSlideOut(menu) {
	menu.classList.add("menu-transition-out");
	menu.classList.remove("menu-transition-in");
	menu.dataset.state = "slide-out";
}

//TODO Extremt redundant funktion tycker jag, men osäker på hur man ska göra på ett annat sätt just nu.
function submitCourseForm() {
	addCourse(
		(id = document.getElementById("course-id").value),
		(title = document.getElementById("course-title").value),
		(description = document.getElementById("course-description").value),
		(image = document.getElementById("course-image").value),
		(length = document.getElementById("course-length").value),
		(price = document.getElementById("course-price").value)
	);
}

function addCourse(id, title, description, image, lenght, price) {
	//Ta in info, lägg till i en ny Course.
	if (id == "") {
		return;
	}

	price = parseInt(price);
	if (Number.isNaN(price) || price == "") {
		return;
	}

	let alreadyExists = false;
	const newCourse = new Course(id, title, description, image, lenght, price);
	//TODO Finns nog ett bättre sätt att hoppa ut ur en funktion från en forEach än att använda en bool.
	courses.forEach((course) => {
		if (course.id == newCourse.id) {
			alreadyExists = true;
			return;
		}
	});

	if (alreadyExists) {
		window.alert("Kurs ID måste vara unikt.");
		return;
	}
	courses.push(newCourse);
	console.log(courses);
	window.alert("Kursen skapades");
	printCourseCards();
	updateEditor();
}

function printCourseCards(coursesArray = []) {
	coursesArray = courses;
	const coursesHTML = document.getElementById("courses-list");

	if (coursesHTML == null) {
		return;
	}

	coursesHTML.innerHTML = ``;

	coursesArray.forEach((course) => {
		const div = document.createElement("div");
		const img = document.createElement("img");
		const h1 = document.createElement("h1");
		const descriptionP = document.createElement("p");
		const button = document.createElement("button");

		const footDiv = document.createElement("div");

		const priceP = document.createElement("p");
		const lenghtP = document.createElement("p");

		div.classList.add("card");
		img.classList.add("card-image");
		h1.classList.add("card-title");
		descriptionP.classList.add("card-text");

		footDiv.classList.add("card-foot");

		button.classList.add("card-add-button");
		priceP.classList.add("card-price");
		lenghtP.classList.add("card-lenght");

		if (course.image == "") {
			img.src = "./images/default.jpg";
		} else {
			img.src = course.image;
		}

		img.alt = "card-image";
		h1.innerText = course.title + ` (${course.id})`;
		descriptionP.innerText = course.description;
		button.innerText = "Lägg till";
		priceP.innerText = `${course.price} SEK`;
		lenghtP.innerText = course.length;

		//Lägger till funktionen för att lägga till boken i kundvagnen.
		//button.setAttribute("onclick", `addCourseToCart("${course.id}")`);
		button.onclick = function (event) {
			// console.log(event);
			// const sample = document.createElement("h1");
			// sample.innerText = "lmao";
			// event.target.parentElement.appendChild(sample);

			addCourseToCart(`${course.id}`);
		}; //Gör samma sak som ovan, fast lägger inte till i HTML.

		div.appendChild(img);
		div.appendChild(h1);
		div.appendChild(descriptionP);
		footDiv.appendChild(priceP);
		footDiv.appendChild(button);
		footDiv.appendChild(lenghtP);

		div.appendChild(footDiv);

		coursesHTML.appendChild(div);
	});
}

//Kollar om ID:t på kurs-knappen man klickade på finns i en av objekten i courses arrayen, sen lägger till.
function addCourseToCart(courseId) {
	console.log(cart);

	const course = courses.find((el) => el.id === courseId);

	if (cart.includes(course)) {
		console.log("finns redan");
		return;
	}
	console.log("finns inte");

	cart.push(course);
	console.log(`${course.title} tillagd`);

	updateCart();
}

function removeCourseFromCart(cartItemId) {
	const itemToRemove = cart.find((el) => el.id === cartItemId);
	cart.splice(cart.indexOf(itemToRemove), 1);
	updateCart();
}

function removeCourseFromCourses(courseId) {
	const courseToRemove = courses.find((el) => el.id === courseId);
	courses.splice(courses.indexOf(courseToRemove), 1);
	updateEditor();
}

function updateCart() {
	let itemCounter = 0;
	const cartItemCounter = document.getElementById("cart-items-counter");
	const cartHtml = document.getElementById("cart");
	const totalP = document.createElement("p");
	const buyBtn = document.createElement("button");
	let totalPrice = 0;
	cartHtml.innerHTML = ``;

	if (cart.length <= 0) {
		cartItemCounter.style.display = "none";
		const tempDiv = document.createElement("div");
		tempDiv.innerText = "Kundvagnen är tom...";
		cartHtml.appendChild(tempDiv);
		return;
	}

	cart.forEach((cartItem) => {
		const div = document.createElement("div");
		div.classList.add("cart-item");
		div.innerHTML = `${cartItem.title} (${cartItem.id}) <br> ${cartItem.price}:-`;
		const removeBtn = document.createElement("button");
		removeBtn.innerText = "X";
		removeBtn.setAttribute("onclick", `removeCourseFromCart("${cartItem.id}")`);
		cartHtml.appendChild(div);
		div.appendChild(removeBtn);
		itemCounter++;
		totalPrice = totalPrice + parseInt(cartItem.price);
	});

	buyBtn.classList.add("cart-buy-btn");
	buyBtn.innerText = "Köp";

	buyBtn.onclick = function () {
		buyItemsInCart();
	};

	totalP.innerHTML = `Total summa: <br> ${totalPrice} SEK`;
	const tempString = `Total summa: ${totalPrice} SEK`;
	cartHtml.appendChild(totalP);
	cartHtml.appendChild(buyBtn);

	cartItemCounter.style.display = "flex";
	cartItemCounter.innerHTML = itemCounter;
}

function updateEditor() {
	const editorHTML = document.getElementById("modal-course-editor");
	editorHTML.innerHTML = ``;

	if (courses.length <= 0) {
		const tempDiv = document.createElement("div");
		tempDiv.innerText =
			"Här fanns det tydligen inga kurser... Testa och lägga till någon!";
		editorHTML.appendChild(tempDiv);
	}

	courses.forEach((course) => {
		const div = document.createElement("div");
		div.classList.add("course-editor-item");
		div.innerText = `${course.title} (${course.id})`;
		const X = document.createElement("button");
		X.innerText = "X";
		X.setAttribute(
			"onclick",
			`if (confirm("Are you sure?")) {removeCourseFromCourses("${course.id}"); updateEditor();}`
		);

		editorHTML.appendChild(div);
		div.appendChild(X);
	});
	const closeBtn = document.createElement("button");
	closeBtn.innerText = "Stäng";
	closeBtn.id = "editor-close-button";
	closeBtn.setAttribute(
		"onclick",
		`toggleModal(document.getElementById('modal-course-editor-container'))`
	);
	editorHTML.appendChild(closeBtn);
}

function buyItemsInCart() {
	cart.splice(0, cart.length);
	updateCart();
	window.alert("Kurserna köpta!");
}

printCourseCards();

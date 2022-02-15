class Course {
	constructor(id, title, description, descriptionDetailed, image) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.descriptionDetailed = descriptionDetailed;
		this.image = image;
		//TODO Lägg till längd på kurs.
	}
}

const cart = [];
const courses = [];

courses.push(
	new Course(
		"S22HT",
		"Sälkurs",
		"Lär dig om västkustens alla olika sälar i denna sälkurs! Här kommer du få rädda, mata och klappa massor av fina och tjocka sälar.",
		"hejsanhejsan",
		"./images/seal.jpg"
	)
);

courses.push(
	new Course(
		"H22HT",
		"Hjälpkurs",
		"hejsan",
		"hejsanhejsan",
		"./images/seal.jpg"
	)
);

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

function addCourse(id, title, description, descriptionDetailed, image) {
	//Ta in info, lägg till i en ny Course.
	const newCourse = new Course(
		id,
		title,
		description,
		descriptionDetailed,
		image
	);
	courses.push(newCourse);
	console.log(courses);
}

function printCourseCards(coursesArray = []) {
	coursesArray = courses;
	const coursesHTML = document.getElementById("courses-list");
	coursesHTML.innerHTML = ``;

	coursesArray.forEach((course) => {
		const div = document.createElement("div");
		const img = document.createElement("img");
		const h1 = document.createElement("h1");
		const p = document.createElement("p");
		const button = document.createElement("button");

		div.classList.add("card");
		img.classList.add("card-image");
		h1.classList.add("card-title");
		p.classList.add("card-text");
		button.classList.add("card-add-button");

		img.src = course.image;
		img.alt = "card-image";
		h1.innerText = course.title + ` (${course.id})`;
		p.innerText = course.description;
		button.innerText = "Lägg till";

		//Lägger till funktionen för att lägga till boken i kundvagnen.
		button.setAttribute("onclick", `addCourseToCart("${course.id}")`);

		div.appendChild(img);
		div.appendChild(h1);
		div.appendChild(p);
		div.appendChild(button);

		coursesHTML.appendChild(div);
	});
}

//Hittar kollar om ID:t på kurs-knappen man klickade på finns i en av objekten i courses arrayen, sen lägger till.
function addCourseToCart(courseId) {
	console.log(courses);

	const course = courses.find((el) => el.id === courseId);

	cart.push(course);
	console.log(`${course.title} tillagd`);
}

/* <div class="card">
    <img class="card-image" src="./images/seal.jpg" alt="card-image">
    <h1 class="card-title">Sälkurs (S22HT)</h1>
    <p class="card-text">Lär dig om västkustens alla olika sälar i denna sälkurs! Här kommer du få rädda,
        mata
        och klappa massor av fina och tjocka sälar.
    </p>
    <button class="card-add-button ">Lägg till</button>
</div> */

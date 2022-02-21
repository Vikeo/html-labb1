function navigateToCourses() {
	document.getElementById("content").innerHTML = `
        <h1>Välkommen!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est et quisquam sed consectetur eius eos ipsam
            repudiandae explicabo totam?
        </p>

        <div id="courses-list">
        </div>

        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <h1>1</h1>
        <img src="" alt="Glad bild som visar att WestCoast Education har en bra arbetsmiljö.">
        `;
	printCourseCards();
	updateCart();
}

function navigateToHome() {
	document.getElementById("content").innerHTML = ``;
	navigateToCourses();
	printCourseCards();
	updateCart();
}

function navigateToAdmin() {
	document.getElementById("content").innerHTML = `
    <button id="modal-button" onclick="toggleModal(document.getElementById('modal-course-form'))">Öppna kursskapare</button>
        <div id="modal-course-form" class="modal">
            <form id="course-creator" onsubmit="return false">
                <label for="course-id">Course ID</label>
                <input type="text" id="course-id" name="course-id">
                <br>
                <label for="course-title">Title</label>
                <input type="text" id="course-title" name="course-title">
                <br>
                <label for="course-description">Description</label>
                <input type="text" id="course-description" name="course-description">
                <br>
                <!-- TODO Vill göra så att man kan välja lokalt? -->
                <label for="course-image">Image (URL)</label>
                <input type="text" id="course-image" name="course-image"><br>
                <!-- Submit eller bara ett onclick event? -->
                <button id="submit-button" onclick="submitCourseForm()">Skapa</button>
                <!-- <input type="submit" value="Skapa"> -->
            </form>
        </div>`;
	printCourseCards();
	updateCart();
}

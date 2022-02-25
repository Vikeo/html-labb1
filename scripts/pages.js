function navigateToCourses() {
	document.getElementById("content").innerHTML = `
        <div id="courses-list">
        </div>
        `;
	printCourseCards();
	updateCart();
}

function navigateToHome() {
	document.getElementById("content").innerHTML = `
        <h1>Välkommen!</h1>
        <p>Denna temporära text representerar varken oss, vilka vi är, vart vi kommer från, vad vi har för bakgrund, vad
            som driver oss eller vem som betalar för dina studier. Allt vi önskar är att du har en sisådär studietid hos
            oss, och att få kunna dra ihop sköna gäng som man kan plåta lika sköna bilder på som den nedan. Kaffe är
            sedan juni 2018, på grund av olyckan, en obligatorisk morgondryck här hos oss.
        </p>
        <img id="student-image" src="./images/students_photo.jpg"
            alt="Glad bild som visar att WestCoast Education har en bra arbetsmiljö.">`;
	updateCart();
}

function navigateToAdmin() {
	document.getElementById("content").innerHTML = `
    <button id="modal-button" onclick="toggleModal(document.getElementById('modal-course-form-container'))">Öppna
            kursskapare</button>
        <button id="modal-button"
            onclick="toggleModal(document.getElementById('modal-course-editor-container')); updateEditor();">Öppna
            kurshanteraren</button>
        <div id="modal-course-form-container" class="modal-container" data-state="inactive">
            <div id="modal-course-form">
                <form id="course-creator" onsubmit="return false">
                    <label for="course-id">Course ID</label>
                    <br>
                    <input type="text" id="course-id" name="course-id" required="hej" placeholder="S22HT">
                    <br>
                    <label for="course-title">Title</label>
                    <br>
                    <input type="text" id="course-title" name="course-title" placeholder="Sälkurs">
                    <br>
                    <label for="course-description">Description</label>
                    <br>
                    <textarea name="course-description" id="course-description" cols="21" rows="4"></textarea>
                    <br>
                    <label for="course-length">Längd</label>
                    <br>
                    <input type="text" id="course-length" name="course-length" placeholder="2 månader">
                    <br>
                    <label for="course-price">Pris (SEK)</label>
                    <br>
                    <input type="text" id="course-price" name="course-price" required
                        placeholder="(Börja med en siffra)">
                    <br>
                    <!-- TODO Vill göra så att man kan välja lokalt? -->
                    <label for="course-image">Image (URL)</label>
                    <br>
                    <input type="text" id="course-image" name="course-image">
                    <br>

                    <!-- Submit eller bara ett onclick event? -->
                    <button id="submit-button" onclick="submitCourseForm()">Skapa</button>
                    <button id="form-close-button"
                        onclick="toggleModal(document.getElementById('modal-course-form-container'))">Stäng</button>
                    <!-- <input type="submit" value="Skapa"> -->
                </form>
            </div>
        </div>
        <div id="modal-course-editor-container" class="modal-container" data-state="inactive">
            <div id="modal-course-editor">

            </div>
        </div>`;
	printCourseCards();
	updateCart();
}

const addFormButton = document.getElementById('add-form');
const formsContainer = document.getElementById('educInfo-forms');
let formCount = 1;

addFormButton.addEventListener('click', () => {
  formCount++;

  const newForm = document.createElement('div');
  newForm.classList.add('form');
  newForm.innerHTML = `
          <label for="degree-${formCount}">Degree:</label>
          <div class="form-radio">
            <input type="radio" name="degree-${formCount}" id="bachelor-${formCount}" value="bachelor" checked>
            <label for="bachelor-${formCount}">Bachelor's</label>
          </div>
          <div class="form-radio">
            <input type="radio" name="degree-${formCount}" id="masteral-${formCount}" value="masteral">
            <labelfor="masteral-${formCount}">Masteral's</label>
</div>
<div class="form-radio">
<input type="radio" name="degree-${formCount}" id="doctoral-${formCount}" value="doctoral">
<label for="doctoral-${formCount}">Doctoral's</label>
</div>
<br>
<br>
<label for="program-${formCount}">Program ${formCount}: </label>
<input type="text" name="program-${formCount}" id="program-${formCount}">
<label for="studied-in-${formCount}">Studied in:</label>
<input type="text" name="studied-in-${formCount}" id="studied-in-${formCount}">
`;

  if (formCount > 4) {
    document.getElementById("add-form").style.display = "none"; //Hide add button 
  }

  formsContainer.appendChild(newForm);
});


/*Add image */
function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById('circle').style.backgroundImage = `url(${event.target.result})`;
    document.getElementById('circle').classList.add('selected');
  };
  reader.readAsDataURL(file);
}

document.getElementById('circle').addEventListener('click', function (event) {
  if (event.target.id === 'remove') {
    document.getElementById('circle').style.backgroundImage = '';
    document.getElementById('circle').classList.remove('selected');
  } else {
    document.getElementById('file-input').click();
  }
});


// experience
const addFormButton_ex = document.getElementById('experience-btn');
const formsContainer1 = document.getElementById('experience-forms');
let formCount1 = 1;

addFormButton_ex.addEventListener('click', () => {
  formCount1++;
  const newForm1 = document.createElement('contactInfo-form');
  newForm1.classList.add('experience-form');
  newForm1.innerHTML = `
        <label for="job-title-${formCount1}">Job Title ${formCount1}:</label>
        <input type="text" name="job-title-${formCount1}" id="job-title-${formCount1}">
        <label for="work-place-${formCount}">Work place:</label>
        <input type="text" name="work-place-${formCount1}" id="work-place-${formCount1}">
        `;

  if (formCount1 > 4) {
    document.getElementById("experience-btn").style.display = "none"; //Hide add button 
  }

  formsContainer1.appendChild(newForm1);
});

//User Input Functions
function saveUserInput() { //Save button function

  //Prevents save function if a text field is empty
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "text" && inputs[i].value === "") {
      alert("Please fill in all text fields.");
      return; // stop function execution if any text field is empty
    }
  }

  //Saving input for name
  let firstName = document.getElementById("firstName").value;
  let middleName = document.getElementById("middleName").value;
  let lastName = document.getElementById("lastName").value;
  var name = firstName + " " + middleName + " " + lastName;
  console.log(name);

  //Saving input for education
  var degreeOption = ["null", "degree-1", "degree-2", "degree-3", "degree-4", "degree-5"];
  for (let i = 1; i <= formCount; i++) {//Loop that saves input for each education information section
    saveEducation(document.querySelector('input[name="'+ degreeOption[i] + '"]:checked').value, document.getElementById('program-' + i).value, document.getElementById("studied-in-" + i).value);
  }

  //Saving input for job 
  for (let i = 1; i <= formCount1; i++) {//Loop that saves input for each job experience section
    saveJob(document.getElementById('job-title-'+i).value, document.getElementById('work-place-'+i).value);
  }
  
  //Saving input for contact
  let email = document.getElementById("email-1").value;
  let cellphoneNumber = document.getElementById("cp-1").value;
  let collegeDepartment = document.getElementById("college-dept-1").value;
  var contactInformation = [email, cellphoneNumber, collegeDepartment];
  console.log(contactInformation);

  document.getElementById("cancel-profile-btn").style.display = "none"; //Hide cancel button 
  document.getElementById("save-profile-btn").style.display = "none"; //Hide save button 
}

function cancelUserInput() {
  //Removes inserted profile picture
  document.getElementById('circle').style.backgroundImage = '';
  document.getElementById('circle').classList.remove('selected');

  //Sets the text fields to null
  document.getElementById("firstName").value = "";
  document.getElementById("middleName").value = "";
  document.getElementById("lastName").value = "";

  for (let i = 1; i <= 5; i++) {//Sets all possible program fields to null
    let field = document.getElementById('program-' + i);
    if (field) { // check if the field exists
      field.value = null;
    }
  }

  for (let i = 1; i <= 5; i++) {//Sets all possible studied-in fields to null
    let field = document.getElementById('studied-in-' + i);
    if (field) { // check if the field exists
      field.value = null;
    }
  }

  for (let i = 1; i <= 5; i++) {//Sets all possible job-title fields to null
    let field = document.getElementById('job-title-' + i);
    if (field) { // check if the field exists
      field.value = null;
    }
  }

  for (let i = 1; i <= 5; i++) {//Sets all possible work-place fields to null
    let field = document.getElementById('work-place-' + i);
    if (field) { // check if the field exists
      field.value = null;
    }
  }

  document.getElementById("email-1").value = "";
  document.getElementById("cp-1").value = "";
  document.getElementById("college-dept-1").value = "";


  // redirect to Expert Dashboard
  window.location.href = 'http://localhost:5500/public/Dashboard2/expertDashboard.html';

}

function editUserInput(){
  document.getElementById("cancel-profile-btn").style.display = "block"; //show cancel button 
  document.getElementById("save-profile-btn").style.display = "block"; //show save button 
}

//Function for saving input for education
function saveEducation(degree, program, studiedIn) {
  this.degree = degree;
  this.program = program;
  this.studiedIn = studiedIn;

  var education = [degree, program, studiedIn];
  console.log(education);
}

//Function for saving input for job
function saveJob(jobTitle, workPlace) {
  this.jobTitle = jobTitle;
  this.workPlace = workPlace;

  var jobExperience = [jobTitle, workPlace];
  console.log(jobExperience);
}


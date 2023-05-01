// Course Container
function toggleCourseButton() {
    var courseContainer = document.getElementById("course-container");
    courseContainer.classList.toggle("show");
}

// Level of Education Container
function toggleLevelEducButton() {
    var levelEducContainer = document.getElementById("levelEduc-container");
    levelEducContainer.classList.toggle("show");
}

// Profession Container
function toggleProfessionButton() {
    var professionContainer = document.getElementById("profession-container");
    professionContainer.classList.toggle("show");
}

// School Container
function toggleSchoolButton() {
    var schoolContainer = document.getElementById("school-container");
    schoolContainer.classList.toggle("show");
}

// Section Container
var valueList = document.getElementById("valueList");
var outputList = document.getElementById("output");
var outputText = '<p> Hello :3 </p>';

var text = '<span> You have selected: </span>';
var listArray = [];

var checkboxes = document.querySelectorAll('input[type="checkbox"]');
var contentContainer = document.getElementById("content-container");

// Navigation
function inputSearchButton() {
    var searchBar = document.getElementById("search-bar");
    var searchBarValue = searchBar.value.trim();
    if (searchBarValue !== "") {
      //Only do the function if searxch bar is not empty
      var inputSearch = searchBarValue;
      searchBar.value = ""; //Sets search bar to null after search button is pressed
      document.getElementById("remove-button").style.display = "block"; //Show remove button
  
      //Add search bar input into array
      listArray.push(inputSearch);
      contentContainer.classList.add("show");
      valueList.innerHTML = text + listArray.join(" / ");

      // output a result
      var outputText = handleSearch(listArray);
      outputList.innerHTML = outputText;
    }
  }

function showBoxContainer() {
    if ([...checkboxes].some(checkbox => checkbox.checked)) {
        contentContainer.classList.add("show");
        document.getElementById("remove-button").style.display = "block"; //Show remove button 
        
        if (this.checked == true) {
            //Add value to array when checked
            listArray.push(this.value);
            valueList.innerHTML = text + listArray.join(' / ');

            // output a result
            var outputText = handleSearch(listArray);
            outputList.innerHTML = outputText;
      
            
        } else {
            //Remove value from array when unchecked
            listArray = listArray.filter(e => e !== this.value);
            valueList.innerHTML = text + listArray.join(' / ');
            
            
            // output a result
            var outputText = handleSearch(listArray);
            outputList.innerHTML = outputText;
         
        }

    } else {
        contentContainer.classList.remove("show");
        listArray.length = 0; //Empty array when all boxes are unchecked
        document.getElementById("remove-button").style.display = "none"; //Hide remove button 
        outputList.innerHTML = ''; // Clear the search result
    }
}

function removeItemsButton(){
    contentContainer.classList.remove("show");
    listArray.length = 0; //Empty array when all boxes are unchecked
    document.getElementById("remove-button").style.display = "none"; //Hide remove button 

    for (var i = 0; i < checkboxes.length; i++) { //Loop that unchecks all checkboxes
          if (checkboxes[i].type == "checkbox") {
            checkboxes[i].checked = false;
          }
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", showBoxContainer)
});


//-------------------------------------------------------------------------------------------------
// select the submit button (My Profile Button)
const myProfileButton = document.querySelector('.myProfile');

// add event listener to the submit button
myProfileButton.addEventListener('click', redirectToMyProfile);

// function to redirect to the Profile Page
function redirectToMyProfile() {
    window.location.href = 'http://localhost:5500/public/ProfileFillUpPage/profile_fill_up.html';
}
//-------------------------------------------------------------------------------------------------
// select the submit button (logout Button)
const logoutButton = document.querySelector('.logout');

// add event listener to the submit button
logoutButton.addEventListener('click', redirectToHome);

// function to redirect to the Home Page
function redirectToHome() {
    console.log("hello logout");
    window.location.href = 'http://localhost:5500/public/Home/home.html';
}
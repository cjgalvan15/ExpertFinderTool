//jshint esversion:6
/*global document*/

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
const __dirname = path.resolve();
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

// allow to access static files
app.use(express.static("public"));

// <------Testing------->

mongoose.connect('mongodb://127.0.0.1:27017/CICS', {UseNewUrlParser: true});

const educObjSchema = new mongoose.Schema({
    degree: String, 
    typeOfDegree: String,
    studiedAt: String
   })
   
   const jobExpObjSchema = new mongoose.Schema({
    jobTitle: String,
    workPlace: String
   })
   
   const contInfoObjSchema = new mongoose.Schema({
    email: String,
    phone: String,
    department: String

   })
   
   const cicsExpertsSchema = new mongoose.Schema({
    _id: String,
    name: String, 
    password: String,
    numLogs: Number,
    education: [educObjSchema],
    jobExperience : [jobExpObjSchema],
    contactInformation: [contInfoObjSchema],
    highlights: []

   })
   
   const CICSExperts = mongoose.model("CICSExpert", cicsExpertsSchema);
   
   // function that return BSON Object
   function insertExpert(_name, _id,_degree, _typeOfDegree, _studiedAt, _jobTitle, _workPlace, _email, _phone, _department) {
        
        const newExpert = new CICSExperts({
          id:   _id,
          name: _name,
            education: [{
                degree: _degree,
                typeOfDegree: _typeOfDegree,
                studiedAt: _studiedAt
            }],
            jobExperience: [{
                jobTitle: _jobTitle,
                workPlace: _workPlace
            }],
            contactInformation: [{
                email: _email,
                phone: _phone,
                department: _department
            }]
           });
        return newExpert;

   }

function updateProfile(_email, newUpdate)
{
    const name = newUpdate['name'];
    // store education array
    const arrEducation = []; 
    for(let i = 0; i < newUpdate['education'].length; i++) 
    {
        arrEducation.push(newUpdate['education'][i]);
    }
    // store job Experience array
    const arrJobExp = [];
    for(let x = 0; x < newUpdate['jobExperience'].length; x++) 
    {
        arrJobExp.push(newUpdate['jobExperience'][x]);
    }
    // store Contact xnformation array
    const arrContactInfo = [];
    for(let y = 0; y < newUpdate['contactInformation'].length; y++)
    {
        arrContactInfo.push(newUpdate['contactInformation'][y]);
    }
    CICSExperts.updateMany({"contactInformation.email":_email}, {"$set":{"name":name, "education":arrEducation,"jobExperience":arrJobExp, "contactInformation":arrContactInfo}}).then(() => console.log('Data updated successfully!'));
}

class Education {
  constructor(degree, typeOfDegree, studiedAt) {
    this._degree = degree;
    this._typeOfDegree = typeOfDegree;
    this._studiedAt = studiedAt;
  }

  // Getters
  get degree() {
    return this._degree;
  }

  get typeOfDegree() {
    return this._typeOfDegree;
  }

  get studiedAt() {
    return this._studiedAt;
  }

  // Setters
  set degree(degree) {
    this._degree = degree;
  }

  set typeOfDegree(typeOfDegree) {
    this._typeOfDegree = typeOfDegree;
  }

  set studiedAt(studiedAt) {
    this._studiedAt = studiedAt;
  }
}

class JobExperience {
  constructor(jobTitle, workPlace) {
    this._jobTitle = jobTitle;
    this._workPlace = workPlace;
  }

  // Getters
  get jobTitle() {
    return this._jobTitle;
  }

  get workPlace() {
    return this._workPlace;
  }

  // Setters
  set jobTitle(jobTitle) {
    this._jobTitle = jobTitle;
  }

  set workPlace(workPlace) {
    this._workPlace = workPlace;
  }
}
class ContactInformation {
  constructor(email, cellphoneNumber, collegeDepartment) {
    this._email = email;
    this._cellphoneNumber = cellphoneNumber;
    this._collegeDepartment = collegeDepartment;
  }

  // Getters
  get email() {
    return this._email;
  }

  get cellphoneNumber() {
    return this._cellphoneNumber;
  }

  get collegeDepartment() {
    return this._collegeDepartment;
  }

  // Setters
  set email(email) {
    this._email = email;
  }

  set cellphoneNumber(cellphoneNumber) {
    this._cellphoneNumber = cellphoneNumber;
  }

  set collegeDepartment(collegeDepartment) {
    this._collegeDepartment = collegeDepartment;
  }
}

class Highlights {
  constructor(arrHighlights) {
    this._arrHighlights = arrHighlights;
  }

  // Getter for arrHighlights attribute
  get arrHighlights() {
    return this._arrHighlights;
  }

  // Setter for arrHighlights attribute
  set arrHighlights(arrHighlights) {
    this._arrHighlights = arrHighlights;
  }
}



class Expert {
  constructor(name, id, education, jobExperience, contactInformation, highlights) {
    this._name = name;
    this._id = id;
    this._education = education;
    this._jobExperience = jobExperience;
    this._contactInformation = contactInformation;
    this._highlights = highlights;
  }

  // Getters
  get name() {
    return this._name;
  }
  get id()
  {
    return this._id;
  }

  get education() {
    return this._education;
  }

  get jobExperience() {
    return this._jobExperience;
  }

  get contactInformation() {
    return this._contactInformation;
  }
 
  get highlights()
  {
    return this._highlights;
  }

  // Setters
  set name(name) {
    this._name = name;
  }
  set id(id)
  {
    this._id = id;
  }

  set education(education) {
    this._education = education;
  }

  set jobExperience(jobExperience) {
    this._jobExperience = jobExperience;
  }

  set contactInformation(contactInformation) {
    this._contactInformation = contactInformation;
  }
   
  set highlights(highlights)
  {
    this._highlights = highlights;
  }
}

function setEducation(arr)
{
 var arrResult= [];

  var deg = "", typeOfDeg="", studiedAt=""; 
  for (let i = 0; i < arr.length; i++) {
    // Your code goes here
    var deg = arr[i].degree;
    var typeOfDeg = arr[i].typeOfDegree;
    var studiedAt = arr[i].studiedAt;

    var educObj = new Education(deg, typeOfDeg, studiedAt);
    arrResult.push(educObj);
  }

  return arrResult;

}
function setJobExperience(arr)
{
  var arrResult= [];

  var jobTitle = "", workPlace="";
  for (let i = 0; i < arr.length; i++) {
    // Your code goes here
    var jobTitle = arr[i].jobTitle;
    var workPlace = arr[i].workPlace;

    var jobexpObj = new JobExperience(jobTitle, workPlace);
    arrResult.push(jobexpObj);
  }

  return arrResult;
}

function setContactInformation(arr)
{
  var arrResult= [];

  for (let i = 0; i < arr.length; i++) {
    // Your code goes here
    const email = arr[i].email;
    const cellphoneNumber = arr[i]['cellphoneNumber'];
    const collDepartment = arr[i].collegeDepartment;

    var contactObj = new ContactInformation(email, cellphoneNumber, collDepartment);

    arrResult.push(contactObj);
  }

  return arrResult;
}

function getfCellphoneNumber(arr)
{
  return arr.cellphoneNumber;
}

function setHighlights(arr)
{
  var arrResult = [];
  // Your code goes here
  console.log("-------------Highlights----------------");
  console.log(arr);
  console.log("-------------Highlights----------------");
  var highlightsObj = new Highlights(arr);
  arrResult.push(highlightsObj);

  return arrResult;
}

function arrBsonToReg(arr)// 
{
  var name = "";
  var educ = [];
  var jobExp = [];
  var contInfo = [];
  var highlight = [];
  var _id = "";
  var arrResult = [];

  for (let i = 0; i < arr.length; i++) {
    // Your code goes here
    name = arr[i].name;
    _id = arr[i]._id;
    educ = setEducation(arr[i].education);
    jobExp = setJobExperience(arr[i].jobExperience);
    contInfo = setContactInformation(arr[i].contactInformation);
    highlight = setHighlights(arr[i].highlights);
    arrResult.push(new Expert(name,_id, educ, jobExp, contInfo, highlight));
    
  }
  return arrResult;
}

async function searchExpert(val, period, arr) 
{

  var result = [];
  var listOfExperts = [];
  var res;


  if(arr == false)
  {
    var tempId=0;
    //find based on name
    res = await findBasedName(val, period, tempId);
    if(res == false)
    {
      res = await findBasedEducation(val, period, tempId);
      if(res == false)
      {
        res = await findBasedJobExperience(val, period, tempId);
        if(res == false)
        {
          res = await findBasedContact(val, period, tempId);
          if(res == false)
          {
            listOfExperts = [];
            return listOfExperts;
          }
          else
          {
            listOfExperts = arrBsonToReg(res);
            return listOfExperts;
          }
        }
        else
        {
          listOfExperts = arrBsonToReg(res);
          return listOfExperts;
        }
      }
      else
      {
        listOfExperts = arrBsonToReg(res);
        return listOfExperts;
        // return "Hello";
      }
    }
    else
    {
      listOfExperts = arrBsonToReg(res);

      return listOfExperts;
    }
  }
  else
  {
    // console.log("Hello");
    for(let i =0; i< arr.length; i++)
    {
      var tempId=arr[i]._id;//
      //find based on name
      res = await findBasedName(val, period, tempId);
      // console.log("i: "+i);
      if(res == false)
      {
        res = await findBasedEducation(val, period, tempId);
        if(res == false)
        {
          res = await findBasedJobExperience(val, period, tempId);
          if(res == false)
          {
            res = await findBasedContact(val, period, tempId);
            if(res == false)
            {
              listOfExperts = [];
              let j=i+1;
              arr.splice(i,j);
              i--;
            }
            else
            {
              // nothing to do
            }
          }
          else
          {
            // nothing to do
          }
        }
        else
        {
          // nothing to do
        }
      }
      else
      {
        // nothing to do
      }
  
    }
    return arr;
  }

}
// searchExpert(val, period, arr) 
console.log("----------------");
// var out = searchExpert("Aljohn Torre", 0, []).then((result)=> {return result;}).catch((error)=>{console.log(error)});
// console.log(out);
console.log("----------------");

const handleSearches = async function(arr) 
{
  var res=[];
  var arrFilter = [];
  var tempId = 0;
  var temp;
  for 
  (let i = 0; i < arr.length; i++) 
  {
    try
    {
      temp = arr[i];
      if(i == 0)
      {
        var searchedResults = searchExpert(temp, i, arrFilter); // all results in DB
        arrFilter = (await searchedResults.then((result) => 
        {
          console.log("------------------------------------");
          console.log(result[0]);
          console.log("------------------------------------");
          return result;

        }));
      }
      else
      {
        temp = arr[i];
        // get the id of 
        var searchedResults = searchExpert(temp, i, arrFilter); // temp="Robert Ampatuan",i=1, arrFilter=original list

        arrFilter = (await searchedResults.then((result) => {
        // add the results to arrFilter 
          return result;
        }));
      }
      
    }
    catch(error)
    {
      console.log(error);
    }  
    
  }
    // console.log(arrFilter);
    return arrFilter;

}


// searchExpert(val, period, arr) 

// Find based on the Name-value
async function findBasedName(val, period, id) // "Robert Ampatuan"
{

  if(period ==0)
  {
    try
    {
      const data = await CICSExperts.find({"name":val});//  
      if(data != null)
      {

        // return 
        if (typeof window === "object") // web app 
            {
              //
              return null;
            } 
            else 
            {
              return data;

            }
      }
      else
      {
        return null;
      }
    }catch(error)
    {
      console.log(error);
    }
  }
  else
  {
    try
    {
      const data = await CICSExperts.find({"name":val, "_id":id});// "BS Computer Science", "20-12333-568"
      if(data != null)
      {
        // return 
        if (typeof window === "object") 
            {
              return null;
            } 
            else 
            {
              return data;
            }
      }
      else
      {
        return null;
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }

}

// Find Based Education
const findBasedEducation = async function(val, period, id)
{
  if(period==0)
  {
    try
    {
      var data = await CICSExperts.find({"education.degree":val}); // degree [/]
      if(data == false)
      {
        data = await CICSExperts.find({"education.typeOfDegree":val});
        if(data == false)
        {
          data = await CICSExperts.find({"education.studiedAt":val});
          if(data == false)
          {
            return data;// empty
          }
          else
          {
            return data;
          }
        }
        else
        {
          return data;
        }
      }
      else
      {
        return data;
      }
      


      if(data != null)
      {
        // return 
        if (typeof window === "object") 
            {
              return null;
            } 
            else 
            {
              return data;
            }
      }
      else
      {
        return null;
      }
    }catch(error)
    {
      console.log(error);
    }
  }
  else
  {
    try
    {
      var data = await CICSExperts.find({"education.degree":val, "_id":id});
      if(data == false)
      {
        data = await CICSExperts.find({"education.typeOfDegree":val, "_id":id});
        if(data == false)
        {
          data = await CICSExperts.find({"education.studiedAt":val, "_id":id});
          if(data == false)
          {
            return data;
          }
          else
          {
            return data;
          }
        }
        else
        {
          return data;
        }
      }
      else
      {
        return data;
      }
      


      if(data != null)
      {
        // return 
        if (typeof window === "object") 
            {
              return null;
            } 
            else 
            {
              return data;
            }
      }
      else
      {
        return null;
      }
    }catch(error)
    {
      console.log(error);
    }

  }
}

// Find based on jobExperience
const findBasedJobExperience = async function(val, period, id)
{
  if(period == 0)
  {
    try
    {
      var data = await CICSExperts.find({"jobExperience.jobTitle":val}); // degree [/]
      if(data == false)
      {
        data = await CICSExperts.find({"jobExperience.workPlace":val});
        if(data == false)
        {
          return data;
        }
        else
        {
          return data;
        }
      }
      else
      {
        return data;
      }

      if(data != null)
      {
        // return 
        if (typeof window === "object") 
            {
              return null;
            } 
            else 
            {
              return data;
            }
      }
      else
      {
        return null;
      }
    }catch(error)
    {
      console.log(error);
    }
  }
  else
  {
    try
    {
      var data = await CICSExperts.find({"jobExperience.jobTitle":val, "_id":id}); 
      if(data == false)
      {
        data = await CICSExperts.find({"jobExperience.workPlace":val, "_id":id});
        if(data == false)
        {
          return data;
        }
        else
        {
          return data;
        }
      }
      else
      {
        return data;
      }
      
  
  
      if(data != null)
      {
        // return 
        if (typeof window === "object") 
            {
              return null;
            } 
            else 
            {
              return data;
            }
      }
      else
      {
        return null;
      }
    }catch(error)
    {
      console.log(error);
    }
  }
}

// Find based on Contact information
const findBasedContact = async function(val, period, id)
{
  if(period == 0)
  {
    try
    {
      var data = await CICSExperts.find({"contactInformation.email":val}); // degree [/]
      if(data == false)
      {
        data = await CICSExperts.find({"contactInformation.cellphoneNumber":val});
        if(data == false)
        {
          data = await CICSExperts.find({"contactInformation.collegeDepartment":val});
          if(data == false)
          {
            return data;
          }
          else
          {
            return data;
          }
        }
        else
        {
          return data;
        }
      }
      else
      {
        return data;
      }
      
  
  
      if(data != null)
      {
        // return 
        if (typeof window === "object") 
            {
              return null;
            } 
            else 
            {
              return data;
            }
      }
      else
      {
        return null;
      }
    }catch(error)
    {
      console.log(error);
    }
  }
  else
  {
    try
    {
      var data = await CICSExperts.find({"contactInformation.email":val, "_id":id}); // degree [/]
      if(data == false)
      {
        data = await CICSExperts.find({"contactInformation.cellphoneNumber":val, "_id":id});
        if(data == false)
        {
          data = await CICSExperts.find({"contactInformation.collegeDepartment":val, "_id":id});
          if(data == false)
          {
            return data;
          }
          else
          {
            return data;
          }
        }
        else
        {
          return data;
        }
      }
      else
      {
        return data;
      }
      
  
  
      if(data != null)
      {
        // return 
        if (typeof window === "object") 
            {
              return null;
            } 
            else 
            {
              return data;
            }
      }
      else
      {
        return null;
      }
    }catch(error)
    {
      console.log(error);
    }
  }
}

// login algorithm
async function verifyLogin(username, password) {
  try {
    // Find all documents in the collection
    const data = await CICSExperts.find({ "contactInformation.email": username });
    // if email does exist
    if (data != null) {
      const dbPass = data[0].password;
      if (password == dbPass) {
        console.log("Successfully logged in");
        return true;
      } else {
        return false;
      }
    } else {
      console.log("No data found");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//------------------------Format Experts to be displayed-----------------------


function setExperts(expertLists)
{
  var result = [];

  for(let i=0;i<expertLists.length;i++){
    // Get name of expert
    var name = expertLists[i].name;
    // Get highlights of expert
    var highlights = expertLists[i].highlights[0]._arrHighlights;
    // Combine highlights and name
    var combInfo = combineNameHighlights(name, highlights);
    // Add combInfo as expert in result
    result.push(combInfo);
  }
  return result;
}

function combineNameHighlights(name, highlights)
{
  var result=[];
  // Add name
  result.push(name);
  for(let i =0; i<highlights.length; i++){
    // Add each highlight
    result.push(highlights[i]);
  }
  return result;
}

//--------------------------------Routes-------------------------------
var loginConfirm = true;
var expertResults = [];
var outputConfirm = true;

// Get & Post Requests
app.get("/", function(req, res)
{
  res.render("login", {loginConfirmation: loginConfirm});
});

app.get("/login", async function(req, res){
  res.render("login", {loginConfirmation: loginConfirm});
  console.log("get-req /login");
});

app.post("/login", async function (req, res) {
  
  const usrname = req.body.username;
  const ps = req.body.password;
  const validation = await verifyLogin(usrname, ps);
  console.log("login validation:");
  console.log(validation);

  if (validation) {
    const filePath = path.join(__dirname, '/public/Dashboard2','dashboard.html');
    res.sendFile(filePath);
  } else { 
    // if login doesn't match
    loginConfirm = false;
    res.render("login", {loginConfirmation: loginConfirm});
  }
});

app.get("/dashboard", async function (req, res) {
  outputConfirm = true;
  console.log("Connected to Dashboard");
  res.render("dashboard", {outputDisplay: " "});
});

app.post("/dashboard", async function (req, res){

  // You have selected: BS Information Technology / BS Accountancy 
  var searchList = req.body.valueList;

  // BS Information Technology / BS Accountancy
  searchList = searchList.replace("You have selected: ", "");

  // ['BS Information Technology', 'BS Accountancy'] 
  var arrList = searchList.split(" / ");

  // [expert1, expert2, expert3]
  var expLists = await handleSearches(arrList);

  // Format each expert in name, highlights1-5
  var formatted = setExperts(expLists);
  var length = formatted.length;
  console.log(formatted);
  res.render("dashboard", {outputDisplay: formatted})
});

app.get("/profile", async function(req, res){
  console.log("Welcome to Profile Page :3");
  res.render("profile");
});

app.post("/profile", async function(req, res){
  
  //res.render("profile");
});


app.listen(4000, function()
{
	console.log("Server is running on port 4000.");
});

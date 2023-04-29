import express from 'express';
const express1 = express;

const app = express1();

app.use(express1.static("public"));

// const express = require('express');


// <---- Testing ---->

// const mongoose = require('mongoose');



app.get("/", function(req,res)
{
    // res.sendFile(__dirname+"/public/testing2/test.html"); [x]
    res.sendFile(__dirname+"/public/testing2/test.html");
    // res.send("It works without the file"); [/]
    // console.log("It works in console"); [/]
});

app.listen(3000, function()
{
	console.log("Try: Server is running on port 3000.");
});

// function to be exported
const printOutput = () =>{
    console.log("------------");
    console.log("Hello World");
    console.log("------------");
}
// myFunction();

export default printOutput;




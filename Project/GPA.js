// Global varbies
var grades = new Array(12);
var credits = new Array(12);
var inGrades = new Array(8);
var inCredits = new Array(8);
var className = new Array(8);
var classCount = 8;

//Shows information of Instrustion and About 
function disInstruction() {
    document.getElementById("instruct").onclick = function(){
    document.getElementById("display").innerHTML = "1. Enter your courses.<br/>2. Enter your perdicted or current grades.<br/>3. Enter your course credits.<br/>4. Click CALCULATE button.<br/>5. You can see your result.<br/>6. You may reset and repeat step (1 - 5).";
    }
}

// Displaying about function
function disAbout() {
    document.getElementById("about").onclick = function(){
    document.getElementById("display").innerHTML = "This is a simple GPA Calculator. The goal of this calculator is to predict and set your semester GPA by providing your class' grades and credits. <br/>This calculator provides you to have a short amount time to find out how many GPA you need. You will feel confident with the accurate information by using the GPA calculator.";
    }
}

// Clear inputs
function getClear() {
    document.getElementById("result").innerHTML = " ";
}

// Get input error
function inputError() {
    var input = document.getElementsByName("CR1").value;
    if(0 <= input <= 5) {
        return true;
    }
    else {
        alert("ERROR: The first row of the credit is incorrect format!");
        return false;
    }
}

// Main function of GPA
function gpacalc(){  
    var grCount = 12; //Define valid grades and their values
    
    grades[0] = "A";
    credits[0] = 4;
    grades[1] = "A-";
    credits[1] = 3.7;
    grades[2] = "B+";
    credits[2] = 3.4;
    grades[3] = "B";
    credits[3] = 3;
    grades[4] = "B-";
    credits[4] = 2.7;
    grades[5] = "C+";
    credits[5] = 2.4;
    grades[6] = "C";
    credits[6] = 2;
    grades[7] = "C-";
    credits[7] = 1.7;
    grades[8] = "D+";
    credits[8] = 1.4
    grades[9] = "D";
    credits[9] = 1;
    grades[10] = "D-";
    credits[10] = 0.7;
    grades[11] = "F";
    credits[11] = 0;
    
    // Calculate GPA
    var totalGrades = 0;
    var totalCredits = 0;
    var gpa = 0;
    
    for (var x = 0; x < classCount; x++) {
        /*if (inGrades[x] == "") {
            alert("ERROR: The grade of Course " + eval(x + 1) + " is incorrect!");
            break;
        }
        */
        
        var valid = true;
        for (var j = 0; j < grCount; j++) {
            if (inGrades[x] == grades[j]) {
                totalGrades += (parseInt(inCredits[x], 10) * credits[j]);
                totalCredits += parseInt(inCredits[x], 10);
            }
        }
        /*if (valid == false) {
            alert("ERROR: The grade of Course " + eval(x + 1) + " is incorrect!");
            return 0;
        }*/
    }
    
    //It prevents a divide by zero error
    if (totalCredits == 0) {
        alert("Input Error: Credit cannot be zero!");
        return 0;
    }
    
    gpa = Math.round(totalGrades / totalCredits * 100)/100;
    report(gpa);
}

// A valid function
function valid() {
    // Retrieve user inputs
    className[0] = document.GPACalcForm.n1.value;
    className[1] = document.GPACalcForm.n2.value;
    className[2] = document.GPACalcForm.n3.value;
    className[3] = document.GPACalcForm.n4.value;
    className[4] = document.GPACalcForm.n5.value;
    className[5] = document.GPACalcForm.n6.value;
    className[6] = document.GPACalcForm.n7.value;
    className[7] = document.GPACalcForm.n8.value;
    
    inGrades[0] = document.GPACalcForm.GR1.value;
    inGrades[1] = document.GPACalcForm.GR2.value;
    inGrades[2] = document.GPACalcForm.GR3.value;
    inGrades[3] = document.GPACalcForm.GR4.value;
    inGrades[4] = document.GPACalcForm.GR5.value;
    inGrades[5] = document.GPACalcForm.GR6.value;
    inGrades[6] = document.GPACalcForm.GR7.value;
    inGrades[7] = document.GPACalcForm.GR8.value;
    
    inCredits[0] = document.GPACalcForm.CR1.value;
    inCredits[1] = document.GPACalcForm.CR2.value;
    inCredits[2] = document.GPACalcForm.CR3.value;
    inCredits[3] = document.GPACalcForm.CR4.value;
    inCredits[4] = document.GPACalcForm.CR5.value;
    inCredits[5] = document.GPACalcForm.CR6.value;
    inCredits[6] = document.GPACalcForm.CR7.value;
    inCredits[7] = document.GPACalcForm.CR8.value;
    
    // Check empty or not
    var error = true;
    for ( var i = 0; i < classCount; i++) {
        if (inGrades[i] != "none" && inCredits[i] != ""){
            gpacalc();
            error = false;
        }
        
        if (className[i] == "") {
            alert("Input Error: Course Name " + eval(i + 1) + " is missing!");
            error = true;
        }
        
        if (inGrades[i] == "none") {
            alert("Input Error: Grade of Course " + eval(i + 1) + " is missing!");
            error = true;
        }
            
        if (inCredits[i] == ""){
            alert("Input Error: Credit of Course " + eval(i + 1) + " is missing!");
            error = true;
        }
            
        if (error = true) {
            break;
        }
    }
}

// Report GPA function
function report(gpa) {
    var report = "<h2>Your Report</h2><br/>";
    document.getElementById("result").innerHTML = report;
    
    for (var i = 0; i < classCount; i++) {
        if (inGrades[i] == "none") {
            break;
        }
        document.getElementById("result").innerHTML += "Class: " + className[i] + "&nbsp&nbsp&nbsp&nbsp Grade: " + inGrades[i] + "&nbsp&nbsp&nbsp&nbsp Credit: " + inCredits[i] + "<br/>";
    }
    document.getElementById("result").innerHTML += "<br/><h2>Your Semester GPA is: " + gpa + "</h2><br/>";
    return 0;
}

// Add a new semester
// function add() {
//     for (var i = 0; i < 2; i++) {
//         document.getElementById("add").innerHTML += "Added " + [i] + "<br/>";
//     }
// }

document.getElementById("semester").innerHTML = "<tr><th>Course:</th><th>Grade</th><th>Credits</th></tr>";

function createRow() {
    document.getElementById("add").innerHTML += "<tr><td>1. <input type='text' id='n1' size='10' placeholder='CS 371'></td><td><select id='GR1'><option value='none'>—</option><option value='A'>A</option><option value='A-'>A-</option><option value='B+'>B+</option><option value='B'>B</option><option value='B-'>B-</option><option value='C+'>C+</option><option value='C'>C</option><option value='C-'>C-</option><option value='D+'>D+</option><option value='D'>D</option><option value='D-'>D-</option><option value='F'>F</option></select></td><td><input type='text' size='1' name='CR1' maxlength='1' onblur='inputError()' placeholder='4'></td></tr>";
}
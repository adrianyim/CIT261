// Global varbies
var grades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
var credits = [4, 3.7, 3.4, 3, 2.7, 2.4, 2, 1.7, 1.4, 1, 0.7, 0];
var inGrades = new Array(8);
var inCredits = new Array(8);
var className = new Array(8);

// Display instrustion function
function disInstruction() {
    document.getElementById("instruct").onclick = function(){
    document.getElementById("display").innerHTML = "1. Enter your courses.<br/>2. Enter your perdicted or current grades.<br/>3. Enter your course credits.<br/>4. Click CALCULATE button.<br/>5. You can see your result.<br/>6. You may reset and repeat step (1 - 5).";
    }
}

// Display about function
function disAbout() {
    document.getElementById("about").onclick = function(){
    document.getElementById("display").innerHTML = "This is a simple GPA Calculator. The goal of this calculator is to predict and set your semester GPA by providing your class' grades and credits. <br/>This calculator provides you to have a short amount time to find out how many GPA you need. You will feel confident with the accurate information by using the GPA calculator.";
    }
}

// Clear inputs and result
function getClear() {
    document.getElementById("result").innerHTML = " ";
}

// Get input error**************************************
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
function gpaCalc() {  
    var grCount = 12; //Define valid grades and their values
    
    // Calculate GPA
    var totalGrades = 0;
    var totalCredits = 0;
    var gpa = 0;
    
    for (var x=0; x<document.getElementById("semester_tbody").rows.length - 1; x++) {
        /*if (inGrades[x] == "") {
            alert("ERROR: The grade of Course " + eval(x + 1) + " is incorrect!");
            break;
        }
        */
        
        var valid = true;
        for (var y = 0; y < grCount; y++) {
            if (inGrades[x] == grades[y]) {
                totalGrades += (parseInt(inCredits[x], 10) * credits[y]);
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
    
    gpa = Math.round(totalGrades/totalCredits*100)/100;
    report(gpa);
}

// A valid function
function valid() {
    // Retrieve user inputs
    // For class names
    for (var i=0; i<document.getElementById("semester_tbody").rows.length - 1; i++) {
        className[i] = document.GPACalcForm['n'+(i+1)].value;
    }

    // For grades
    for (var i=0; i<document.getElementById("semester_tbody").rows.length - 1; i++) {
        inGrades[i] = document.GPACalcForm['GR'+(i+1)].value;
    }

    // For credits
    for (var i=0; i<document.getElementById("semester_tbody").rows.length - 1; i++) {
        inCredits[i] = document.GPACalcForm['CR'+(i+1)].value;
    }
    
    // Check empty or not
    var error = true;
    for ( var i=0; i<document.getElementById("semester_tbody").rows.length - 1; i++) {
        if (inGrades[i] != "none" && inCredits[i] != ""){
            gpaCalc();
            error = false;
        }
        
        if (className[i] == "") {
            alert("Input Error: Course Name " + eval(i+1) + " is missing!");
            error = true;
        }
        
        if (inGrades[i] == "none") {
            alert("Input Error: Grade of Course " + eval(i+1) + " is missing!");
            error = true;
        }
            
        if (inCredits[i] == ""){
            alert("Input Error: Credit of Course " + eval(i+1) + " is missing!");
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
    
    for (var i=0; i<document.getElementById("semester_tbody").rows.length - 1; i++) {
        if (inGrades[i] == "none") {
            break;
        }
        document.getElementById("result").innerHTML += "Class: " + className[i] + "&nbsp&nbsp&nbsp&nbsp Grade: " + inGrades[i] + "&nbsp&nbsp&nbsp&nbsp Credit: " + inCredits[i] + "<br/>";
    }
    document.getElementById("result").innerHTML += "<br/><h2>Your Semester GPA is: " + gpa + "</h2><br/>";
    return 0;
}

// Add classes function
function addRow() {
    var table = document.getElementById("semester_tbody");
    var row = table.insertRow(document.getElementById("semester_tbody").rows.length - 1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = (document.getElementById('semester_tbody').rows.length - 1) + ". <input type='text' name='n" + (document.getElementById("semester_tbody").rows.length - 1) + "' size='10'>";
    cell2.innerHTML = "<select id='GR" + (document.getElementById("semester_tbody").rows.length - 1) + "'><option value='none'>—</option><option value='A'>A</option><option value='A-'>A-</option><option value='B+'>B+</option><option value='B'>B</option><option value='B-'>B-</option><option value='C+'>C+</option><option value='C'>C</option><option value='C-'>C-</option><option value='D+'>D+</option><option value='D'>D</option><option value='D-'>D-</option><option value='F'>F</option></select>";
    cell3.innerHTML = "<input type='text' size='1' name='CR" + (document.getElementById("semester_tbody").rows.length - 1) + "' ALIGN=TOP maxlength='1'>";
}
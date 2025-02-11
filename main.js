"use strict";
//  Array of Students
let studentArray = [];
let sortedStdArr = [];
//  Adds Student type to Student Array
function addStudent(fname, lname, coursename, grade) {
    studentArray.push({ fname: fname, lname: lname, coursename: coursename, grade: grade });
}
//  Validates whether student passed or failed
function passfail(grade) {
    let gradenum;
    if (typeof grade === 'string') {
        gradenum = parseInt(grade);
        if (grade === 'a' || grade === 'b' || grade === 'c' || grade === 'A' || grade === 'B' || grade === 'C') {
            return '&#128077';
        }
        else if (gradenum >= 70) {
            return '&#128077';
        }
        return '&#128078';
    }
    return '&#128078';
}
//  Sorts grades in Ascending/Descending order
function gradeSort(order) {
    if (order === 'Ascending') {
        return studentArray.sort((a, b) => (a.grade > b.grade) ? 1 : -1);
    }
    else {
        return studentArray.sort((a, b) => (a.grade < b.grade) ? 1 : -1);
    }
}
//  Displays array as Table
function displayTable(stdtable) {
    for (let i = 0; i < stdtable.length; i++) {
        let studentTable = document.querySelector('#studenttable');
        let stdRecord = document.createElement('tr');
        stdRecord.className = 'tbrow';
        stdRecord.innerHTML = `
                <td>${stdtable[i].fname}</td>
                <td>${stdtable[i].lname}</td>
                <td>${stdtable[i].coursename}</td>
                <td>${stdtable[i].grade}</td>
                <td>${passfail(stdtable[i].grade)}</td>
                <td <button class="remove">Remove</button></td>
                `;
        studentTable.appendChild(stdRecord);
    }
}
//  Clears table in order to display new table
function clearTable() {
    let studentTable = document.querySelectorAll('.tbrow');
    //console.log(studentTable)
    studentTable.forEach(function (item) {
        item.remove();
    });
}
//  Student submittal form
document.addEventListener('DOMContentLoaded', e => {
    var _a, _b;
    //  Student submittal form
    (_a = document.getElementById("submitStudent")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", e => {
        e.preventDefault();
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let coursename = document.getElementById("coursename").value;
        let grade = document.getElementById("grade").value;
        if (fname === '' || lname === '' || coursename === '' || grade === '') {
            alert("Please fill entire form!");
        }
        else {
            addStudent(fname, lname, coursename, grade);
            clearTable();
            displayTable(studentArray);
            //console.log(studentArray);
            document.getElementById("fname").value = '';
            document.getElementById("lname").value = '';
            document.getElementById("coursename").value = '';
            document.getElementById("grade").value = '';
        }
    });
    //  Sorting button
    (_b = document.getElementById("sortbtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", e => {
        e.preventDefault();
        let order = document.getElementById("order").value;
        sortedStdArr = gradeSort(order);
        clearTable();
        displayTable(sortedStdArr);
    });
    //  Remove button
    document.body.addEventListener('click', e => {
        //console.log(e.target)
        if (e.target.className === 'remove') {
            //console.log(e.target)
            let tr = e.target.parentNode;
            let rowtext = e.target.parentNode.firstElementChild.textContent;
            let rowtextindex = 0;
            console.log(rowtext);
            tr.remove();
            for (let i = 0; i < studentArray.length; i++) {
                if (studentArray[i].fname === rowtext) {
                    rowtextindex = i;
                }
            }
            studentArray.splice(rowtextindex, 1);
            console.log(studentArray);
        }
    });
});

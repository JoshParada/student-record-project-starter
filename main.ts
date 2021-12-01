//  Array of Students
let studentArray: Student[] = [];
let sortedStdArr: Student[] = [];


//  Student type
type Student = {
    fname: string
    lname: string
    coursename: string
    grade: number | string
}


//  Adds Student type to Student Array
function addStudent(fname: string, lname: string, coursename: string, grade: number | string): void {
    let newStudent: Student = { fname: fname, lname: lname, coursename: coursename, grade: grade }
    studentArray.push(newStudent);
}


//  Validates whether student passed or failed
function passfail(grade: string | number): string {
    let gradenum: number
    if (typeof grade === 'string') {
        gradenum = parseInt(grade)

        if (grade === 'a' || grade === 'b' || grade === 'c' || grade === 'A' || grade === 'B' || grade === 'C') {
            return '&#128077'
        } else if (gradenum >= 70) {
            return '&#128077'
        }
        return '&#128078'
    }
    return '&#128078'
}


//  Sorts grades in Ascending/Descending order
function gradeSort(order: string): Student[] {
    if (order === 'Ascending') {
        let sortedArray = studentArray.sort((a, b) => (a.grade > b.grade) ? 1 : -1)
        console.log(sortedArray)
        return sortedArray
    } else {
        let sortedArray = studentArray.sort((a, b) => (a.grade < b.grade) ? 1 : -1)
        console.log(sortedArray)

        return sortedArray
    }
}


//  Displays array as Table
function displayTable(stdtable: Student[]) {
    for (let i = 0; i < stdtable.length; i++) {
        let studentTable = <HTMLInputElement>document.querySelector('#studenttable');
        let stdRecord = document.createElement('tr');
        stdRecord.className = 'tbrow';
        stdRecord.innerHTML = `
                <td>${stdtable[i].fname}</td>
                <td>${stdtable[i].lname}</td>
                <td>${stdtable[i].coursename}</td>
                <td>${stdtable[i].grade}</td>
                <td>${passfail(stdtable[i].grade)}</td>
                `
        studentTable.appendChild(stdRecord)
    }

}


//  Clears table in order to display new table
function clearTable() {
    let studentTable = <NodeListOf<Element>>document.querySelectorAll('.tbrow');
    //console.log(studentTable)
    studentTable.forEach(function (item) {
        item.innerHTML = ''
    })
}


//  Student submittal form
document.addEventListener('DOMContentLoaded', e => {

    //  Student submittal form
    document.getElementById("submitStudent").addEventListener("click", e => {
        e.preventDefault();

        let fname: string = (<HTMLInputElement>document.getElementById("fname")).value;
        let lname: string = (<HTMLInputElement>document.getElementById("lname")).value;
        let coursename: string = (<HTMLInputElement>document.getElementById("coursename")).value;
        let grade: number | string = (<HTMLInputElement>document.getElementById("grade")).value;

        if (fname === '' || lname === '' || coursename === '' || grade === '') {
            alert("Please fill entire form!")
        } else {
            addStudent(fname, lname, coursename, grade);
            clearTable();
            displayTable(studentArray);

            //console.log(studentArray);
            (<HTMLInputElement>document.getElementById("fname")).value = '';
            (<HTMLInputElement>document.getElementById("lname")).value = '';
            (<HTMLInputElement>document.getElementById("coursename")).value = '';
            (<HTMLInputElement>document.getElementById("grade")).value = '';
        }
    })


    //  Sorting button
    document.getElementById("sortbtn")?.addEventListener("click", e => {
        e.preventDefault();
        let order: string = (<HTMLInputElement>document.getElementById("order")).value;
        sortedStdArr = gradeSort(order);
        clearTable()
        displayTable(sortedStdArr);

    })
})
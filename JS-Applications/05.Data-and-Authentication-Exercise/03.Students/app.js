async function solve() {
    const table = document.querySelector('tbody');

    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await response.json();

    Object.values(data).forEach(s => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facultyNumber = Number(s.facultyNumber);
        const grade = Number(s.grade).toFixed(2);

        const tableRow = document.createElement('tr');

        const firstNameCell = tableRow.insertCell(0);
        firstNameCell.innerText = firstName;

        const lastNameCell = tableRow.insertCell(1);
        lastNameCell.innerText = lastName;

        const facultyNumberCell = tableRow.insertCell(2);
        facultyNumberCell.innerText = facultyNumber;

        const gradeCell = tableRow.insertCell(3);
        gradeCell.innerText = grade;

        table.appendChild(tableRow);
    })

    document.getElementById('submit').addEventListener('click', onClickSubmit);

    async function onClickSubmit(ev) {
        ev.preventDefault();

        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (firstNameInput.value == '' ||
            lastNameInput.value == '' ||
            facultyNumberInput.value == '' ||
            gradeInput.value == '') {
            return alert('All fields are required!');
        }

        if (isNaN(facultyNumberInput.value) ||
            isNaN(gradeInput.value)) {
            return alert('Grade and Faculty Number must be a number!');
        }

        const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: Number(facultyNumberInput.value),
                grade: Number(gradeInput.value).toFixed(2)
            })
        })

        if (!response.ok) {
            const error = response.json();
            return alert(error.message);
        }

        const tableRow = document.createElement('tr');

        const firstNameCell = tableRow.insertCell(0);
        firstNameCell.innerText = firstNameInput.value;

        const lastNameCell = tableRow.insertCell(1);
        lastNameCell.innerText = lastNameInput.value;

        const facultyNumberCell = tableRow.insertCell(2);
        facultyNumberCell.innerText = Number(facultyNumberInput.value);

        const gradeCell = tableRow.insertCell(3);
        gradeCell.innerText = Number(gradeInput.value).toFixed(2);

        table.appendChild(tableRow);

        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }
}

solve();
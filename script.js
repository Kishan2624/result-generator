const semesterSelect = document.getElementById("semester-select");
const inputTypeSelect = document.getElementById("input-type-select");
const submitSemester = document.getElementById("submit-semester");
const detailsForm = document.getElementById("details-form");
const marksForm = document.getElementById("marks-form");
const subjectFormSection = document.getElementById("subject-form");
const generateButton = document.getElementById("generate-result");

submitSemester.addEventListener("click", () => {
  const selectedSemester = semesterSelect.value;
  const selectedInputType = inputTypeSelect.value;

  if (!selectedSemester) {
    alert("Please select a semester.");
    return;
  }

  if (!selectedInputType) {
    alert("Please select Marks or Grade Point.");
    return;
  }

  generateDetailsForm();
  generateMarksForm(selectedSemester, selectedInputType);
});

submitSemester.addEventListener("click", () => {
  const selectedSemester = semesterSelect.value;
  const selectedInputType = inputTypeSelect.value;

  if (!selectedSemester) {
    alert("Please select a semester.");
    return;
  }

  if (!selectedInputType) {
    alert("Please select Marks or Grade Point.");
    return;
  }

  // Save selected values in localStorage
  localStorage.setItem("selectedSemester", selectedSemester);
  localStorage.setItem("selectedInputType", selectedInputType);

  generateDetailsForm();
  generateMarksForm(selectedSemester, selectedInputType);
});

generateButton.addEventListener("click", () => {
  // Check if all details form fields are filled
  const studentName = document.getElementById("student-name").value;
  const fatherName = document.getElementById("father-name").value;
  const motherName = document.getElementById("mother-name").value;
  const enrollmentNo = document.getElementById("enrollment-no").value;
  const abcId = document.getElementById("abc-id").value;

  if (!studentName || !fatherName || !motherName || !enrollmentNo || !abcId) {
    alert("Please fill in all the details in the student information form.");
    return;
  }

  // Save student details in localStorage
  localStorage.setItem("studentName", studentName);
  localStorage.setItem("fatherName", fatherName);
  localStorage.setItem("motherName", motherName);
  localStorage.setItem("enrollmentNo", enrollmentNo);
  localStorage.setItem("abcId", abcId);

  // Check if all marks form fields are filled
  const markInputs = marksForm.querySelectorAll("input");
  const marks = [];

  for (let input of markInputs) {
    if (!input.value) {
      alert("Please fill in all the marks or grade points.");
      return;
    }

    const subjectName = input.getAttribute("name");
    const value = Number(input.value);
    const credits = input.dataset.credits;
    const code = input.dataset.code;

    // Determine grade point
    let gradePoint;
    let gradeLetter;
    if (inputTypeSelect.value === "marks") {
      gradePoint = getGradePoint(value);
      gradeLetter = getGradeLetter(value, "marks");
    } else if (inputTypeSelect.value === "grade-point") {
      gradePoint = value;
      gradeLetter = getGradeLetter(value, "grade-point");
    }

    marks.push({ code, subjectName, credits, gradePoint, gradeLetter });
  }

  // Save marks in localStorage
  localStorage.setItem("marks", JSON.stringify(marks));

  const cgpa = calculateCGPA();

  // Save CGPA in localStorage
  localStorage.setItem("cgpa", cgpa);

  // Redirect to the result page
  window.location.href = "result/generateResult.html";
});

function generateDetailsForm() {
  // Clear any previous form contents
  const detailsForm = document.getElementById("details-form");
  detailsForm.innerHTML = "";

  // Create form elements for student details
  const formHTML = `
    <div>
      <label for="student-name">Student Name</label>
      <input type="text" id="student-name" placeholder="Enter Student Name" required>
    </div>
    <div>
      <label for="father-name">Father's Name</label>
      <input type="text" id="father-name" placeholder="Enter Father's Name" required>
    </div>
    <div>
      <label for="mother-name">Mother's Name</label>
      <input type="text" id="mother-name" placeholder="Enter Mother's Name" required>
    </div>
    <div>
      <label for="enrollment-no">Enrollment Number (Roll No.)</label>
      <input type="text" id="enrollment-no" placeholder="Enter Enrollment Number" required>
    </div>
    <div>
      <label for="abc-id">ABC ID</label>
      <input type="text" id="abc-id" placeholder="Enter ABC ID" required>
    </div>
  `;

  // Append the generated HTML to the details-form section
  detailsForm.innerHTML = formHTML;
}

function generateMarksForm(semester, inputType) {
  marksForm.innerHTML = "";
  const subjects = semesters[semester];

  subjects.forEach((subject) => {
    const subjectRow = document.createElement("div");
    if (inputType === "marks") {
      subjectRow.innerHTML = `
        <label>${subject.name}</label>
        <input type="number" placeholder="Enter Marks (0-100)" 
               data-credits="${subject.credits}" 
               data-code="${subject.code}" 
               name="${subject.name}" 
               min="0" max="100"
               required>
      `;
    } else if (inputType === "grade-point") {
      subjectRow.innerHTML = `
        <label>${subject.name}</label>
        <input type="number" placeholder="Enter Grade Point (0-10)" 
               data-credits="${subject.credits}" 
               data-code="${subject.code}" 
               name="${subject.name}" 
               min="0" max="10"
               required>
      `;
    }
    marksForm.appendChild(subjectRow);
  });

  subjectFormSection.classList.remove("hidden");
}

function calculateCGPA() {
  const inputs = marksForm.querySelectorAll("input");
  let totalCredits = 0;
  let weightedGradePoints = 0;

  inputs.forEach((input) => {
    const value = parseFloat(input.value);
    const credits = parseInt(input.dataset.credits);

    let gradePoint;

    if (inputTypeSelect.value === "marks") {
      gradePoint = getGradePoint(value);
    } else if (inputTypeSelect.value === "grade-point") {
      gradePoint = value;
    }

    if (!isNaN(value)) {
      totalCredits += credits;
      weightedGradePoints += gradePoint * credits;
    }
  });

  const cgpa = (weightedGradePoints / totalCredits).toFixed(2);
  return cgpa;
}

function getGradePoint(marks) {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 40) return 5;
  return 0;
}

function getGradeLetter(value, inputType) {
  if (inputType === "marks") {
    if (value >= 90) return "O";
    if (value >= 80) return "A+";
    if (value >= 70) return "A";
    if (value >= 60) return "B+";
    if (value >= 50) return "B";
    if (value >= 40) return "C";
    return "F";
  } else if (inputType === "grade-point") {
    if (value === 10) return "O";
    if (value >= 9) return "A+";
    if (value >= 8) return "A";
    if (value >= 7) return "B+";
    if (value >= 6) return "B";
    if (value >= 5) return "C";
    return "F";
  }
}

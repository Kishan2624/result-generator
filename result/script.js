window.addEventListener("load", function () {
  // Retrieve values from localStorage
  const studentName = localStorage.getItem("studentName");
  const fatherName = localStorage.getItem("fatherName");
  const motherName = localStorage.getItem("motherName");
  const enrollmentNo = localStorage.getItem("enrollmentNo");
  const abcId = localStorage.getItem("abcId");
  const marks = JSON.parse(localStorage.getItem("marks"));
  const cgpa = localStorage.getItem("cgpa");

  if (
    !studentName ||
    !fatherName ||
    !motherName ||
    !enrollmentNo ||
    !abcId ||
    !marks ||
    !cgpa
  ) {
    window.location.href = "/";
  }

  const resultBox = document.getElementById("box");
  resultBox.innerHTML = "";
  resultBox.innerHTML = `
      <div id="headBox">
          <p id="abcId" class="t s0">ABC ID: ${abcId}</p>
          <div id="title-image">
            <img
              id="university-logo"
              src="images/university-logo.jpg"
              alt="logo"
            />
            <div id="titleBox">
              <div id="titles">
                <h2 class="t s1">दल कौशल एवं उयमता वववयालय</h2>
                <h1 class="t s2">
                  Delhi Skill &amp; Entrepreneurship University
                </h1>
                <h3 class="t s3">
                  (A State University Established under Govt. of NCT of Delhi
                  Act 04 of 2020)
                </h3>
              </div>
              <div id="captions">
                <p class="t s4">
                  Grade sheet of EoSE of <strong class="t s5">June-2024</strong>
                </p>
                <p class="t s6">
                  Diploma in Electrical Engineering-Batch
                  <strong class="t s7">2022</strong>
                </p>
              </div>
            </div>
          </div>
      </div>
      <div id="marksBox">
          <div id="studentDetails">
            <div class="row">
              <p class="t s8">
                Name of the Student: <strong class="t s9 uppercase">${studentName}</strong>
              </p>
              <p class="t s8">
                Father's name: <strong class="t s9 capitalize">${fatherName}</strong>
              </p>
            </div>
            <div class="row">
              <p class="t sa">
                Enrollment no: <strong class="t sb">${enrollmentNo}</strong>
              </p>
              <p class="t s8">
                Mother's name: <strong class="t s9 capitalize">${motherName}</strong>
              </p>
            </div>
          </div>
          <div id="marksDetails">
            <table id="studentMarksTable">
              <tr>
                <td><p class="t sb">S.No</p></td>
                <td><p class="t sc">Course Code</p></td>
                <td><p class="t sc">Course Name</p></td>
                <td><p class="t sc">Credits</p></td>
                <td><p class="t sc">Credits Earned (C<sub>i</sub>)</p></td>
                <td><p class="t sc">Grade</p></td>
                <td><p class="t sc">Grade Point (P<sub>i</sub>)</p></td>
              </tr>
            </table>
            <table id="creditsTable">
              <tr>
                <td rowspan="2"><p class="t sc">Credits Earned in this semester</p></td>
                <td rowspan="2"><p class="t sc">Total Credits earned as on date</p></td>
                <td colspan="2"><p class="t sc">SGPA</p></td>
                <td colspan="2"><p class="t sc">CGPA</p></td>
                <td colspan="2" rowspan="2"><p class="t sc">Grading System</p></td>
              </tr>
              <tr>
                <td><p class="t se">Earned</p></td>
                <td><p class="t se">Grade Letter</p></td>
                <td><p class="t se">Earned</p></td>
                <td><p class="t se">Grade Letter</p></td>
              </tr>
              <tr>
                <td><p class="t sb">${totalCredits(marks)}</p></td>
                <td><p class="t sb">-</p></td>
                <td><p class="t sb">${cgpa}</p></td>
                <td><p class="t sb">${getGradeLetter(cgpa)}</p></td>
                <td><p class="t sb">-</p></td>
                <td><p class="t sb">-</p></td>
                <td><p class="t sb">ABS</p></td>
              </tr>
            </table>
            <p id="computerGenerated" class="t sa">Computer Generated Provisional Grade Sheet</p>
          </div>
      </div>
    `;

  // Dynamic Table Generation for Marks
  const studentMarksTable = document.getElementById("studentMarksTable");
  marks.forEach((mark, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="text-center"><p class="t sd">${index + 1}</p></td>
        <td><p class="t sd">${mark.code}</p></td>
        <td><p class="t sd">${mark.subjectName}</p></td>
        <td class="text-center"><p class="t sd">${mark.credits}</p></td>
        <td class="text-center"><p class="t sd">${mark.credits}</p></td>
        <td class="text-center"><p class="t sd">${mark.gradeLetter}</p></td>
        <td class="text-center"><p class="t sd">${mark.gradePoint}</p></td>
      `;
    studentMarksTable.appendChild(row);
  });

  // Function to calculate SGPA
  function totalCredits(marks) {
    let totalCredits = 0;
    marks.forEach((mark) => {
      totalCredits += Number(mark.credits);
    });
    return totalCredits;
  }

  // Function to get Grade Letter based on SGPA
  function getGradeLetter(sgpa) {
    sgpa = parseFloat(sgpa);
    if (sgpa >= 9.5) return "O";
    if (sgpa >= 8.5) return "A+";
    if (sgpa >= 7.5) return "A";
    if (sgpa >= 6.5) return "B+";
    if (sgpa >= 5.5) return "B";
    if (sgpa >= 4.5) return "C";
    if (sgpa >= 4.0) return "P";
    return "F";
  }

  document.getElementById("downloadBtn").addEventListener("click", function () {
    var contentElement = document.getElementById("box"); // Get the element to convert to PDF

    if (contentElement) {
      // Calculate the scale factor to fit content within the page dimensions
      var contentWidth = contentElement.offsetWidth;
      var contentHeight = contentElement.offsetHeight;

      // Define the page size for PDF in mm (A4 size in landscape)
      var pageWidth = 297; // Landscape A4 width in mm
      var pageHeight = 210; // Landscape A4 height in mm

      // Adjust the scale so that the content fits within the page dimensions without losing quality
      var scaleX = pageWidth / contentWidth;
      var scaleY = pageHeight / contentHeight;
      var scale = Math.min(scaleX, scaleY); // Use the smaller scale to fit content on the page

      // Apply a custom CSS transformation to resize the content to fit the page
      contentElement.style.transform = `scale(${scale})`;
      contentElement.style.transformOrigin = "top left";
      contentElement.style.width = `${contentWidth * scale}px`; // Resize content width
      contentElement.style.height = `${contentHeight * scale}px`; // Resize content height

      var options = {
        margin: 10, // Adds margins to the PDF
        filename: "content.pdf",
        image: { type: "jpeg", quality: 1 }, // High quality image
        html2canvas: {
          scale: 2, // High quality rendering
          useCORS: true, // Ensures images from external domains are loaded properly
          logging: false,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: [297, 210], // A4 landscape
          orientation: "landscape",
          putOnlyUsedFonts: true, // Optimizes PDF file size
          compress: true, // Compress PDF for better quality
        },
      };

      // Create PDF from the content element
      html2pdf().from(contentElement).set(options).save();

      // Reset the scaling after generating the PDF
      contentElement.style.transform = ""; // Remove the scaling
      contentElement.style.width = ""; // Reset width
      contentElement.style.height = ""; // Reset height
    } else {
      console.error("Element not found: #content");
    }
  });
});

# Result Generator

## Overview
The Result Generator is a simple web application that allows students to create their academic results. Users can select their semester, fill in personal details (name, father's name, mother's name, and ABC ID), enter marks for the selected subjects, and generate a downloadable result in PDF format.

## Features
- Select semester dynamically.
- Fill personal details: Name, Father's Name, Mother's Name, and ABC ID.
- Automatically display subjects based on the selected semester.
- Enter marks for each subject.
- Generate and download a result as a PDF.

## Technologies Used
- HTML
- CSS
- JavaScript
- LocalStorage for temporary data storage
- html2pdf.js for PDF generation

## How to Use
1. Open the application in a browser by running the `index.html` file.
2. Select your semester from the dropdown.
3. Fill in your details:
   - Name
   - Father's Name
   - Mother's Name
   - ABC ID
4. Enter the marks for the displayed subjects.
5. Click the "Generate Result" button.
6. The result will be generated and displayed on the screen.
7. Click "Download Result" to save it as a PDF file.


## How It Works
1. User inputs are stored temporarily in the browser's LocalStorage.
2. JavaScript dynamically updates the result preview based on user inputs.
3. The `html2pdf.js` library converts the result preview into a downloadable PDF.

## Example Workflow
1. Open the application.
2. Select the 3rd semester.
3. Enter personal details (e.g., Name: John Doe, Father's Name: Richard Doe).
4. Fill in marks for subjects like Math, Science, and English.
5. Click "Generate Result" and view the result on the screen.
6. Download the result as a PDF.

## Dependencies
- **html2pdf.js** for converting HTML content into PDF format.

## Future Enhancements
- Add a subject grade calculator based on marks.
- Include user authentication for saved results.
- Enhance the design with animations and responsiveness.

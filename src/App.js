import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PptxGenJS from "pptxgenjs";
import * as XLSX from "xlsx";
import LogoCard from "./Website/main";

// const [invalidCRN, setInvalidCRN] = useState(false);
// const [invalidYear, setInvalidYear] = useState(false);
// const [invalidURN, setInvalidURN] = useState(false);

function App() {


  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [crn, setCRN] = useState("");
  const [urn, setURN] = useState("");

  // Function to reset all input fields
  const resetFields = () => {
    setContent("");
    setName("");
    setBranch("");
    setYear("");
    setCRN("");
    setURN("");
  };

  //  Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Student Documentation", 50, 15);

    doc.setFontSize(14);
    doc.text("Personal Details", 20, 30);

    //  Background for Personal Details
    doc.setFillColor(230, 230, 230);
    doc.rect(18, 32, 170, 50, "F");

    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${name}`, 25, 40);
    doc.text(`Branch: ${branch}`, 25, 50);
    doc.text(`Year: ${year}`, 100, 40);
    doc.text(`CRN: ${crn}`, 100, 50);
    doc.text(`URN: ${urn}`, 25, 65);

    //  Heading "Content" (No Background)
    doc.setFont("helvetica", "bold");
    doc.text("Content", 20, 95);

    //  Calculate Content Box Height Based on Text Length
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const contentStartY = 105; // Start just below heading
    const maxWidth = 160;
    const lineHeight = 6; // Approx line height
    const contentLines = doc.splitTextToSize(content, maxWidth);
    const contentHeight = contentLines.length * lineHeight;

    // Background for Content Text (Darker Shade)
    doc.setFillColor(240, 240, 240);
    doc.rect(18, contentStartY - 3, 170, contentHeight + 6, "F");

    //  Add Content Text Over Background
    doc.text(contentLines, 25, contentStartY + 5);

    doc.save("report.pdf");
  };



  const generatePPTX = () => {
    let pptx = new PptxGenJS();

    // --- Slide 1: Student Info ---
    let slide1 = pptx.addSlide();

    // Slide Title
    slide1.addText("Student Documentation", {
      x: 1,
      y: 0.5,
      fontSize: 28,
      bold: true,
      color: "003366",
    });

    // Blue box background for student info
    slide1.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.3,
      w: 8.4,
      h: 3.2,
      fill: { color: "D9EAFB" }, // light blue
      roundRadius: 10,
      shadow: { type: "outer", color: "888888", blur: 3, offset: 2 },
    });

    // Student Info Text
    const studentInfo = `Name: ${name}\n\nBranch: ${branch}\n\nYear: ${year}\n\nCRN: ${crn}\n\nURN: ${urn}`;
    slide1.addText(studentInfo, {
      x: 1.2,
      y: 1.5,
      fontSize: 18,
      color: "000000",
      lineSpacing: 20,
      w: 7.5,
      h: 3,
    });

    // --- Slide 2: Content ---
    let slide2 = pptx.addSlide();

    slide2.addText("Documentation Content", {
      x: 1,
      y: 0.5,
      fontSize: 24,
      bold: true,
      color: "003366",
    });

    // Background box with height = 6.25 inches (≈ 600px)
    slide2.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.2,
      w: 8.4,
      h: 3.5,
      fill: { color: "F5F5F5" },
      line: { color: "DDDDDD" },
      roundRadius: 8,
    });

    // Content Text
    slide2.addText(content, {
      x: 1,
      y: -1.2,
      fontSize: 16,
      color: "333333",
      wrap: true,
      w: 7.5,
      h: 6,
    });

    pptx.writeFile("styled_presentation.pptx");
  };

  //  Generate Poster (Screenshot of HTML)
  const generatePoster = () => {
    const element = document.getElementById("poster-content");

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("poster.pdf");
    });
  };

  //  Generate Excel File
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      { Name: name, Branch: branch, Year: year, CRN: crn, URN: urn, Content: content }
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  //  Generate JSON File
  const generateJSON = () => {
    const jsonData = { name, branch, year, crn, urn, content };
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();
  };

  return (

    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-4">
      <LogoCard />
      <h1 className="text-3xl font-bold text-gray-600">One Source Documentation</h1>

      {/* Input Section */}
      <div id="poster-content" className="flex flex-col gap-2 bg-white p-4 rounded shadow-md w-96 border-2 border-gray-300">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Enter Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Enter CRN"
          value={crn}
          onChange={(e) => setCRN(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Enter URN"
          value={urn}
          onChange={(e) => setURN(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 hover:bg-blue-600 hover:shadow-2xl  shadow-lg transition-all duration-300 transform ">Generate PDF</button>
        <button onClick={generatePPTX} className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 hover:bg-green-600 hover:shadow-2xl  shadow-lg transition-all duration-300 transform ">Generate PPTX</button>
        <button onClick={generatePoster} className="bg-yellow-500 text-white px-4 py-2 rounded hover:scale-105 hover:bg-yellow-600 hover:shadow-2xl  shadow-lg transition-all duration-300 transform ">Generate Poster</button>
        <button onClick={generateExcel} className="bg-purple-500 text-white px-4 py-2 rounded hover:scale-105 hover:bg-purple-600 hover:shadow-2xl  shadow-lg transition-all duration-300 transform ">Generate Excel</button>
        <button onClick={generateJSON} className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 hover:bg-red-600 hover:shadow-2xl  shadow-lg transition-all duration-300 transform ">Export as JSON</button>
        <button onClick={resetFields} className="bg-gray-500 text-white px-4 py-2 rounded hover:scale-105 hover:bg-gray-600 hover:shadow-2xl  shadow-lg transition-all duration-300 transform ">Reset</button>
      </div>
    </div>
  );
}

export default App;

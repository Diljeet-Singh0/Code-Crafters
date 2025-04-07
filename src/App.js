import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PptxGenJS from "pptxgenjs";
import * as XLSX from "xlsx";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [crn, setCRN] = useState("");
  const [urn, setURN] = useState("");

  // 📌 Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Name: ${name}`, 20, 20);
    doc.text(`Branch: ${branch}`, 20, 30);
    doc.text(`Year: ${year}`, 20, 40);
    doc.text(`CRN: ${crn}`, 20, 50);
    doc.text(`URN: ${urn}`, 20, 60);
    doc.text(`Title: ${title}`, 20, 70);
    doc.text("Content:", 20, 80);
    doc.text(content, 20, 90, { maxWidth: 170 });
    doc.save("report.pdf");
  };


  // 📌 Generate PPTX Presentation
  const generatePPTX = () => {
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();

    slide.addText(`Name: ${name}`, { x: 0.5, y: 0.5, fontSize: 18 });
    slide.addText(`Branch: ${branch}`, { x: 0.5, y: 1, fontSize: 18 });
    slide.addText(`Year: ${year}`, { x: 0.5, y: 1.5, fontSize: 18 });
    slide.addText(`CRN: ${crn}`, { x: 0.5, y: 2, fontSize: 18 });
    slide.addText(`URN: ${urn}`, { x: 0.5, y: 2.5, fontSize: 18 });
    slide.addText(`Title: ${title}`, { x: 0.5, y: 3, fontSize: 20, bold: true });
    slide.addText(content, { x: 0.5, y: 3.5, fontSize: 16, wrap: true });

    pptx.writeFile("presentation.pptx");
  };

  // 📌 Generate Poster (Screenshot of HTML)
  const generatePoster = () => {
    const element = document.getElementById("poster-content"); // Capture entire form
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("poster.pdf");
    });
  };

  // 📌 Generate Excel File
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        Name: name,
        Branch: branch,
        Year: year,
        CRN: crn,
        URN: urn,
        Title: title,
        Content: content
      }
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };


  // 📌 Generate JSON File
  const generateJSON = () => {
    const jsonData = {
      name,
      branch,
      year,
      crn,
      urn,
      title,
      content
    };
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();
  };


  return (
    <div className="App flex gap-4 flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">One Source Documentation</h1>

      {/* Input Section */}
      <div id="poster-content" className="flex flex-col gap-2 bg-white p-4 rounded shadow-md w-96">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Enter Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Enter CRN"
          value={crn}
          onChange={(e) => setCRN(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Enter URN"
          value={urn}
          onChange={(e) => setURN(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded">Generate PDF</button>
        <button onClick={generatePPTX} className="bg-green-500 text-white px-4 py-2 rounded">Generate PPTX</button>
        <button onClick={generatePoster} className="bg-yellow-500 text-white px-4 py-2 rounded">Generate Poster</button>
        <button onClick={generateExcel} className="bg-purple-500 text-white px-4 py-2 rounded">Generate Excel</button>
        <button onClick={generateJSON} className="bg-red-500 text-white px-4 py-2 rounded">Export as JSON</button>
      </div>
    </div>
  );



}

export default App;

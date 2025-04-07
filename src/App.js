import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PptxGenJS from "pptxgenjs";
import * as XLSX from "xlsx";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 📌 Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(title, 20, 20);
    doc.text(content, 20, 40);
    doc.save("report.pdf");
  };

  // 📌 Generate PPTX Presentation
  const generatePPTX = () => {
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();
    slide.addText(title, { x: 1, y: 1, fontSize: 24 });
    slide.addText(content, { x: 1, y: 2, fontSize: 18 });
    pptx.writeFile("presentation.pptx");
  };

  // 📌 Generate Poster (Screenshot of HTML)
  const generatePoster = () => {
    const element = document.getElementById("poster-content"); // Capture specific content only
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size for better quality
      const imgWidth = 190; // Fit within A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("poster.pdf");
    });
  };

  // 📌 Generate Excel File
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([{ Title: title, Content: content }]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  // 📌 Generate JSON File
  const generateJSON = () => {
    const jsonData = { title, content };
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();
  };

  return (
    <div className="App flex gap-4 flex-col items-center justify-center h-screen bg-gray-100">
      <h1>One Source Documentation</h1>

      <div id="poster-content" className="flex flex-col gap-2 bg-white p-4 rounded shadow-md">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* 📌 All buttons are back! */}
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

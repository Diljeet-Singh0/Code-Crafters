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
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
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
    <div className="App">
      <h1>One Source Documentation</h1>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={generatePDF}>Generate PDF Report</button>
      <button onClick={generatePPTX}>Generate PPTX Presentation</button>
      <button onClick={generatePoster}>Generate Poster</button>
      <button onClick={generateExcel}>Generate Excel File</button>
      <button onClick={generateJSON}>Export as JSON</button>
    </div>
  );
}

export default App;

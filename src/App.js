      import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PptxGenJS from "pptxgenjs";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(title, 20, 20);
    doc.text(content, 20, 40);
    doc.save("document.pdf");
  };

  const generatePPTX = () => {
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();
    slide.addText(title, { x: 1, y: 1, fontSize: 24 });
    slide.addText(content, { x: 1, y: 2, fontSize: 18 });
    pptx.writeFile("presentation.pptx");
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
      <button onClick={generatePDF}>Generate PDF</button>
      <button onClick={generatePPTX}>Generate PPTX</button>
    </div>
  );
}

export default App;

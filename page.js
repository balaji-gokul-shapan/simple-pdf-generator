'use client'
import { useState } from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';
export default function Home() {
  const [data, setdata] = useState({
    username: '',
    course:''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    if(data.username === '' && data.course === ''){
      alert('Please fill all the fields')

    }
    e.preventDefault();
    setFormSubmitted(true);
    console.log(data);
  }
  const generatePDF = () => {
    const doc = new jsPDF();
    if (data.username === '' && data.course === '') {
      alert('Please fill all the fields')
    }
    if(data.course === 'B.Tech') {
      doc.text('REF: A101', 30, 30);
    }else{
      doc.text('REF: B101', 30, 30);
    }
    doc.text(`Name: ${data.username}`, 30, 45);
    doc.text(`Course: ${data.course}`, 30, 60);
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 30, 75);
    doc.text('Fees Structure: ', 30, 90);
    const columns = ['Year', 'One time fee', 'Tution fee'];
    let tableData;
    if(data.course === 'B.Tech') {
      tableData = [
        ['1', '500', '160'],
        ['2', '-', '160'],
      ];
    }else{
       tableData = [
        ['1', '600', '260'],
        ['2', '-', '260'],
      ];
    }

    doc.autoTable({
      startY: 110,
      head: [columns],
      body: tableData,
      styles: {
        fillColor: false,
        fontSize: 14,
        textColor: [0, 0, 0],
        cellPadding: 5,
        lineColor: [0, 0, 0],
        lineWidth: 0.1
      }
    });
    doc.save('userDetails.pdf');
    console.log(data);
  }
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex flex-col">
        <div className="flex flex-col w-full">
          <label htmlFor="username" className="w-1/2 m-2 color-gray-400 font-semibold">Username:</label>
          <input type="text" name='username' value={data.username} onChange={(e) => handleChange(e) } className="w-11/12 p-2 m-2 border border-gray-400 rounded-md" />
        </div>
        <div className="flex flex-col m-2 w-full">
        <label htmlFor="coursename" className="w-1/2 m-2 color-gray-400 font-semibold">Course:</label>
          <select name="course" id="course" value={data.course} className="w-11/12 p-2 m-2 border border-gray-400 rounded-md" onChange={(e) => handleChange(e) }>
          <option value="">Select a Course</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
          </select>
        </div>
        <div className="w-1/3 flex flex-row">
          <button className="w-1/2 m-2 p-2 bg-blue-500 text-white rounded-md" type="submit" onClick={handleSubmit}>Submit</button>
          <button className="w-1/2 m-2 p-2 bg-green-500 text-white rounded-md" disabled={!formSubmitted} onClick={generatePDF}>Generate PDF</button>
        </div>
    </div>
  );
}

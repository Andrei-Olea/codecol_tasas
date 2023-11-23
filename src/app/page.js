"use client";
import React, { useState, useEffect } from "react"


export default function Home() {
  const [data, setData] = useState(null)
  const sheetId = '1tpro_CKqYAtnCmY0OjjXWpt16aa3t-Zc28Tuxi4MMyE';
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = 'Credito';
  const query = encodeURIComponent('Select *')
  const url = `${base}&sheet=${sheetName}&tq=${query}`


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const text = await response.text();
        console.log("this is the text", text);
        const json = JSON.parse(text.substr(47).slice(0, -2));
        setData(json);
        // console.log("this is the super data", data)
        console.log("json", json)



      } catch (error) {
        console.log("Fetch error:", error)
      }

    };
    fetchData();
  }, [url]);

  useEffect(() => {
    console.log("this is the data", data)
  }, [data])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='flex text-violet-500 text-5xl'>Tasas de {sheetName}</h1>

      {data && (
        <table>
          <tbody>
            <tr>
              {data.table.cols.map((col, index) => (
                <th key={index} className="p-2 bg-slate-800 border border-sky-500 first:w-96">{col.label}</th>
              ))}
            </tr>
            {data.table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.c.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2">{
                    cell && cell.v !== null ?
                      (cellIndex >= row.c.length - 2 ? cell.v + '%' : cell.v) : null
                  }</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}


    </main>
  );

}

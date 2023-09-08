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
      fetch(url)
        .then(res => res.text())
        .then(text => {
          const json = JSON.parse(text.substr(47).slice(0, -2))
          setData(json)
        })

        console.log(data)
    };
    fetchData();
  }, [url]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <h1 className='flex text-violet-500 text-5xl'>Tasas de Ahorro</h1>

    <p>{data.table.cols[0].label}</p>

     <table>
      
     </table>
    </main>
  )
}

"use client";

import { useState } from 'react';
import Cell from '@/components/cell';


const Home = () => {
  const [cells, setCells] = useState(['', '', '', '', '', '', '', '', '']);
  const [go, setGo] = useState("circle");

  return (
    <div className="container">
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell key={index} go={go} setGo={setGo} />
        ))}


  
      </div>
    </div>
  )
}

export default Home;
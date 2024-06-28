"use client"
import React, { useEffect, useState } from 'react'

const Results = () => {
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/index')
  }, [])

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="text-2xl font-bold">
          Your Interview Results Powered by mockAI
        </h1>
        <p>{results}</p>
      </div>
    </div>
  )
}

export default Results

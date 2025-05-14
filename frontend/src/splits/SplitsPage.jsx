import axiosInstance from "../utils/axios"
import React, { useEffect, useState } from "react"
import SplitList from "./SplitList"
import FilterBar from "./FilterBar"

const SplitsPage = () => {
  const [splits, setSplits] = useState([])
  const [filters, setFilters] = useState({})

  useEffect(() => {
    const fetchSplits = async () => {
      try {
        const data = await getSplits(filters)
        setSplits(data)
      } catch (error) {
        console.error("Fehler beim Laden der Splits:", error)
      }
    }

    fetchSplits()
  }, [filters])

  const getSplits = async (filters) => {
    const response = await axiosInstance.get("/splits", {
      params: filters,
    })
    return response.data
  }


  return (
    <div className="container mt-4">
      <h2>Workout Splits</h2>
      <FilterBar onFilterChange={setFilters} />
      <SplitList splits={splits} />
    </div>
  )
}

export default SplitsPage

import axiosInstance from "../utils/axios"
import React, { useEffect, useState } from "react"
import SplitList from "./SplitList"
import FilterBar from "./FilterBar"
import { Container, Spinner } from "react-bootstrap"

const SplitsPage = () => {
  const [splits, setSplits] = useState([])
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSplits = async () => {
      try {
        setLoading(true)
        const data = await getSplits(filters)
        setSplits(data)
        setError(null)
      } catch (error) {
        console.error("Fehler beim Laden der Splits:", error)
        setError("Fehler beim Laden der Splits. Bitte versuchen Sie es später erneut.")
      } finally {
        setLoading(false)
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
    <Container className="py-4">
      <div className="text-center mb-4">
        <h1>Workout Splits</h1>
        <p className="text-muted">
          Wählen Sie einen Trainingsplan aus und starten Sie Ihr Training!
        </p>
      </div>

      <FilterBar onFilterChange={setFilters} />

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Laden...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <SplitList splits={splits} />
      )}
    </Container>
  )
}

export default SplitsPage

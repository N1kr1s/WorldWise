import { createContext, useContext, useState } from 'react'
import { allCities } from '../data/cities'
const CitiesContext = createContext()

function CitiesProvider({ children }) {
  const [cities, setCities] = useState(allCities)
  const [currentCity, setCurrentCity] = useState({})

  const getCity = (id) => {
    setCurrentCity(cities.find((city) => city.id === parseInt(id)))
  }

  const addCity = (newCity) => {
    setCities((cities) => [...cities, newCity])
  }

  const removeCity = (id) => {
    setCities((cities) => cities.filter((city) => city.id !== id))
  }

  return (
    <CitiesContext.Provider
      value={{ cities, currentCity, getCity, addCity, removeCity }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider')
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities }

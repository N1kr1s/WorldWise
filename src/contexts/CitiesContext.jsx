import { createContext, useState } from 'react'
import { allCities } from '../data/cities'
const CitiesContext = createContext()

function CitiesProvider({ children }) {
  const [cities] = useState(allCities)

  return (
    <CitiesContext.Provider value={{ cities }}>
      {children}
    </CitiesContext.Provider>
  )
}

export { CitiesProvider }

import { createContext, useContext, useReducer, useState } from 'react'
import { allCities } from '../data/cities'
const CitiesContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'GET_CITY':
      const city = state.cities.find(
        (city) => city.id === parseInt(action.payload)
      )
      return { ...state, currentCity: city }

    case 'ADD_CITY':
      return { ...state, cities: [...state.cities, action.payload] }

    case 'REMOVE_CITY':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      }

    default:
      return state
  }
}

const initialState = {
  cities: allCities,
  currentCity: {},
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CitiesContext.Provider value={{ ...state, dispatch }}>
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

export { CitiesProvider, useCities }

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'

function App() {
  return (
    <CitiesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<CityList cities={cities} />} />
            <Route path='countries' element={<CountryList cities={cities} />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </CitiesProvider>
  )
}

export default App

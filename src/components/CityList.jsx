import { useCities } from '../contexts/CitiesContext'
import CityItem from './CityItem'
import styles from './CityList.module.css'

function CityList() {
  const { cities } = useCities()

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  )
}

export default CityList

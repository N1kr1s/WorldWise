import { useMemo } from 'react'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'

function CountryList({ cities }) {
  const countries = useMemo(
    () =>
      cities
        .map((city) => ({
          country: city.country,
          emoji: city.emoji,
          id: city.id,
        }))
        .reduce((acc, cur) => {
          if (!acc.map((el) => el.country).includes(cur.country)) {
            return [...acc, cur]
          } else {
            return acc
          }
        }, []),
    [cities]
  )

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  )
}

export default CountryList

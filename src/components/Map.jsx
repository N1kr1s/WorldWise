import { useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities()
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation()
  const [mapLat, mapLng] = useUrlPosition()

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng])
    }
  }, [mapLat, mapLng])

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {cities.map((city) => {
          const { id, position, emoji, cityName } = city
          return (
            <Marker position={[position.lat, position.lng]} key={id}>
              <Popup>
                <span>{emoji}</span> <span>{cityName}</span>
              </Popup>
            </Marker>
          )
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

//Updates the center of the map to the specified position.
function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng
      navigate(`form?lat=${lat}&lng=${lng}`)
    },
  })
}
export default Map

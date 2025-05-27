import React, { useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Navbar from './Navbar'
import '../styles/LocationSection.css'
import pizzaIconImg from '../pictures/pizza.png' // adjust path if needed

const pizzaIcon = new L.Icon({
  iconUrl: pizzaIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function LocationSection() {
  const position = [16.484645, 121.158450] // Bayombong, Nueva Vizcaya
  const popupRef = useRef();

  // Show popup on marker hover
  const handleMarkerMouseOver = () => {
    if (popupRef.current) {
      popupRef.current.openOn(popupRef.current._map);
    }
  };
  const handleMarkerMouseOut = () => {
    if (popupRef.current) {
      popupRef.current._close();
    }
  };

  return (
    <>
      <Navbar />
      <div className="location-page">
        <div className="location-header-row">
          <div>
            <div className="location-title">ZaHaus</div>
          </div>
          <div className="location-description">
            ZaHouse is a modern, community-driven dining spot that blends urban comfort with a creative culinary twist. Whether you're craving flavorful meals, casual vibes, or a cozy place to hang out, ZaHouse serves up a fresh, welcoming experience for everyone.
          </div>
        </div>
        <div className="location-map-row">
          <MapContainer center={position} zoom={16} scrollWheelZoom={false} className="location-leaflet-map">
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={position}
              icon={pizzaIcon}
              eventHandlers={{
                mouseover: handleMarkerMouseOver,
                mouseout: handleMarkerMouseOut,
              }}
            >
              <Popup ref={popupRef}>
                We are here! <br /> Bayombong, Nueva Vizcaya, Philippines
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="location-info-row">
          <div className="location-info-col">
            <div className="location-info-label">ADDRESS</div>
            <div className="location-info-value">
              Aglipay Extension, Don Mariano Marcos,<br />
              Bayombong, Nueva Vizcaya 32746
            </div>
          </div>
          <div className="location-info-col">
            <div className="location-info-label">CONTACT INFORMATION</div>
            <div className="location-info-value">
              Phone: 0939-737-4249
            </div>
          </div>
          <div className="location-info-col">
            <div className="location-info-label">OPEN TIME</div>
            <div className="location-info-value">
              Monday to Saturday <br />
              10:00 AM - 10:00 PM
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LocationSection
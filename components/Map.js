import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";

const _ico = require("./icon.png");

const Icon = new L.Icon({
  iconUrl: _ico,
  iconRetinaUrl: _ico,
  iconAnchor: null,
  popupAnchor: [-0, -0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(48, 48),
  className: "leaflet-div-icon",
});
export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

const _data = [
  {
    lat: 43.6289624,
    long: -79.5737505,
    name: "Chair",
    address: "1 Thomas Street",
    time: Date.now(),
  },
  {
    lat: 43.5454678,
    long: -79.7446762,
    name: "Sofa",
    address: "3675 Thomas Street",
    time: Date.now(),
  },
];

/**
 * {
 *  lat: 123,
 *  long: 123,
 *  name: '',
 *  address: '',
 *  time: '',
 * }
 */

import icon from "./icon.png";
console.log(icon);
const MarkerWrapper = (props) => {
  const { lat, long, name, address, time } = props;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: icon.src,
    iconUrl: icon.src,
    shadowUrl: icon.src,
  });

  return (
    <Marker position={[lat, long]}>
      <Popup>
        {name} at: {address}, Posted on {new Date(time).toString()}
      </Popup>
    </Marker>
  );
};

const Address = (props) => {
  const { lat, long, name, address, time } = props;

  const date = new Date(time).toDateString();

  const handleClick = () => {};

  return (
    <div id="address-click" onClick={handleClick}>
      <div id="address-name">{name}</div>
      <div id="address-title">{address}</div>
      <div id="address-time">{date}</div>
    </div>
  );
};

const AddressBox = (props) => {
  const { data } = props;

  return (
    <div id="address-box">
      {data.map(({ lat, long, name, address, time }, i) => (
        <Address
          lat={lat}
          long={long}
          name={name}
          address={address}
          time={time}
          key={i}
        />
      ))}
    </div>
  );
};

const AddArea = (props) => {
  const { addPoint } = props;

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const onClick = () => {
    addPoint({ name, city, address });
  };

  return (
    <div id="add-area">
      <div id="add-title">List An Item</div>
      <input
        value={name}
        id="name-input"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        id="city-input"
        value={city}
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
      ></input>
      <input
        id="address-input"
        value={address}
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      ></input>
      <div id="button" onClick={onClick}>
        List Item
      </div>
    </div>
  );
};

export default function Map(props) {
  const [data, setData] = useState(_data);

  const center = [43.6289624, -79.5737505];
  const mapRef = useRef();

  const addPoint = ({ name, address, city }) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )},+${encodeURIComponent(city)}&format=json&polygon=1&addressdetails=1`
      )
      .then((res) => {
        setData([
          ...data,
          {
            lat: res.data[0].lat,
            long: res.data[0].lon,
            name,
            address,
            time: Date.now(),
          },
        ]);
      });
  };

  return (
    <div id="map-sidebar-wrapper">
      <AddressBox data={data} />
      <div id="map-wrapper">
        <MapContainer center={center} zoom={12} style={{ height: "80vh" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map(({ lat, long, name, address, time }, i) => (
            <MarkerWrapper
              lat={lat}
              long={long}
              name={name}
              address={address}
              time={time}
              key={i}
            />
          ))}
          <ChangeView coords={center} />
        </MapContainer>
      </div>
      <AddArea addPoint={addPoint} />
    </div>
  );
}

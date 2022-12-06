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

export { Icon };

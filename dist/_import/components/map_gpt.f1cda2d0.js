import L from "../../_npm/leaflet@1.9.4/d8a0af43.js";
import { Mutable } from "../../_observablehq/stdlib.10504731.js";

// Create the mutable and export it
export const selectedMarker = Mutable({});

export function createMap(element, center = [51.505, -0.09], zoom = 13) {
  // Create a map instance
  const map = L.map(element).setView(center, zoom);

  // Add a tile layer (you can change this to any other tile provider)
  L.tileLayer(
    "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=b3999cf9184e48448e1b44b0f9591f58",
    {
      attribution:
        '<a href="https://www.openstreetmap.org/copyright">Data &copy; OpenStreetMap</a>, <a href="http://www.thunderforest.com">Maps &copy; Thunderforest </a>',
    }
  ).addTo(map);

  return map;
}

export function addMarkers(map, markers) {
  markers.forEach((marker) => {
    L.marker(marker.position)
      .addTo(map)
      .bindPopup(marker.popupContent)
      .on("click", () => {
        selectedMarker.value = marker;
      });
  });
}

export function initializeMap(element, center, zoom, markers) {
  const map = createMap(element, center, zoom);
  addMarkers(map, markers);
  return map;
}

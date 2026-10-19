import "../lib/maplibreSetup";
import type { MapEventType } from "maplibre-gl";
import Map, { NavigationControl, ScaleControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

/** Demo center — adjust to your agency AOI in real apps. */
const INITIAL_VIEW = {
  longitude: 120.9842,
  latitude: 14.5995,
  zoom: 11,
};

const DEMO_STYLE = "https://demotiles.maplibre.org/style.json";

function handleMapLoad(event: MapEventType["load"]) {
  event.target.resize();
  requestAnimationFrame(() => event.target.resize());
}

export default function GisMapCanvas() {
  return (
    <Map
      initialViewState={INITIAL_VIEW}
      mapStyle={DEMO_STYLE}
      style={{ width: "100%", height: "100%" }}
      attributionControl={{ compact: true }}
      onLoad={handleMapLoad}
    >
      <NavigationControl position="top-right" visualizePitch showCompass={false} />
      <ScaleControl position="bottom-left" maxWidth={100} unit="metric" />
    </Map>
  );
}

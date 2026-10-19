import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";

/** Required for reliable MapLibre workers under Vite (dev + production). */
setWorkerUrl(workerUrl);

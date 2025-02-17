"use client";

import React from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

type Props = {};

function CustomMap({}: Props) {
  const position = { lat: 12.602374534612647, lng: -8.032967880449931 };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
  const mapID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!;

  return (
    <APIProvider apiKey={apiKey}>
      <div className="custom_map_wrapper">
        <Map zoom={15} center={position} mapId={mapID}>
          <AdvancedMarker position={position}></AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}

export default CustomMap;

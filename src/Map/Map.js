import React, { useRef, useState, useEffect } from "react";
import * as ol from 'ol';

import "./Map.css";
import MapContext from './MapContext';

const MyMap = ({ children, zoom, center }) => {
	const mapRef = useRef();

	const [map, setMap] = useState(null);

	// ON component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);
		
		return () => mapObject.setTarget(undefined);
	}, []);

	// Zoom change handler
	useEffect(() => {
		if(!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// Center change handler
	useEffect(() => {
		if(!map) return;
		
		map.getView().setCenter(center);
	}, [center]);
	
	return(
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} className="ol-map">
				{children}
			</div>
		</MapContext.Provider>
	)
}


export default MyMap;
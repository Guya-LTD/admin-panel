import React, { useEffect, useState, useMemo } from 'react';
import HomeLayout from 'pages/home/Index';
import {
    PanelContainer,
    PanelContainerHeader,
    PanelContainerBody,
    PanelContainerFooter,
    PanelContainerView
} from '@bit/guya-ltd.gcss.templates.panel';
import {
    Search as SearchIcon,
    SettingsOutline,
    CreateOutline
} from 'react-ionicons-icon';
import Tip from '@bit/guya-ltd.gcss.atoms.tip';
import Search from '@bit/guya-ltd.gcss.atoms.search';
import Typography from '@bit/guya-ltd.gcss.atoms.typography';
import { useFetch, useAsync } from 'react-async';
import { Link as RouterLink } from "react-router-dom";
import I18n from 'I18n';
import TableContainer from 'pages/TableContainer';
import Cookies from 'universal-cookie';
import { Icon, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat, get } from 'ol/proj';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import Map from 'Map';
import { Layers, TileLayer, VectorLayer } from 'Map/Layers';
import { osm, vector } from "Map/Source";
import { Controls, FullScreenControl } from 'Map/Controls';
import io from "socket.io-client";

const { REACT_APP_API_GATEWAY } = process.env;
const USERS_URL = REACT_APP_API_GATEWAY + '/api/v1/users';


let socket;

const List = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;
    
    const cookies = new Cookies();

    //const [center, setCenter] = useState([38.7578, 8.9806]);

    const [center, setCenter] = useState([38.744268, 9.012839]);
	
	const [zoom, setZoom] = useState(15);

	const [showLayer1, setShowLayer1] = useState(true);

	const [showLayer2, setShowLayer2] = useState(true);

	var icon = new Icon({
		color: '#BADA55',
        crossOrigin: 'anonymous',
        imgSize: [50, 50],
        src: process.env.PUBLIC_URL + '/car-placeholder.svg',
	}) 

	var style = new Style({
		image: icon
	})

	var feature0 = new Feature({
		geometry: new Point(fromLonLat([38.744320000, 9.012860000])),
	})
    feature0.setStyle(style)
    
    var feature1 = new Feature({
		geometry: new Point(fromLonLat([38.744630000, 9.012910000])),
	})
    feature1.setStyle(style)
    
    var feature2 = new Feature({
		geometry: new Point(fromLonLat([38.744890000, 9.013020000])),
	})
	feature2.setStyle(style)

	//var vectorSource = new VectorSource({features: [feature]})

    const [allFeatures, setAllFeatures] = useState({
        'admin0': {
            feature: feature0
        },
        'admin1': {
            feature: feature1
        },
        'admin2': {
            feature: feature2
        },
    });

    const [features, setFeatures] = useState([
        feature0, feature1, feature2
    ]);

    const [vectorSource, setVectorSource] = useState(new VectorSource({features: features}));

	function updateCoordinate(id, item) { 
		// Structure of the input Item
		// {"Coordinate":{"Longitude":80.2244,"Latitude":12.97784}}
		var featureToUpdate = allFeatures[id]['feature'];
	
		var coord = fromLonLat([item.Coordinate.Longitude, item.Coordinate.Latitude]);
	
		featureToUpdate.getGeometry().setCoordinates(coord);
	}
    
    useEffect(() => {
        var userQuery = 'name=' + cookies.get('name') + '&type=driver'; 
        socket = io('http://127.0.0.1:60012/', {query: userQuery})

        socket.emit('driver:connection:join');

        socket.emit('count:total');
    })

    useEffect(() => {
        socket.on('tracking', message => {
            console.log(message);
            var item = {};
            item.id = allFeatures[message.name]['feature'].getId;
            item.Coordinate = {};
            item.Coordinate.Longitude = message.longitude;
            item.Coordinate.Latitude = message.latitude;
            updateCoordinate(message.name, item);
        })
    })



    return (
        <HomeLayout locale={locale} route_location='/home/tracking'>
            <PanelContainer>
            <div>
                            <Map center={fromLonLat(center)} zoom={zoom}>
                                <Layers>
                                    <TileLayer source={osm()} zIndex={0} />
                                    <VectorLayer source={vectorSource}  />
                                </Layers>
                                <Controls>
                                    <FullScreenControl />
                                </Controls>
                            </Map>
                        </div>
                
            </PanelContainer>
        </HomeLayout>
    )
}

export default List;
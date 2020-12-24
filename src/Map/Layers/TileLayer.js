import { useContext, useEffect } from 'react';
import OLTileLayer from 'ol/layer/Tile';

import MapContext from '../MapContext';

const TileLayer = ({ source, zIndex = 0 }) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if(!map) return;

        let titleLayer = new OLTileLayer({
            source,
            zIndex
        });

        map.addLayer(titleLayer);
        titleLayer.setZIndex(zIndex);

        return () => {
            if(map) map.removeLayer(titleLayer);
        };
    }, [map])

    return null;
}

export default TileLayer;
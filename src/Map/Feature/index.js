import { useContext, useEffect } from 'react';
import OLFeature from 'ol/Feature';

import MapContext from '../MapContext';

const Feature = ({ geometry, style }) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if(!map) return;

        let feature = new OLFeature({
            geometry
        });

        feature.setStyle(style);
    }, [map])

    return null;
}

export default Feature;
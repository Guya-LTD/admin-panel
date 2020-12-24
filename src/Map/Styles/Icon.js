import OLIcon from 'ol/style/Icon';

const Icon = ({
    color,
    crossOrigin,
    imgSize,
    src
}) => {
    let icon = new OLIcon({
        color,
        crossOrigin,
        imgSize,
        src
    });

    return icon;
}

export default Icon;
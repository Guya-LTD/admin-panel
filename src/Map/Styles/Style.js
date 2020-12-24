import OLStyle from 'ol/style/Style';

const Style = ({ image }) => {

    let olstyle = new OLStyle({
        image
    });

    return olstyle;
}

export default Style;
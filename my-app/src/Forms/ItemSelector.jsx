import { useEffect, useState } from "react";
import ISMenu from "../Components/RCMenu/ISMenu";

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

const ItemSelector = (props) => {


    const [formJson, setFormJson] = useState({

        nombre: "",

        descripcion: ""

    });



    const [itemsToDisplay, setItemsToDisplay] = useState([]);

    useEffect(() => {
        props.loadData(setItemsToDisplay);

    }, [props]);


    return (<>
        <h3>Crear diagnostico</h3>
        <div className="ph__flex-row">
            <label htmlFor="" style={{ width: "100%" }}>
                <p>
                    Nombre del diagnostico
                </p>
                <input
                    type="text"
                    value={formJson.nombre}
                    placeholder="Nombre"
                    style={{ width: "100%" }}
                    onChange={e => setFormJson({ ...formJson, nombre: e.target.value })} />
            </label>
        </div>
        <div className="ph__flex-column list__container">
            {itemsToDisplay.map(e => {
                return (<div className="list__item" key={e._id} onClick={() => props.handleAddDiagnostico(e)}>
                    <div className="list__item-top">
                        <div className="title" style={{ backgroundColor: e.color }}>
                            <p style={{ color: invertColor(e.color, true) }}>{e.nombre}</p>
                            <p style={{ color: invertColor(e.color, true), opacity: 0.3 }}>#{e.codigo}</p>
                        </div>
                        <ISMenu id={e._id} />
                    </div>
                    <p className="list__item-description">{e.descripcion}</p>
                </div>
                )
            })}
        </div>
        <div className="buttons">
            <input type="button" value="Cancelar" onClick={e => { props.setModalType(0) }} />
            <input type="button" value="Crear" onClick={e => { props.setModalType(props.selectorType) }} />
        </div>
    </>);
}

export default ItemSelector;
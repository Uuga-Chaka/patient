import { useEffect, useState } from "react";

const ItemSelector = (props) => {


    const [formJson, setFormJson] = useState({

        nombre: "",

        descripcion: ""

    });


    const [itemsToDisplay, setItemsToDisplay] = useState([]);


    useEffect(() => {
        props.loadData(setItemsToDisplay);
    }, [props])


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
                return (<div className="list__item">
                    <div className="list__item-top">
                        <div className="title" style={{ backgroundColor: "red" }}>
                            <p>Diagnoistico</p>
                            <p>#754</p>
                        </div>
                        <div className="menu">
                            <img src={process.env.PUBLIC_URL + "icons/ic_menulight.svg"} alt="" />
                        </div>
                    </div>
                    <p className="list__item-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique tellus sed nunc elementum, vel posuere erat euismod. Aenean nulla sapien, consequat et ultrices dictum, ornare vitae turpis. Praesent mollis scelerisque diam sed molestie. Etiam a volutpat ante. Phasellus rutrum neque in ipsum dapibus, in varius turpis commodo. Integer ligula eros, semper ut tincidunt vitae, maximus accumsan mi. Mauris eleifend, nibh vitae egestas venenatis, elit ligula rhoncus elit, sit amet congue massa ipsum at risus. Pellentesque congue tellus eget nisi fringilla, eget euismod nisi egestas.
                </p>
                </div>
                )
            })}
        </div>
        <div className="buttons">
            <input type="button" value="Cancelar" onClick={e => props.setModalType(0)} />
            <input type="button" value="Crear" onClick={e => props.setModalType(props.selectorType)} />
        </div>
    </>);
}

export default ItemSelector;
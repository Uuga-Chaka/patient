import { useState } from "react";

const CrearDescripcion = (props) => {

    const [formJson, setFormJson] = useState({
        nombre: "",
        descripcion: ""
    });

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
        <div className="ph__flex-column">
            <p>Descripción del diagnostico</p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="buttons">
            <input type="button" value="Cancelar" onClick={e => props.setModalType(0)} />
            <input type="button" value="Guardar" onClick={e => console.log('clicked')} />
        </div>
    </>);
}

export default CrearDescripcion;
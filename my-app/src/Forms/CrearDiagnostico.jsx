import { useState } from "react";

const CrearDiagnostico = (props) => {

    const [formJson, setFormJson] = useState({
        nombre: "",
        codigo: "",
        color: "#FFFFFF",
        descripcion: ""
    });

    return (<>
        <h3>Crear diagnostico</h3>
        <div className="ph__flex-row color">
            <label htmlFor="">
                <p>
                    Nombre del diagnostico
                </p>
                <input
                    type="text"
                    value={formJson.nombre}
                    placeholder="Nombre"
                    onChange={e => setFormJson({ ...formJson, nombre: e.target.value })} />
            </label>
            <label htmlFor="">
                <p>
                    Código
                </p>
                <input
                    type="text"
                    value={formJson.codigo}
                    placeholder="598"
                    onChange={e => setFormJson({ ...formJson, codigo: e.target.value })} />
            </label>
            <label htmlFor="">
                <p>
                    Color
                </p>
                <div className="color__container">
                    <input type="color" value={formJson.color} onChange={e => setFormJson({ ...formJson, color: e.target.value })} />
                </div>
            </label>
        </div>
        <div className="ph__flex-column">
            <p>Descripción del diagnostico</p>
            <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={formJson.descripcion}
                onChange={e => setFormJson({ ...formJson, descripcion: e.target.value })}></textarea>
        </div>
        <div className="buttons">
            <input type="button" value="Cancelar" onClick={e => props.setModalType(0)} />
            <input type="button" value="Guardar" onClick={e => props.create(formJson)} />
        </div>
    </>);
}

export default CrearDiagnostico;
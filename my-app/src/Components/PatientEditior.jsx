import ic_close from "../icons/ic_close.svg"
import ic_id from "../icons/ic_id.svg"
import ic_calendar from "../icons/ic_calendar.svg"
import ic_add from "../icons/ic_add.svg"

import SesionDescription from "./SesionDescription"

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


const Tab = ({ nombre, handleTabChange, index, handleTabClosing, id }) => {
    return (<div className="patientTab-single active" title="Juan Pablo Gallego Arias" onClick={() => handleTabChange(index)}>
        <p>
            {nombre.substring(0, 22)}
            {nombre.length > 21 && "..."}
        </p>
        <img src={ic_close}
            alt="close tab"
            onClick={e => {
                e.stopPropagation();
                handleTabClosing(id);
            }}
        />
    </div>)
}

const PatientEditor = ({ openTabs, currentTab, handleHistoryEdit, handleSesionEdit, handleTabChange, handleTabClosing, handleModalType, handleRemoveDiagnostico, handleDeleteSesion }) => {


    return (
        <div className="patient-container">
            <div className="patientTab-container">
                {openTabs.map((e, i) => {
                    return <Tab
                        handleTabClosing={handleTabClosing}
                        nombre={e.nombre}
                        handleTabChange={handleTabChange}
                        index={i}
                        id={e._id}
                        key={'tab-' + e._id}
                    />
                })}
            </div>
            <div className="patientInfo-container">
                <div className="history-container">
                    <input
                        className="patient__name"
                        type="text"
                        name="nombre"
                        style={{ width: (openTabs[currentTab].nombre.length - 1) + "ch" }}
                        value={openTabs[currentTab].nombre}
                        onChange={e => {
                            handleHistoryEdit(currentTab, e.target.name, e.target.value)
                        }} />
                    <div className="patient-data__input">
                        <img src={ic_id} alt="" />
                        <select
                            name="tipo_documento"
                            id=""
                            onChange={e => handleHistoryEdit(currentTab, e.target.name, e.target.value)}
                            value={openTabs[currentTab].tipo_documento}>
                            <option value="CC">CC</option>
                            <option value="CE">CE</option>
                        </select>
                        <input
                            type="text"
                            name="numero_documento"
                            onChange={e => {
                                handleHistoryEdit(currentTab, e.target.name, e.target.value)
                            }}
                            value={openTabs[currentTab].numero_documento}
                        />
                    </div>
                    <div className="patient-data__input">
                        <img src={ic_calendar} alt="" />
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={openTabs[currentTab].fecha_nacimiento}
                            onChange={e => {
                                handleHistoryEdit(currentTab, e.target.name, e.target.value)
                            }}
                        />
                    </div>
                    <textarea
                        name="descripcion"
                        placeholder="Historia clínica"
                        value={openTabs[currentTab].descripcion}
                        onChange={e => {
                            handleHistoryEdit(currentTab, e.target.name, e.target.value)
                        }}
                    >{openTabs[currentTab].descripcion}</textarea>
                </div>
                <div className="sesions-container">
                    <p className="diagnostico-title">Diagnostico</p>
                    <div className="diagnostico-container">
                        <div className="diagnostico-items">
                            {openTabs[currentTab].diagnosticos.map((e, i) => {
                                return <div
                                    className="diagnostico-item"
                                    key={e._id ? e._id : i}
                                    style={{ backgroundColor: e.color }}
                                >
                                    <div className="d-left">
                                        <img className="diagnostico-close" onClick={() => handleRemoveDiagnostico(e._id)} src={ic_close} alt="close" />
                                        <p className="diagnostico-nombre"
                                            style={{ color: invertColor(e.color, true) }}>{e.nombre}</p>
                                    </div>
                                    <p className="diagnostico-number"
                                        style={{ color: invertColor(e.color, true) }}>#{e.codigo}</p>
                                </div>
                            })}
                        </div>
                        <img className="diagnostico-add" onClick={() => handleModalType('isS')} alt="add description" src={ic_add} />
                    </div>
                    <div className="sesiones-contador__container">
                        <p>Sesiones</p>
                        <div className="sesion-quantity__container">
                            {/* aqu'i se repite la cantidad de sesiones que abr'a */}
                            {
                                openTabs[currentTab].sesiones.map((e, i) => {
                                    return (<div className="sesion-quantity__display" key={e._id ? e._id : i}></div>)
                                })
                            }

                        </div>
                        <p>2/7</p>
                    </div>
                    <div className="sesions__description-container">
                        {
                            openTabs[currentTab].sesiones.map((e, i) => {
                                return (<SesionDescription
                                    value={e}
                                    key={e._id ? e._id : i}
                                    sesionIndex={i}
                                    currentTab={currentTab}
                                    handleDeleteSesion={handleDeleteSesion}
                                    handleSesionEdit={handleSesionEdit} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientEditor;
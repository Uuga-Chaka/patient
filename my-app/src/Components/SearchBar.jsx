import ic_search from "../icons/ic_search.svg";
import ic_filter from "../icons/ic_filter.svg";
import ic_add from "../icons/ic_add.svg";
import ic_add_patient from "../icons/ic_add-patient.svg";
import ic_close from "../icons/ic_close.svg"

import { useState } from "react";
import PatientListItem from "./PatientListItem";

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

const SearchBar = (props) => {

    var [isFilterVisible, setFilterVisibility] = useState(false);

    return (<div className="searchBar-container">
        <div className="searchBar__search-container">
            <div className="search__input">
                <img src={ic_search} alt="" />
                <input
                    type="text"
                    id=""
                    placeholder="Buscar"
                    name="nombre"
                    value={props.filter.nombre}
                    onChange={e => props.handleFilterChange(e.target.name, e.target.value)} />
                <img src={ic_filter} alt="" />
            </div>
            <div className="searchBar__filters">
                <div className="allfilters" style={isFilterVisible ? { display: "block" } : { display: "none" }}>
                    <label htmlFor="" className="filter">
                        <p>Tipo de D.I.</p>
                        <input type="text" value={props.filter.tipo_documento} name="tipo_documento" onChange={e => props.handleFilterChange(e.target.name, e.target.value)} />
                    </label>
                    <label htmlFor="" className="filter">
                        <p>
                            Número de D.I.
                    </p>
                        <input type="text" value={props.filter.numero_documento} name="numero_documento" onChange={e => props.handleFilterChange(e.target.name, e.target.value)} />
                    </label>
                    <div className="filter__diagnostico">
                        <div className="ph__flex-row add_diagnosis">
                            <p>Diagnostico </p>
                            <div className="circle-icon" onClick={() => { props.handleModalType('isSf') }}>
                                <img src={ic_add} alt="" className="rotate" />
                            </div>
                        </div>
                        <div className="diagnosticos">
                            {props.filter.diagnosticos.map((e, i) => {
                                return (
                                    <div
                                        className="diagnostico-item"
                                        key={e._id ? e._id : i}
                                        style={{ backgroundColor: e.color }}
                                    >
                                        <div className="d-left">
                                            <img className="diagnostico-close" onClick={() => props.handleFilterDiagnosticRemove(e._id)} src={ic_close} alt="close" />
                                            <p className="diagnostico-nombre"
                                                style={{ color: invertColor(e.color, true) }}>{e.nombre}</p>
                                        </div>
                                        <p className="diagnostico-number"
                                            style={{ color: invertColor(e.color, true) }}>#{e.codigo}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <label htmlFor="morefilter" className="more" id="show__filters">
                    {isFilterVisible ?
                        <p>- Menos filtros</p>
                        :
                        <p>+ Más filtros</p>
                    }
                    <input type="checkbox" name="morefilter" id="morefilter" checked={isFilterVisible} onChange={e => setFilterVisibility(e.target.checked)} />
                </label>
            </div>
        </div>
        <div className="create-patient" onClick={() => props.crearPaciente()}>
            <img src={ic_add_patient} alt="" />
            <p  >Crear nuevo paciente</p>
        </div>
        <div className="searchBar-patients__container">
            <>
                {props.patients.map((patient) => <PatientListItem
                    key={'pli-' + patient._id}
                    patientId={patient._id}
                    patient={patient}
                    handleTabOpening={props.handleTabOpening}
                    handleMenuOpening={props.handleMenuOpening}
                    handlePLIMenuActions={props.handlePLIMenuActions}
                />)}
            </>
        </div>
    </div>
    );
}

export default SearchBar;
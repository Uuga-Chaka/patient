import { useState } from "react";
import PatientListItem from "./PatientListItem";

const SearchBar = (props) => {

    var [isFilterVisible, setFilterVisibility] = useState(false);

    return (<div className="searchBar-container">
        <div className="searchBar__search-container">
            <div className="search__input">
                <img src={process.env.PUBLIC_URL + "./icons/ic_search.svg"} alt="" />
                <input type="text" name="" id="" placeholder="Buscar" />
                <img src={process.env.PUBLIC_URL + "./icons/ic_filter.svg"} alt="" />
            </div>
            <div className="searchBar__filters">
                <div className="allfilters" style={isFilterVisible ? { display: "block" } : { display: "none" }}>
                    <label htmlFor="" className="filter">
                        <p>
                            Tipo de D.I.
                    </p>
                        <input type="text" />
                    </label>
                    <label htmlFor="" className="filter">
                        <p>
                            Número de D.I.
                    </p>
                        <input type="text" />
                    </label>
                    <div className="filter__diagnostico">
                        <div className="ph__flex-row add_diagnosis">
                            <p>Diagnostico </p>
                            <div className="circle-icon">
                                <img src={process.env.PUBLIC_URL + "./icons/ic_add.svg"} alt="" className="rotate" />
                            </div>
                        </div>
                        <div className="diagnosticos">
                            <div className="diagnostico"></div>
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
            <img src={process.env.PUBLIC_URL + "./icons/ic_add-patient.svg"} alt="" />
            <p className="clr-dark" >Crear nuevo paciente</p>
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
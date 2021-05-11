import SesionDescription from "./SesionDescription"


const Tab = ({ nombre, handleTabChange, index, handleTabClosing, id }) => {
    return (<div className="patientTab-single active" title="Juan Pablo Gallego Arias" onClick={() => handleTabChange(index)}>
        <p>
            {nombre.substring(0, 22)}
            {nombre.length > 21 && "..."}
        </p>
        <img src={process.env.PUBLIC_URL + "icons/ic_close.svg"}
            alt="close tab"
            onClick={e => {
                e.stopPropagation();
                handleTabClosing(id);
            }}
        />
    </div>)
}

const PatientEditor = ({ openTabs, currentTab, handleHistoryEdit, handleSesionEdit, handleTabChange, handleTabClosing }) => {


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
                        <img src={process.env.PUBLIC_URL + "icons/ic_id.svg"} alt="" />
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
                        <img src={process.env.PUBLIC_URL + "icons/ic_calendar.svg"} alt="" />
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
                                return <div className="diagnostico-item" key={e._id ? e._id : i}>
                                    <div className="d-left">
                                        <img className="diagnostico-close" src={process.env.PUBLIC_URL + "icons/ic_close.svg"} alt="close" />
                                        <p className="diagnostico-nombre">Diagnostico</p>
                                    </div>
                                    <p className="diagnostico-number">#703</p>
                                </div>
                            })}
                        </div>
                        <img className="diagnostico-add" alt="add description" src={process.env.PUBLIC_URL + "icons/ic_add.svg"} />
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
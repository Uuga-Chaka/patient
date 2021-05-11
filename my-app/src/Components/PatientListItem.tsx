const PatientListItem = ({ handlePLIMenuActions, patient, handleTabOpening, handleMenuOpening, patientId }) => {
    return (<div
        className="searchBar-patients__item"
        onContextMenu={(e) => {
            handleMenuOpening(
                handlePLIMenuActions(),
                { x: e.clientX, y: e.clientY },
                patient._id
            )
        }}
        onClick={(e) => {
            handleTabOpening(patient._id);
        }}>
        <h1 className="searchBat-patient__name clr-dark_blue fnt-bold">
            {patient.nombre}
        </h1>
        <p className="searchBat-patient__di clr-whiteblue">{patient.numero_documento}</p>
    </div>);
}

export default PatientListItem;
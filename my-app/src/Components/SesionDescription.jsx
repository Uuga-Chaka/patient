import ic_calendar from "../icons/ic_calendar.svg";
import ic_arrow_down from "../icons/ic_arrow-down.svg";


import React, { useEffect, useState, useRef } from "react";
import ISMenu from "./RCMenu/ISMenu";

const SesionDescription = ({ value, currentTab, sesionIndex, handleSesionEdit, handleDeleteSesion, handleModalType }) => {


    const [textAreaSize, setTextAreaSize] = useState('auto')
    const textAreaRef = useRef(null);
    const [textAVisibility, setTextAVisibility] = useState(true);

    useEffect(() => {
        setTextAreaSize(`${textAreaRef.current.scrollHeight}px`)
    }, []);

    const styleTA = {
        height: textAreaSize
    }

    return (
        <div className="sesion__container">
            <div className="sesion__header">
                <div className="sesion__header-action">
                    <img className="calendar" src={ic_calendar} alt="" />
                    <input
                        type="date"
                        name="fecha"
                        value={value.fecha}
                        onChange={e => handleSesionEdit(currentTab, sesionIndex, e.target.name, e.target.value)} />
                </div>
                <div className="sesion__header-action">
                    <p>Día #</p>
                    <ISMenu
                        id={value._id}
                        index={sesionIndex}
                        handleRemove={handleDeleteSesion}
                        handleModalType={handleModalType}
                    // itemsToDisplay={itemsToDisplay}
                    // setItemsToDisplay={setItemsToDisplay}
                    />
                </div>
            </div>
            <textarea
                ref={textAreaRef}
                style={styleTA}
                value={value.info}
                rows={1}
                name="info"
                className={!textAVisibility ? "ph__display-none" : "sesion__textarea"}
                onChange={(e) => {
                    setTextAreaSize('auto');
                    // setSesionDescription(e.target.value);
                    handleSesionEdit(currentTab, sesionIndex, e.target.name, e.target.value)
                }}></textarea>
            <label
                className={!textAVisibility ? "sesion__bottom close" : "sesion__bottom open"}
                // htmlFor="cb-visibility"
                style={{ position: 'relative' }}>
                <p>
                    {!textAVisibility ? "Mostrar más" : "Mostrar  menos"}
                </p>
                <img src={ic_arrow_down} alt="" />
                <input
                    checked={textAVisibility}
                    value={textAVisibility}
                    className="cb__visibility-none"
                    type="checkbox"
                    // id="cb-visibility"
                    onChange={e => {
                        console.log(value)
                        setTextAVisibility(e.target.checked)
                    }} />
            </label>
        </div>
    );
}

export default SesionDescription;
import { useEffect, useRef, useState } from "react";



const ISMenu = (props) => {

    const menuRef = useRef(null);

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {

        const closeMenu = (e) => {

            if (menuRef !== null) {

                if (!menuRef.current.contains(e.target)) {

                    setShowMenu(false);

                }
            }

        }

        window.addEventListener('click', closeMenu, true);

        return () => {

            window.removeEventListener('click', closeMenu, true)

        }

    }, [props]);

    return (<div className="menu"
        onClick={e => { e.stopPropagation(); setShowMenu(true) }}>
        <img src={process.env.PUBLIC_URL + "icons/ic_menulight.svg"} alt="menu" />
        <div className="menu__container PLIMenu"
            ref={menuRef}
            onClick={e => e.stopPropagation()}
            style={{ display: showMenu ? 'block' : 'none' }}>
            <div className="PLIMenu_action" onClick={() => props.handleRemove(props.id, props.setItemsToDisplay, props.itemsToDisplay)}>
                <p >Eliminar</p>
            </div>
            <div className="PLIMenu_action" onClick={() => console.log('editar')}>
                <p>Editar</p>
            </div>
        </div>
    </div >);
}

export default ISMenu;

const PLIMenu = ({ menuRef, actions }) => {



    return (<div
        className="PLIMenu"
        ref={menuRef}
        style={{
            position: 'fixed',
            zIndex: 99,
            top: actions.mousePos.y,
            left: actions.mousePos.x,
            display: actions.isOpen ? 'block' : 'none'
        }}>
        {actions.actions.map((e, i) => {
            return <div className="PLIMenu_action"
                key={i}
                onClick={() => e.action(actions.args)}>
                <p >{e.actionName}</p>
            </div>
        })}
    </div>);
}

export default PLIMenu;
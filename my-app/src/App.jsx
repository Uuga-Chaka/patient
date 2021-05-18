import ic_addsesion from "./icons/ic_addsesion.svg";
import ic_minimize from "./icons/ic_minimize.svg";
import ic_maximize from "./icons/ic_maximize.svg";
import ic_quit from "./icons/ic_quit.svg";

import React, { Component } from 'react';
import './index.css';
import PatientEditor from './Components/PatientEditior';
import SearchBar from './Components/SearchBar';
import Modal from './Components/Modal';
import CrearDiagnostico from './Forms/CrearDiagnostico';
import CrearDescripcion from './Forms/CrearDescripcion';
import ItemSelector from './Forms/ItemSelector';
import PLIMenu from './Components/RCMenu/PLIMenu';
const { ipcRenderer } = window.require('electron');


// import { ipcRenderer } from 'electron';
//Estructura
// {
//   nombre: "Juan Pablo Gallego Arias",
//   tipo_documento: "CC",
//   numero_documento: 123456789,
//   fecha_nacimiento: "1929-12-01",
//   descripcion: "",
//   sesiones: [],
//   diagnosticos: []
// }
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: 0,
      modalData: {},
      currentTab: 0,
      openTabs: [],
      personas: [],
      requestSent: false,
      sbFiltros: {
        nombre: "",
        tipo_documento: "",
        numero_documento: "",
        diagnosticos: []
      },
      RCMenu: {
        isOpen: false,
        actions: [],
        args: null,
        mousePos: {
          x: 0,
          y: 0
        }
      },
    }
    this.node = React.createRef();
    this.RCMenu = React.createRef();
  }

  // Controla el input de los filtros
  // Y envia el request al backend

  handleFilterChange = (name, value) => {

    console.log(name, value);

    this.setState({ sbFiltros: { ...this.state.sbFiltros, [name]: value } });

    if (this.state.requestSent !== false) {

      clearTimeout(this.state.requestSent);

    }

    this.setState({

      requestSent: setTimeout(() => {

        this.cargarPaciente(this.state.sbFiltros);

        this.setState({ requestSent: false });

      }, 1000)

    });

  }

  //Agrega los diagnosticos al filtro de busqueda de pacientes

  handleFilterDiagnosticAdd = (diagnostico) => {

    let alreadyExist = false;

    const diagnosticos = this.state.sbFiltros.diagnosticos.slice();

    diagnosticos.forEach(e => {

      if (e._id === diagnostico._id) alreadyExist = true;

    });

    if (alreadyExist) return;

    this.setState({ sbFiltros: { ...this.state.sbFiltros, diagnosticos: [...diagnosticos, diagnostico] } }, () => {

      this.cargarPaciente(this.state.sbFiltros);

    });

  }

  //Elimina los diagnosticos del filtro de busqueda de pacientes

  handleFilterDiagnosticRemove = (id) => {

    console.log(id);

    const diagnosticos = this.state.sbFiltros.diagnosticos.filter(e => e._id !== id);

    this.setState({ sbFiltros: { ...this.state.sbFiltros, diagnosticos } }, () => {

      this.cargarPaciente(this.state.sbFiltros);

    });

  }

  componentDidMount() {

    this.handleDocumentUpload();

    this.cargarPaciente();

    window.addEventListener('click', this.handleMenuClosing);

  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleMenuClosing);
  }

  cargarPaciente = async (filtros = {}) => {

    var filterReq = {}

    if (filtros.hasOwnProperty('tipo_documento')) {

      if (filtros.tipo_documento !== "") {

        filterReq.tipo_documento = filtros.tipo_documento;

      }

    }

    if (filtros.hasOwnProperty('numero_documento')) {

      if (filtros.numero_documento !== "") {

        filterReq.numero_documento = parseInt(filtros.numero_documento);

      }

    }

    if (filtros.hasOwnProperty('nombre')) {

      if (filtros.nombre !== "") {

        filterReq.nombre = filtros.nombre;

      }

    }

    if (filtros.hasOwnProperty('diagnosticos')) {

      if (Array.isArray(filtros.diagnosticos)) {

        if (filtros.diagnosticos.length > 0) {

          filterReq["diagnosticos._id"] = { $in: filtros.diagnosticos.map(e => e._id) };

        }

      }

    }

    console.log(filterReq);

    const pacientes = await ipcRenderer.invoke('find-patient', filterReq);

    console.log(pacientes);

    this.setState({ personas: pacientes })

  }

  //Uplaod File and Update File
  handleDocumentUpload = () => {
    ipcRenderer.on('activate-save', async (evt, args) => {
      //En caso de que no haya ninguna pesta;a abierta
      //La acci'ion de guardado tiene en cuanta qué archivo se está 
      //visualizando actualmente para hacer el cambio
      if (this.state.openTabs.length <= 0) return;

      const result = await ipcRenderer.invoke('save-document', this.state.openTabs[this.state.currentTab]);


      // this.state.personas.map(e=>console.log(e._id)); 
      console.log(result);
      this.setState({
        openTabs: this.state.openTabs.map(e => e._id === result._id ? result : e),
        personas: this.state.personas.map(e => e._id === result._id ? result : e)
      })
    });
  }

  modalType = () => {
    if (this.state.modalType === "cd") {
      return <CrearDiagnostico
        setModalType={this.setModalType}
        setModalData={this.setModalData}
        create={this.handleDiagnosticoUpload}
      />
    } else if (this.state.modalType === "cdi") {
      return <CrearDescripcion
        setModalType={this.setModalType}
        setModalData={this.setModalData}
        create={this.handleDescripcionUpload}
      />
    } else if (this.state.modalType === "isD") {
      /**Abrir el selctor de items con las opciones de la descripciones */
      return <ItemSelector
        title={"descripciones"}
        setModalType={this.setModalType}
        setModalData={this.setModalData}
        loadData={this.handleDescripcionLoad}
        selectorType={'cdi'}
        handleAddDiagnostico={this.handleAddDiagnostico}
      />;
    } else if (this.state.modalType === "isS") {
      /**Abrir el selctor de items con las opciones de los diagnostico */
      return <ItemSelector
        title={"diagnosticos"}
        setModalType={this.setModalType}
        setModalData={this.setModalData}
        loadData={this.handleDiagnosticoLoad}
        selectorType={'cd'}
        handleAdd={this.handleAddDiagnostico}
        handleRemove={this.handleDeleteDiagnostico}
      />;
    } else if (this.state.modalType === "isSf") {
      /**Abrir el selctor de items con las opciones de los diagnostico */
      return <ItemSelector
        title={"diagnosticos"}
        setModalType={this.setModalType}
        setModalData={this.setModalData}
        loadData={this.handleDiagnosticoLoad}
        selectorType={'cd'}
        handleAdd={this.handleFilterDiagnosticAdd}
        handleRemove={this.handleDeleteDiagnostico}
      />;
    }
  }

  handleDiagnosticoLoad = async (setData) => {

    const diagnostico = await ipcRenderer.invoke('load-diagnosticos', {});
    setData(diagnostico);
  }

  handleDescripcionLoad = async (setData) => {
    console.log(setData);
    // const descripcion = await ipcRenderer.invoke('load-descripcion', {});
    // setData(sesion);
    // console.log(descripcion)

  }

  handleDescripcionUpload = async (args) => {
    console.log('subiendo descripcion')
    const descripcion = await ipcRenderer.invoke('agregar-descripcion', args)
    console.log('Descripcion subida', descripcion)
  }

  handleDiagnosticoUpload = async (args) => {

    const diagnostico = await ipcRenderer.invoke('agregar-diagnostico', args);

    console.log('diagnostico subido', diagnostico)
  }

  /**Agrega diagnostico al paciente */
  handleAddDiagnostico = (diagnostico) => {

    var alreadyExist = false;

    var personaEditable = this.state.openTabs.slice();

    //Verificar si el diagnostico ya ha sido agregado 
    personaEditable[this.state.currentTab].diagnosticos.forEach(e => {

      if (e._id === diagnostico._id) alreadyExist = true;

    });

    if (alreadyExist) return;

    personaEditable[this.state.currentTab].diagnosticos.push(diagnostico);

    this.setState({ openTabs: personaEditable });

  }

  /**Eliminar diagnostico del paciente actual en el estado */
  handleRemoveDiagnostico = (id) => {

    const openTabs = this.state.openTabs.slice();

    const removed = openTabs[this.state.currentTab].diagnosticos.filter((e => e._id !== id));

    openTabs[this.state.currentTab].diagnosticos = removed;

    this.setState({ openTabs: openTabs });

  }

  /**Eliminar un diagnostico de la base de datos */
  handleDeleteDiagnostico = async (id, setData, data) => {

    const diagnostico = await ipcRenderer.invoke('borrar-diagnostico', id);

    const newDiagnostico = data.filter(e => e._id !== diagnostico);

    setData(newDiagnostico);

  }

  handleDeleteSesion = (id) => {

    const openTabs = this.state.openTabs.slice();

    const removed = openTabs[this.state.currentTab].sesiones.filter(((e, i) => {

      if (e._id) return e._id !== id;

      return id !== i;

    }));

    openTabs[this.state.currentTab].sesiones = removed;

    this.setState({ openTabs: openTabs });

  }

  //Crear un nuevo paciente
  crearPaciente = async () => {
    var paciente = {
      nombre: "Nombre",
      tipo_documento: "CC",
      numero_documento: 10000,
      fecha_nacimiento: "2020-12-01",
      descripcion: "",
      sesiones: [],
      diagnosticos: []
    }

    const result = await ipcRenderer.invoke('create-patient', paciente);
    console.log(result);
    this.setState({ personas: [result, ...this.state.personas] });
    console.log(result);
  }

  eliminarPaciente = async (pacienteId) => {
    const result = await ipcRenderer.invoke('delete-patient', pacienteId);
    this.setState({ personas: this.state.personas.filter(e => e._id !== result._id) })
  }

  minimize = () => {
    ipcRenderer.send('minimize');
  }

  maximize = () => {
    ipcRenderer.send('maximize')
  }

  quit = () => {
    ipcRenderer.send('quit')
  }

  setModalType = (modalType) => {
    // console.log(modalType);
    this.setState({ modalType });
  }

  setModalData = (modalData) => {
    this.setState(modalData);
  }

  handleSendInfo = (info, type) => {
    console.log(info, type);
  }

  handleTabChange = (tabNumber) => {
    this.setState({ currentTab: tabNumber });
  }

  handleHistoryEdit = (currentTab, field, value) => {
    //loops trough the open taps 
    var patients = this.state.openTabs.slice();
    patients[currentTab] = { ...patients[currentTab], [field]: value }

    this.setState({ openTabs: patients })
  }

  handleSesionEdit = (currentTab, sesionIndex, field, value) => {
    var patients = this.state.openTabs.slice();
    patients[currentTab].sesiones[sesionIndex] = { ...patients[currentTab].sesiones[sesionIndex], [field]: value }
    this.setState({ openTabs: patients })
  }

  addSesion = () => {
    var d = new Date();
    var todaysDate = d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2)
    console.log(todaysDate)
    const sesionJson = {
      "fecha": todaysDate,
      "info": "Lorem ipsum dolor sit amen"
    }

    var patients = this.state.openTabs.slice();
    patients[this.state.currentTab].sesiones.push(sesionJson);
    console.log(patients)
    this.setState({ openTabs: patients });
  }

  handleTabOpening = async (patientId) => {
    if (this.state.openTabs.length <= 0 && this.state.currentTab > 0) {
      this.setState({ currentTab: 0 })
    };

    for (let i = 0; i < this.state.openTabs.length; i++) {
      const tab = this.state.openTabs[i];
      if (tab._id === patientId) return;
    }

    const patient = await ipcRenderer.invoke('find-patient', { _id: patientId });
    console.log(patient[0]);

    this.setState({
      openTabs: [...this.state.openTabs, patient[0]],
    }, () => {
      this.setState({
        currentTab: this.state.openTabs.length - 1
      })
    });
  }

  handleTabClosing = (tabId) => {
    this.setState({
      currentTab: this.state.currentTab <= 0 ? 0 : this.state.currentTab - 1,
      openTabs: this.state.openTabs.filter(tab => tab._id !== tabId)
    });
  }

  handleTabChange = (currentTab) => {
    this.setState({ currentTab })
  }

  handleMenuOpening = (actions, mousePos = { x: 0, y: 0 }, args) => {
    this.setState({ RCMenu: { isOpen: true, actions, mousePos, args } });

  }

  handleMenuClosing = e => {
    // console.log(e);

    if (this.RCMenu) {

      if (!this.RCMenu.current.contains(e.target)) {

        this.setState({ RCMenu: { ...this.state.RCMenu, isOpen: false } })

      }

    }

  }


  /* Lista de las acciones que se pueden hacer cuando 
  se hace click derecho en alguno de los elementos que represente a los pacientes*/

  PLIMenuActions = () => {

    return [{

      actionName: 'Borrar',

      action: async (id) => {

        this.setState({ RCMenu: { ...this.state.RCMenu, isOpen: false } })
        await ipcRenderer.invoke('delete-patient', { _id: id })
        this.setState({ openTabs: this.state.openTabs.filter(e => e.id !== id) })
        this.cargarPaciente();
      }

    }, {

      actionName: 'Duplicar',

      action: () => { console.log('duplicar') }

    }]
  }

  render() {
    return (
      <div className="App" ref={this.node}>
        <div className="titleBar">
          <div className="drag">
            <p>History Patient Managers</p>
          </div>
          <div className="window__option">
            <div className="square-icon" onClick={() => this.minimize()}>
              <img src={ic_minimize} alt="" />
            </div>
            <div className="square-icon" onClick={() => this.maximize()}>
              <img src={ic_maximize} alt="" />
            </div>
            <div className="square-icon" onClick={() => this.quit()}>
              <img src={ic_quit} alt="" />
            </div>
          </div>
        </div>
        <div className="mainContent">
          <SearchBar
            filter={this.state.sbFiltros}
            patients={this.state.personas}
            crearPaciente={this.crearPaciente}
            handleModalType={this.setModalType}
            handleTabOpening={this.handleTabOpening}
            handleMenuOpening={this.handleMenuOpening}
            handlePLIMenuActions={this.PLIMenuActions}
            handleFilterChange={this.handleFilterChange}
            handleFilterDiagnosticRemove={this.handleFilterDiagnosticRemove}
          />
          {this.state.openTabs.length > 0 &&
            <PatientEditor
              openTabs={this.state.openTabs}
              currentTab={this.state.currentTab}
              handleModalType={this.setModalType}
              handleTabChange={this.handleTabChange}
              handleTabClosing={this.handleTabClosing}
              handleSesionEdit={this.handleSesionEdit}
              handleHistoryEdit={this.handleHistoryEdit}
              handleDeleteSesion={this.handleDeleteSesion}
              handleRemoveDiagnostico={this.handleRemoveDiagnostico}
            />
          }
          {
            this.state.openTabs.length > 0 &&
            <div className="icons-sesion" onClick={() => { this.addSesion() }}>
              <img src={ic_addsesion} alt="" />
            </div>
          }
        </div>
        {/* {this.state.RCMenu.actions.length > 0 && */}
        <PLIMenu
          menuRef={this.RCMenu}
          actions={this.state.RCMenu}
        />
        {/* } */}
        {
          this.state.modalType &&
          <Modal closeModal={this.setModalType} >
            {this.modalType()}
          </Modal>
        }
      </div>
    );
  }
}

export default App;

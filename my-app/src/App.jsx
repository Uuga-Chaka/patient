import React, { Component } from 'react';
import './mainStyles.scss';
// import { ipcRenderer } from 'electron';


class App extends Component {
  state = {}

  componentDidMount() {

  }
  render() {
    return (
      <div className="App">
        <div className="titleBar">
          Title bar
        </div>
        <div className="mainContent">
          <div className="searchBar-container"></div>
          <div className="patient-container">
            <div className="patientTab-container">
              <div className="patientTab-single">
                Juan Pablo
              </div>
            </div>
            <div className="patientInfo-container">
              <div className="history-container">

              </div>
              <div className="sesions-container">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

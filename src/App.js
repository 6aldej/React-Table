import React, { Component } from 'react';
import load from './components/Load';
import ActiveUser from './components/ActiveUser';
import Searchbar from './components/SearchBar';
import Toolbar from './components/Toolbar';
import Pagination from './components/Pagination';
import AddUser from './components/AddUser';
import BtnFilter from './components/BtnFilter';
import Header from './components/Header'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentData: null,
      initialData: {},
      active: null,
      search: '',
      activePage: 1,
      dataType: null,
      isLoadingData: false,
      isSorted: false,
      add: false,
      filter: null
    };
  }
  
  switchDataType(type) {
    this.setState({filter: type})
    if (this.state.initialData.hasOwnProperty(type)) {
      this.setState({
        currentData: this.state.initialData[type],
        dataType: type,
        search: '',
        active: null,
        activePage: 1,
      });
    } else {
      this.setState({
        currentData: null,
        isLoadingData: true
      });

      load(type).then(users => {
        this.setState({
          isLoadingData: false
        });

        const newData = users;
        this.setState({
          initialData: {
            [type]: newData 
          },
        })

        this.setState({          
          currentData: this.state.initialData[type],
          dataType: type,
          search: ''
        });
      });
    
    const content = document.getElementById("content");
    const message = document.getElementById("message");
    content.style.display = "block";
    message.style.display = "none";
    }
  }

  updateData(config) {
    this.setState(config);
  }

  addTable() {   
    const newAdd = this.state.add;
    this.setState({
      add: !newAdd
    })
  }

  addUser(body) {
    this.setState(({initialData,dataType}) => {
      return {
        initialData:{
          [this.state.dataType]: [body, ...initialData[dataType]]
        },
      }
    })
    this.setState(({initialData, dataType}) => {
      return {
        currentData: initialData[dataType]
      }
    })
  }

  render() {
    
    return (
      <div className="app container-fluid">
        <div className="row-fluid">
          <Header/>
          <BtnFilter
            switchDataType={this.switchDataType.bind(this)}
            filter={this.state.filter}
          />
          <div id="content">
            <div className="col-sm-6" id="search-bar">
              <Searchbar
                search={this.state.search}
                currentData={this.state.currentData}
                initialData={this.state.initialData}
                dataType={this.state.dataType}
                update={this.updateData.bind(this)}
              />
            </div>

            <div className="col-sm-10" id="add">
              <button
              className="btn col-sm-4"
              onClick={this.addTable.bind(this)}
              >
                Add in table
              </button>

              <AddUser 
                add={this.state.add}
                initialData={this.state.initialData}
                addUser={this.addUser.bind(this)}
                update={this.updateData.bind(this)}
              />
            </div>

            <div className="user-main row col-sm-12">
              <div className="col-sm-6">
                <table className="user-list table table-bordered table-striped table-hover">
                  <Toolbar
                    data={this.state.currentData}
                    update={this.updateData.bind(this)}
                    isSortedFlag={this.state.isSorted}
                  />
                  
                  <Pagination
                    data={this.state.currentData}
                    currentPage={this.state.activePage}
                    update={this.updateData.bind(this)}
                    flagLoad={this.state.isLoadingData}
                  />
                </table>
              </div>

              <div className="active-user-cont col-sm-6">
                <div id="activeUser">
                <ActiveUser
                  data={this.state.currentData}
                  active={this.state.active}
                />
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    );
  }
}
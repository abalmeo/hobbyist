import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TreeLogo from '../../img/TreeLogo.png';
import TreeLogoLg from '../../img/TreeLogoLg.png';
import Axios from '../../../node_modules/axios';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedin: true })
    }
  }

  logout() {
    console.log("logging out");
    localStorage.removeItem('token'); 
    
    this.setState({
      loggedin:false})
    //Remove toke from localstorage
    
    //remove auth header for future requests
    delete Axios.defaults.headers.common['Authorization'];
    //
    
  }



  render() {
    const isLoggedIn = this.state.loggedin;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid nav-logo" src={TreeLogo} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>


          {isLoggedIn ? (
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link" to="/userpage">
                    {' '}
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/connections">
                    {' '}
                    Connections
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    {' '}
                    Enthusiasts
                  </Link>
                </li>
                <li className="nav-item mr-4">
                  <Link className="nav-link" to="/login" onClick={this.logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>) : (
              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  <Link className="nav-link" to="/search">
                      {' '}
                      Enthusiasts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Sign Up
                     </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
      </nav>
    );
  }
}

export default Navbar;

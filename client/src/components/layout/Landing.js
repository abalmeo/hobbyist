import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TreeLogoLg from '../../img/TreeLogoLg.png';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <img id="landing-logo" src={TreeLogoLg} />
                <p className="lead">
                  {' '}
                  Become an enthusiast. Create a profile, share your skills, interests and get connected with others.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg register mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;

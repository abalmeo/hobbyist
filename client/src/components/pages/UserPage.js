import React, { Component } from 'react';
import axios from "axios";
import About from "../../components/layout/About"
import ProfileHeader from "../../components/layout/ProfileHeader"
import ProfileCreds from "../../components/layout/ProfileCreds"
import ListItem from "../../components/layout/ListItem"
import { Redirect } from "react-router-dom";

// import { Redirect } from "react-router-dom";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      skills: "",
      equipment: "",
      interests: "",
      location: "",
      bio: "",
      errors: {},
      profile: [],
      redirectTo: null
    }
  }

  loggedIn() {
    const token = this.getToken("token")
    return !!token && !this.isTokenExpired(token)
  }

 
  

  componentDidMount() {
    axios.get("/api/profile", {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(res => { 
        console.log(res.data);
        if (!this.loggedIn) {
          this.setState({redirectTo: "/login"});
      }
      else {
        console.log("you are logged in");
      }
        this.setState({profile: res.data
        });
       })
      .catch(err => this.setState({ errors: err.response.data }));
  }


  render() {

   for (var i = 0; i < this.state.profile.length; i++) {
      return this.state.profile.user;
    }

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo}} />
    } else {

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              


              <ProfileHeader
              key={this.state.profile._id}
                name={this.state.profile.userName}
                location={this.state.profile.location}
                occupation={this.state.profile.occupation}
              />
              <About 
                bio={this.state.profile.bio}
              
              />
              <ProfileCreds>
              
                    <ListItem 
                      key={this.state.profile._id} 
                      interests={this.state.profile.interests}
                    /> 
              </ProfileCreds>

            </div>
          </div>
        </div>
      </div>

    );
  }
  }
}

export default UserPage;
import React, { Component } from 'react';
import axios from "axios";
// import About from "../../components/layout/About"
import ProfileHeader from "../../components/layout/ProfileHeader"
import ProfileCreds from "../../components/layout/ProfileCreds"
import ListItem from "../../components/layout/ListItem"
import { Redirect } from "react-router-dom";

// import { Redirect } from "react-router-dom";

class SearchedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      skills: [],
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
    const { match: { params } } = this.props;

    axios.get(`/api/profile/username/${params.username}`, {
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
        this.setState({profile: res.data, skills: res.data.skills});
        console.log(this.state.skills);
       })
       .catch(err => this.setState({ errors: err.response.data }));
  }


  render() {

    for (var i = 0; i < this.state.profile.length; i++) {
      return this.state.profile.user;
    }

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
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
               
              <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">Bio</h3>
                    <p className="lead">{this.state.profile.bio}
                </p>
                    <hr />
                    <h3 className="text-center text-info">Skill Set</h3>
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                        
                        {this.state.skills.map((index) => (
                          <div className="p-3">
                          <i className="fa fa-check"></i>{index}
                          </div>
                        ))}
                        
                      </div>
                    </div>
                  </div>
                </div>
            
              
              <ProfileCreds>
              
                    <ListItem 
                      key={this.state.profile._id} 
                      interests={this.state.profile.interests}
                    /> 
              </ProfileCreds>

              <div className="row">
                  <div className="col-12 ">
                    <a href="/editprofile" className="btn btn-light mt-5 text-center justify-content-center align-items-center d-flex flex-wrap">Edit Profile</a>
                  </div>
                </div>
           
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SearchedUser;
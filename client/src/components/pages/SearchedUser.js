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
      redirectTo: null,
      loggedInUser:"",
    }
    this.onClick= this.onClick.bind(this); 
  }

  loggedIn() {
    const token = this.getToken("token")
    return !!token && !this.isTokenExpired(token)
  }




  componentDidMount() {
    const { match: { params } } = this.props;
    console.log(params.username);
    axios.get(`/api/profile/username/${params.username}`,)
      .then(res => {
        console.log(res.data);
           
      
        this.setState({profile: res.data, skills: res.data.skills});
        console.log(this.state.skills);
       })
       .catch(err => this.setState({ errors: err.response.data }));
  }

  onClick(){
    if (this.state.loggedInUser==="") {
      console.log('you are not logged in');
      this.setState({redirectTo: "/login"});
     
    axios.get("/api/users/current", {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res => {
      
      this.setState({loggedInUser: res.data.userName});
      console.log(this.state.loggedInUser); 
      const profile = {
        connections: this.state.profile.userName,
      }
      console.log(profile);
            axios.post('/api/profile/connection', profile, {
              headers: {
                  "Authorization": localStorage.getItem("token")
              }
          })
          .then(res => {
            console.log(res.data)
        })
        .catch(err => this.setState({ errors: err.response.data }));
      
     })
}
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
                    <h3 className="text-center">Bio</h3>
                    <p className="text-center">{this.state.profile.bio}
                </p>
                    <hr />
                    <h3 className="text-center">Skill Set</h3>
                    <div className="row justify-content-center">
                      <div className="d-flex flex-wrap">
                        
                        {this.state.skills.map((index) => (
                          <div className="p-3">
                            {index}
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
                    <a  onClick={this.onClick} className="btn btn-light mt-5 text-center justify-content-center align-items-center d-flex flex-wrap">Connect</a>
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
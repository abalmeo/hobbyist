import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import classnames from "classnames";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            skills: "",
            equipment: "",
            interests: "",
            location: "",
            bio: "",
            occupation: "",
            errors: {},
            redirectTo: null,
            selectedFile: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
      this.setState({
        username: res.data.userName,
        skills: res.data.skills,
        equipment: res.data.equipment, 
        interests: res.data.interests,
        location: res.data.location, 
        bio: res.data.bio, 
        occupation: res.data.occupation
        });
      })
    .catch(err => this.setState({ errors: err.response.data }));
}


    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken("token") // Getting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const profile = {
            userName: this.state.username,
            skills: this.state.skills,
            equipment: this.state.equipment,
            interests: this.state.interests,
            location: this.state.location,
            bio: this.state.bio,
            occupation: this.state.occupation
        }

        axios.post('/api/profile', profile, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res.data)
                if (!this.loggedIn) {
                    this.setState({ redirectTo: "/login" });
                }
                else {
                    this.setState({ redirectTo: "/userpage" });
                }
            })
            .catch(err => this.setState({ errors: err.response.data }));
    }


    render() {
        const { errors } = this.state;
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {

            return (
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Edit Your Profile</h1>
                                <p className="lead text-center">Profile</p>
                                <form noValidate onSubmit={this.onSubmit}>

                                    {/*Username*/}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.username
                                            })}
                                            placeholder="Username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChange}
                                        />
                                        {errors.username && (<div className="invalid-feeback">{errors.username}</div>)}
                                    </div>


                                    {/*skills*/}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.skills
                                            })}
                                            placeholder="Skills"
                                            name="skills" value={this.state.skills}
                                            onChange={this.onChange}
                                        />
                                        {errors.skills && (<div className="invalid-feeback">{errors.skills}</div>)}
                                    </div>

                                    {/*equipment*/}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.equipment
                                            })}
                                            placeholder="Equipment"
                                            name="equipment" value={this.state.equipment}
                                            onChange={this.onChange}
                                        />
                                        {errors.equipment && (<div className="invalid-feeback">{errors.equipment}</div>)}
                                    </div>
                                    {/*interests*/}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.interests
                                            })}
                                            placeholder="Interests"
                                            name="interests"
                                            value={this.state.interests}
                                            onChange={this.onChange}
                                        />
                                        {errors.interests && (<div className="invalid-feeback">{errors.interests}</div>)}
                                    </div>
                                    {/*location*/}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.location
                                            })}
                                            placeholder="Location"
                                            name="location"
                                            value={this.state.location}
                                            onChange={this.onChange}
                                        />
                                        {errors.location && (<div className="invalid-feeback">{errors.location}</div>)}
                                    </div>
                                    {/*Bio*/}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.bio
                                            })}
                                            placeholder="Bio"
                                            name="bio"
                                            value={this.state.bio}
                                            onChange={this.onChange}
                                        />
                                        {errors.bio && (<div className="invalid-feeback">{errors.bio}</div>)}
                                    </div>

                                    {/*occupation*/}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.occupation
                                            })}
                                            placeholder="Occupation"
                                            name="occupation"
                                            value={this.state.occupation}
                                            onChange={this.onChange}
                                        />
                                        {errors.occupation && (<div className="invalid-feeback">{errors.occupation}</div>)}
                                    </div>

                                    {/*Photo*/}
                                    <div className="form-group">
                                        <input
                                            type="file"
                                            className={classnames("form-control form-control-lg")}
                                            placeholder="User Photo"
                                            name="photo"
                                            onChange={this.fileChangedHandler}
                                        />
                                        {errors.bio && (<div className="invalid-feeback">{errors.bio}</div>)}
                                    </div>

                                    <input type="submit"
                                        onClick={this.uploadHandler}
                                        className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default EditProfile;
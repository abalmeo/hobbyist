import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import ListItem from '../layout/ListItem';
import { runInThisContext } from 'vm';
import TreeLogoLg from '../../img/TreeLogoLg.png';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            profiles: [],
            errors: {},
            connections: [],
            redirectTo: null
        }
        this.onChange = this.onChange.bind(this);

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
                // if not logged in, re-route to login page
                if (!this.loggedIn) {
                    this.setState({ redirectTo: "/login" });
                }
                else {
                    console.log("you are logged in");
                }

                // set state of connections from MongoDB
                this.setState({ connections: res.data.connections });
                console.log(this.state.connections);

                let connect = {
                    connectedUsers: this.state.connections
                }

                console.log(connect);



                axios.post("/api/profile/connections", connect)
                    .then(res => {
                        this.setState({
                            profiles: res.data
                        })
                        console.log(res);
                        console.log(res.data.connections);
                    })
                    .catch(err => this.setState({ errors: err.response.data }));
            })
    }



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });


    }





    render() {

        return (
            <div>
                <div className="row justify-content-start">
                    <div className="col-lg-4">
                    </div>
                </div>

                {this.state.profiles.map(profile => (
                    <div className="card card-body bg-light mb-3">
                        <div className="row">
                            <div className="col-2">
                                <img className="rounded-circle" src={TreeLogoLg} alt="" />
                            </div>
                            <div className="col-lg-6 col-md-4 col-8">
                                <h3>{profile.userName}</h3>
                                <p>{profile.occupation}</p>
                                <p>{profile.location}</p>
                                <Link className="nav-link" to={`/user/${profile.userName}`}>
                                    <a value={profile.userName} className="btn btn-info">View Profile</a>
                                </Link>
                                <a href="/message" class="btn btn-dark ml-1">Message</a>

                            </div>
                            <div className="col-md-4 d-none d-lg-block">
                                <h4>Skill Set</h4>
                                <ul className="list-group">


                                    <li className="list-group-item">
                                        {profile.skills}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                ))}
            </div>


        )
    }
}

export default Search
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
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile() {
        console.log("testing");
        axios.get('api/profile/all')
            .then(res => {
                console.log(res.data);
                this.setState({
                    profiles: res.data
                });
            })
            .catch(err => this.setState({ errors: err.response.data }));
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const searchUser = {
            query: this.state.query
        }
    }

    onClick() {

    }

    
    render() {

        return (
            <div>
                <div className="row justify-content-start">
                <div className="col-lg-4">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Search for..."
                            name="query"
                            value={this.state.query}
                            onChange={this.onChange}
                        />
                        <br/>
                        <input type="submit" className="btn landbtn mt-4" />
                    </div>
                    
                </form>
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
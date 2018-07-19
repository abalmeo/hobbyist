import React, { Component } from 'react'
import { Card, CardItem } from "./profilecards";
import { Col, Row, Container } from "./grid";
import axios from "axios";
import ListItem from '../layout/ListItem';
import { runInThisContext } from 'vm';

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

    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Search for..."
                            name="query"
                            value={this.state.query}
                            onChange={this.onChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>

                {this.state.profiles.map(profile => (
                    <div className="card card-body bg-light mb-3">
                        <div className="row">
                            <div className="col-2">
                                <img className="rounded-circle" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
                            </div>
                            <div className="col-lg-6 col-md-4 col-8">
                                <h3>{profile.userName}</h3>
                                <p>{profile.occupation}</p>
                                <p>{profile.location}</p>
                                <a href="profile.html" className="btn btn-info">View Profile</a>
                            </div>
                            <div className="col-md-4 d-none d-lg-block">
                                <h4>Skill Set</h4>
                                <ul className="list-group">

                            
                                <li className="list-group-item">
                                    <i className="fa fa-check pr-1"></i>{profile.skills}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                ))}

                <h3> No Results to Display</h3>
            </div>


        )
    }
}

export default Search
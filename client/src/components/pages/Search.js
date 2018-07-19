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
                this.setState({ profiles: res.data 
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
            {this.state.profiles.map(profile=>(
            <ListItem
                 key={profile._id}
                 ssssdd
            >
            <h1> {profile.bio} </h1>
            </ListItem>

            ))}

                    <h3> No Results to Display</h3>
                </div>
            
            
        )
        }
    }

export default Search
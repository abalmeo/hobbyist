import React, { Component } from 'react'
import { Card, CardItem } from "./profilecards";
import { Col, Row, Container } from "./grid";
import axios from "axios";

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
                this.setState({ profiles: res.data })
            })
            .catch(err => console.log(err));
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

                
            <h1>
                Test
                {this.state.profiles.length?(
                <h2>{this.state.profiles[2]._id[0 ]}</h2>
                ):(
                    <h3> No Results to Display</h3>
                )}
            </h1>
            </div>
        )
        }
    }

export default Search
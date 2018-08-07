import React, { Component } from 'react'
import axios from "axios";
import ListItem from '../layout/ListItem';
import { runInThisContext } from 'vm';
import TreeLogoLg from '../../img/TreeLogoLg.png';

class Message extends Component {
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
          <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Somthing...
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <textarea className="form-control form-control-lg" placeholder="Send Message"></textarea>
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
       
}

export default Message;
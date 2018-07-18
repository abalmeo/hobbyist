import React, { Component } from 'react'
import axios from "axios";

class Search extends Component {
    constructor(){
        super(); 
        this.state= {
            query: '',
            profiles:[],
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('api/profile/all')
        .then(res=>{
            console.log(res.data); 
            this.setState({profiles: res.data})
        })
        .catch(err=>this.setState22)
        
    }

onChange(e) {
    this.setState({[e.target.name]: e.target.value});
}
 onSubmit(e){
     e.preventDefault(); 
     const searchUser ={
         query: this.state.query
     }
 
 }

 render() {
   return (
     <form oValidate onSubmit={this.onSubmit}>
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
   )
 }
}

export default Search
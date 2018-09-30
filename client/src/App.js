import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UpdateProfile from "./components/pages/UpdateProfile";
import EditProfile from "./components/pages/EditProfile";
import Search from "./components/pages/Search";
import UserPage from "./components/pages/UserPage"
import Message from "./components/pages/Message";
import Connections from "./components/pages/Connections";
import SearchedUser from "./components/pages/SearchedUser";


import './App.css';


class App extends Component {

  constructor() {
    super();
      
  }

  render() {
    return (
      
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path= "/" component={Landing} />
          <div className="container-fluid">
            <Route exact path="/register" component={Register} />
            <Route exact path="/editprofile" component={EditProfile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/message" component={Message} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/connections" component={Connections} />
            <Route exact path={"/user/:username"} component={SearchedUser} />
            <Route exact path="/userpage" component={UserPage} />
            <Route exact path="/profile" component={UpdateProfile} />
          </div>
          <Footer />
        </div>
      </Router>
  
    );
  }
}

export default App;

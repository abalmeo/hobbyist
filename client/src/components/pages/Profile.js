import React, { Component } from 'react';
import axios from "axios";


class Profile extends Component {

    componentDidMount() {
        axios.get('api/profile/all')
        .then(res=>{
            console.log(res.data); 
        })
        .catch(err=>this.setState22)
        this.props.getProfiles();
    }

        render() {
            const { profiles, loading } = this.props.profile;
            let profileItems;

            if (profiles === null || loading) {
                profileItems = <Spinner />;
            } else {
                if (profiles.length > 0) {
                    <h1> Profiles Here </h1>
                } else {
                    profileItems = <h4> No profiles found...</h4>
                }
            }
            return (
                <div className="profiles">
                    <div className="container">
                        <div className="row">
                            <div classnName="col-md-12">
                                <h1 className="display-4 text-center">Profiles </h1>
                                <p className="lead text-center">
                                    Connect with Hobbyists.
                                </p>
                                {profileItems}
                            </div>
                        </div>
                    </div>
                </div>

            )
  
            Profiles.propTypes = {
                getProfiles: PropTypes.func.isRequired,
                profile: PropTypes.object.isRequired
            }

            const mapStateToProps = state => ({
                profile: state.profile
            });
        }
    }

        export default Profile;
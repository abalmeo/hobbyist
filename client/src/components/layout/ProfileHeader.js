import React from 'react';
import TreeLogo from '../../img/TreeLogo.png';

export default (props) => {
  return (

<div className="row">
                <div className="col-md-12">
                  <div className="card card-body profileHeader text-white mb-3">
                    <div className="row">
                      <div className="col-4 col-md-3 m-auto">
                        <img className="rounded-circle" src={TreeLogo} alt="" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h1 className="display-4 text-center">{props.name}</h1>
                      <p className="lead text-center">{props.occupation}</p>
                      <p>{props.location}</p>
                      
                    </div>
                  </div>
                </div>
              </div>
  );
};
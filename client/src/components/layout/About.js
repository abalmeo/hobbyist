import React from 'react';

export default (props) => {
    return (
<div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">Bio</h3>
                    <p className="lead">{props.bio}
                </p>
                    <hr />
                    <h3 className="text-center text-info">Skill Set</h3>
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <div className="p-3">
                          <i className="fa fa-check"></i> HTML</div>
                        <div className="p-3">
                          <i className="fa fa-check"></i> CSS</div>
                        <div className="p-3">
                          <i className="fa fa-check"></i> JavaScript</div>
                        <div className="p-3">
                          <i className="fa fa-check"></i> Python</div>
                        <div className="p-3">
                          <i className="fa fa-check"></i> C#</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  );
};
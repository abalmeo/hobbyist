import React from 'react';
import { PromiseProvider } from 'mongoose';

export default ({children}) => {
    return (
        <div className="row">
            <div className="col-md-6">
                <h3 className="text-center text-info">Interests</h3>
                {children}
            </div>
            <div className="col-md-6">
                <h3 className="text-center text-info">Education</h3>
                <ul className="list-group">
                    <li className="list-group-item" />
                </ul>
            </div>
        </div>
    );
};



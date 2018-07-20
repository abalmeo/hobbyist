import React from 'react';
import { PromiseProvider } from 'mongoose';

export default ({children}) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <h3 className="text-center">Interests</h3>
                {children}
            </div>
            
        </div>
    );
};



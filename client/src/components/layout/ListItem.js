import React from 'react';


export default (props) => {
    return (
        <ul className="list-group">
            <li className="list-group-item">
                {props.interests}
            </li>
        </ul>
        
    );
};
import React from 'react';


export default function Card({ name, sprite, types }) {
    return (
        <div>
            <img src={sprite} alt='img pokemon' width="200px" height="230px" />
            <h2>{name}</h2>
            <h5>{types}</h5>
        </div>
    );
};
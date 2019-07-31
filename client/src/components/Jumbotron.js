import React from "react";

function Jumbotron({
    title,
    description,
    instructions,
    children
}) {
    return (
        <div className="jumbotron">
            {children}
            <h1 className="display-4">{title}</h1>
            <p className="lead">{description}</p>
            <hr className="my-4" />
            <p id="instructions">{instructions}</p>
        </div>
    );
}

export default Jumbotron;

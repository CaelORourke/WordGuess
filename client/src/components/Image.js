import React from "react";

function Image({
    src,
    alt
}) {
    return (
        <div className="card bg-dark text-white">
            <img src={src} className="card-img" alt={alt} />
            <div className="card-img-overlay">
                <h5 className="card-title">   </h5>
                <p className="card-text"></p>
            </div>
        </div>
    );
}

export default Image;

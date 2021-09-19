import React from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import './body.css';

function Status(selected, action) {
    const { status } = selected;
    const { fetching, generating } = action;
    return {
        renderStatus: (
            <div className={'spinnerPage'}>
                <div className={'spinner'}>
                    <PacmanLoader size={35} color={"#123abc"} speedMultiplier={1.5} />
                </div>

                {generating && <div >Generating CSVs, {status}%...</div>}
                {fetching && <div >Generating chart...</div>}
            </div>

        )
    };
};

export default Status;

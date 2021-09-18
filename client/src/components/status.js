import React, { useEffect, useRef, Component, classes } from 'react';
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

                {generating && <div onChange={action}>Generating CSVs, {status}%...</div>}
                {fetching && <div onChange={action}>Generating chart...</div>}
            </div>

        )
    };
};

export default Status;

import React, { useEffect, useRef, Component, classes } from 'react';
import { Promise } from 'bluebird';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ProgressBar from "@ramonak/react-progress-bar";
import PacmanLoader from "react-spinners/PacmanLoader";
import './body.css';

function Status(selected, action) {
    const { status } = selected;

    console.log(status);


    return {
        renderStatus: (
            <div className={'spinnerPage'}>
                <div className={'spinner'}>
                    <PacmanLoader size={35} color={"#123abc"} speedMultiplier={1.5} />
                </div>

                <div onChange={action}>Generating CSVs, {status}%...</div>
            </div>

        )
    };
};

export default Status;

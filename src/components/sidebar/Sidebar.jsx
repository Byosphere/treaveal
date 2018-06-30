import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconButton, Tooltip, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LocalActivity from '@material-ui/icons/LocalActivity';
import Flight from '@material-ui/icons/Flight';
import AttachMoney from '@material-ui/icons/AttachMoney';
import People from '@material-ui/icons/People';
import Dashboard from '@material-ui/icons/Dashboard';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="side-bar">
                <ul>
                    <li>
                        <Tooltip id="tooltip-new" title="Create a new Travel" placement="right">
                            <IconButton color="inherit" aria-label="New">
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <Divider className="divider" component="li" />
                    <li>
                        <Tooltip id="tooltip-new" title="Vue d'ensemble" placement="right">
                            <IconButton color="inherit" aria-label="Vue d'ensemble" component={NavLink} activeClassName="selected" to="/dashboard">
                                <Dashboard />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip id="tooltip-new" title="Activités" placement="right">
                            <IconButton color="inherit" aria-label="activités" component={NavLink} activeClassName="selected" to="/activities">
                                <LocalActivity />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip id="tooltip-new" title="Transports" placement="right">
                            <IconButton color="inherit" aria-label="transports" component={NavLink} activeClassName="selected" to="/transports">
                                <Flight />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip id="tooltip-new" title="Dépenses" placement="right">
                            <IconButton color="inherit" aria-label="dépenses" component={NavLink} activeClassName="selected" to="/spending">
                                <AttachMoney />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip id="tooltip-new" title="Participants" placement="right">
                            <IconButton color="inherit" aria-label="participants">
                                <People />
                            </IconButton>
                        </Tooltip>
                    </li>
                </ul>
            </section>
        );
    }
}

export default Sidebar;
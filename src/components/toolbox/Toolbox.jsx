import React from 'react';
import Today from '@material-ui/icons/Today';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Landscape from '@material-ui/icons/Landscape';
import ShortText from '@material-ui/icons/ShortText';

class Toolbox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="toolbox">
                <ul>
                    <li>
                        <Tooltip id="tooltip-new" title="Add a day to the current travel" placement="bottom">
                            <IconButton color="inherit" aria-label="New">
                                <Today />
                                +
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip id="tooltip-new" title="Add a transport to the current day" placement="bottom">
                            <IconButton color="inherit" aria-label="New">
                                <DirectionsCar />
                                +
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip id="tooltip-new" title="Add an activity to the current day" placement="bottom">
                            <IconButton color="inherit" aria-label="New">
                                <Landscape />
                                +
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip id="tooltip-new" title="Add a short text to the current day" placement="bottom">
                            <IconButton color="inherit" aria-label="New">
                                <ShortText />
                                +
                            </IconButton>
                        </Tooltip>
                    </li>
                </ul>
            </section>
        );
    }
}

export default Toolbox;
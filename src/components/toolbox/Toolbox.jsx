import React from 'react';
import { connect } from 'react-redux';
import Today from '@material-ui/icons/Today';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Landscape from '@material-ui/icons/Landscape';
import ShortText from '@material-ui/icons/ShortText';
import DayDialog from '../dialog/daydialog/DayDialog.jsx'
import { setDay } from '../../actions/dayActions';
import T from 'i18n-react';

class Toolbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dayDialogOpen: false
        }
        this.openDayDialog = this.openDayDialog.bind(this);
        this.closeDayDialog = this.closeDayDialog.bind(this);
        this.saveDayDialog = this.saveDayDialog.bind(this);
    }

    openDayDialog() {
        this.setState({
            dayDialogOpen: true
        });
    }

    closeDayDialog() {
        this.setState({
            dayDialogOpen: false
        });
    }

    saveDayDialog(day) {
        this.props.setDay(day);
        this.setState({
            dayDialogOpen: false
        });
    }

    render() {
        return (
            <section className="toolbox">
                <ul>
                    <li>
                        <Tooltip id="tooltip-new" title={T.translate('create-day')} placement="bottom">
                            <IconButton onClick={this.openDayDialog} color="inherit" aria-label="New">
                                <Today />
                                +
                            </IconButton>
                        </Tooltip>
                        <DayDialog open={this.state.dayDialogOpen} onClose={this.closeDayDialog} onSave={this.saveDayDialog} />
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

export default connect(null, { setDay })(Toolbox);
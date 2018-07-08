import React from 'react';
import { connect } from 'react-redux';
import Today from '@material-ui/icons/Today';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Flight from '@material-ui/icons/Flight';
import LocalActivity from '@material-ui/icons/LocalActivity';
import ShortText from '@material-ui/icons/ShortText';
import DayDialog from '../dialog/daydialog/DayDialog.jsx'
import { setDay } from '../../actions/dayActions';
import { toggleNotes } from '../../actions/travelActions';
import T from 'i18n-react';

class Toolbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dayDialogOpen: false,
            displayNote: this.props.displayNote
        }
        this.openDayDialog = this.openDayDialog.bind(this);
        this.closeDayDialog = this.closeDayDialog.bind(this);
        this.saveDayDialog = this.saveDayDialog.bind(this);
        this.toggleN = this.toggleN.bind(this);
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

    toggleN() {
        this.props.toggleNotes();
        this.setState({
            displayNote: !this.state.displayNote
        });
    }

    render() {
        return (
            <section className="toolbox">
                <ul>
                    <li>
                        <Tooltip id="tooltip-new" title="Add a short text to the current day" placement="bottom">
                            <IconButton onClick={this.toggleN} color={this.state.displayNote ? "inherit" : "primary"} aria-label="New">
                                <Today />
                            </IconButton>
                        </Tooltip>
                    </li>
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
                                <Flight />
                                +
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip id="tooltip-new" title="Add an activity to the current day" placement="bottom">
                            <IconButton color="inherit" aria-label="New">
                                <LocalActivity />
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
                    <li>
                        <Tooltip id="tooltip-new" title="Add a short text to the current day" placement="bottom">
                            <IconButton color="inherit" aria-label="New">
                                <ShortText />
                            </IconButton>
                        </Tooltip>
                    </li>
                </ul>
            </section>
        );
    }
}
function mapStateToProps(state) {
    return {
        displayNote: state.travel.displayNote,
    }
}
export default connect(mapStateToProps, { setDay, toggleNotes })(Toolbox);
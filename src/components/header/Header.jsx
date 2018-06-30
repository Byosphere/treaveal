import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Edit from '@material-ui/icons/Edit';
import TravelDialog from '../traveldialog/TravelDialog.jsx';
import { saveTravelInfo } from '../../actions/travelActions';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            title: this.props.title || '',
            location: this.props.location || ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleClick() {
        this.setState({
            open: true,
        })
    }

    handleClose() {
        this.setState({
            open: false,
        })
    }

    handleSave(title, location, daysNum) {
        this.props.saveTravelInfo(title, location, daysNum, null);
        this.setState({
            title: title,
            location: location
        });
        this.handleClose();
    }

    render() {
        return (
            <section className="app-header">
                <div className="title">
                    <h1>{this.state.location} :
                    <span>{this.state.title}</span>
                        <Tooltip id="tooltip-new" title="Modify this travel" placement="right">
                            <IconButton onClick={this.handleClick} color="inherit" aria-label="New">
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </h1>
                    <span>Created on 12/05/2018 by <a href="#">Yohann</a>.</span>
                </div>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Search />
                    </Grid>
                    <Grid item>
                        <TextField id="input-search" label="Search for a trip" />
                    </Grid>
                </Grid>
                <TravelDialog open={this.state.open} onClose={this.handleClose} onSave={this.handleSave} />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        title: state.travel.title,
        location: state.travel.location
    }
}

export default connect(mapStateToProps, { saveTravelInfo })(Header);
import React from 'react';
import { connect } from 'react-redux';
import { IconButton, Drawer } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Dehaze from '@material-ui/icons/Dehaze';
import AccessTime from '@material-ui/icons/AccessTime'
import TravelDialog from '../dialog/traveldialog/TravelDialog.jsx';
import { saveTravelInfo } from '../../actions/travelActions';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { getCountryFromCountryCode, getNavigatorLanguage, daysBetween } from '../../utils/helpers';
import T from 'i18n-react';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            title: this.props.title || '',
            location: this.props.location,
            updatedDate: this.props.updatedDate,
            departureDate: this.props.departureDate,
            drawerOpen: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
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

    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    handleSave(title, location, daysNum) {
        this.props.saveTravelInfo(title, location);
        this.setState({
            title: title,
            location: location
        });
        this.handleClose();
    }
    static getDerivedStateFromProps(props, state) {
        if (props.updatedDate !== state.updatedDate) {
            return {
                updatedDate: props.updatedDate
            }
        }
        return null;
    }

    render() {
        return (
            <section className="app-header">
                <IconButton className="drawer-button" onClick={this.toggleDrawer}>
                    <Dehaze />
                </IconButton>
                <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        <div className="responsive-drawer">
                            sqdq
                        </div>
                    </div>
                </Drawer>
                <div className="title">
                    <h1>{getCountryFromCountryCode(this.state.location)} :
                    <span>{this.state.title}</span>
                        <IconButton onClick={this.handleClick} color="inherit" aria-label="New">
                            <Edit />
                        </IconButton>
                    </h1>
                    <span>{T.translate("header.updated")} {new Date(this.state.updatedDate).toLocaleDateString(getNavigatorLanguage(true), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <TravelDialog title={this.state.title} location={this.state.location} open={this.state.open} onClose={this.handleClose} onSave={this.handleSave} />
                <Chip
                    className="departure"
                    avatar={
                        <Avatar>
                            <AccessTime />
                        </Avatar>
                    }
                    label={T.translate('header.leaving-in') + " " + (daysBetween(new Date(), new Date(this.state.departureDate)) + 1) + " " + T.translate('header.days')}
                />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        title: state.travel.title,
        location: state.travel.location,
        updatedDate: state.travel.updatedDate,
        departureDate: state.travel.departureDate
    }
}

export default connect(mapStateToProps, { saveTravelInfo })(Header);
import React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Edit from '@material-ui/icons/Edit';
import AccessTime from '@material-ui/icons/AccessTime'
import TravelDialog from '../traveldialog/TravelDialog.jsx';
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
            location: getCountryFromCountryCode(this.props.location),
            updatedDate: this.props.updatedDate,
            departureDate: this.props.departureDate
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
        this.props.saveTravelInfo(title, location);
        this.setState({
            title: title,
            location: getCountryFromCountryCode(location)
        });
        this.handleClose();
    }

    componentWillUpdate(nextProps) {
        if (nextProps.updatedDate != this.state.updatedDate) {
            this.setState({
                updatedDate: nextProps.updatedDate
            });
        }
    }

    render() {

        return (
            <section className="app-header">
                <div className="title">
                    <h1>{this.state.location} :
                    <span>{this.state.title}</span>
                        <IconButton onClick={this.handleClick} color="inherit" aria-label="New">
                            <Edit />
                        </IconButton>
                    </h1>
                    <span>{T.translate("header.updated")} {new Date(this.state.updatedDate).toLocaleDateString(getNavigatorLanguage(true), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <TravelDialog open={this.state.open} onClose={this.handleClose} onSave={this.handleSave} />
                <Chip
                    avatar={
                        <Avatar>
                            <AccessTime />
                        </Avatar>
                    }
                    label={T.translate('header.leaving-in') + " " + daysBetween(new Date(), new Date(this.state.departureDate)) + " " + T.translate('header.days')}
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
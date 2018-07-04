import React from 'react';
import { connect } from 'react-redux';
import { Card, Typography, CardContent, Button, Divider } from '@material-ui/core';
import { setHotel } from '../../actions/dayActions';
import AddIcon from '@material-ui/icons/Add';
import Home from '@material-ui/icons/Home';
import HotelDialog from '../dialog/hoteldialog/HotelDialog.jsx';
import T from 'i18n-react';
import { getNavigatorLanguage } from '../../utils/helpers';

class Hotelbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentDay: this.props.currentDay,
            day: this.props.days[this.props.currentDay],
            open: false,
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

    handleSave(hotel) {
        this.props.setHotel(hotel, this.props.currentDay);
        this.setState({
            exists: true,
            hotel: hotel
        })
        this.handleClose();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentDay !== state.currentDay) {
            return {
                currentDay: props.currentDay,
                day: props.days[props.currentDay],
            }
        }
        return null;
    }

    render() {
        if (this.state.day.hotel) {
            return (
                <section className="hotel-details">
                    <Card raised={true} classes={{ root: "card" }}>
                        <CardContent>
                            <Typography className="hotel-title" gutterBottom variant="headline" component="h2">
                                <Home />
                                {this.state.day.hotel.name}
                            </Typography>
                            <Divider />
                            <div className="hotel-info">
                                <div>
                                    <p><b>{T.translate('hotel.check-in')}</b></p>
                                    <span>{new Date(this.state.day.hotel.checkIn).toLocaleDateString(getNavigatorLanguage(true), { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div>
                                    <p><b>{T.translate('hotel.check-out')}</b></p>
                                    <span>{new Date(this.state.day.hotel.checkOut).toLocaleDateString(getNavigatorLanguage(true), { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                            <p className="hotel-address">
                                <b>{T.translate('hotel.address')} : </b>{this.state.day.hotel.address}
                            </p>
                            <p className="hotel-phone">
                                <b>{T.translate('hotel.phone')} : </b>{this.state.day.hotel.phone}
                            </p>
                        </CardContent>
                    </Card>
                </section>
            );
        } else {
            return (
                <section className="hotel-details">
                    <Card raised={true} classes={{ root: "card no-hotel" }}>
                        <p>{T.translate('hotel.create')}</p>
                        <Button onClick={this.handleClick} variant="fab" color="primary" aria-label="add" >
                            <AddIcon />
                        </Button>
                        <HotelDialog hotel={this.state.day.hotel || {checkIn:this.state.day.date}} open={this.state.open} onClose={this.handleClose} onSave={this.handleSave}></HotelDialog>
                    </Card>
                </section>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        currentDay: state.days.currentDay,
        days: state.days.list
    }
}

export default connect(mapStateToProps, { setHotel })(Hotelbox);
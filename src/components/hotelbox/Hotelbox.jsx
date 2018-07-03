import React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, Typography, CardContent, Button, Divider } from '@material-ui/core';
import { setHotel } from '../../actions/dayActions';
import AddIcon from '@material-ui/icons/Add';
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

    componentWillUpdate(nextProps) {
        if (nextProps.currentDay !== this.props.currentDay || nextProps.days !== this.props.days) {
            this.setState({
                currentDay: nextProps.currentDay,
                day: nextProps.days[nextProps.currentDay],
                open: false,
            });
        }
    }

    render() {
        if (this.state.day.hotel) {
            return (
                <section className="hotel-details">
                    <Card raised={true} classes={{ root: "card" }}>
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {this.state.day.hotel.name}
                            </Typography>
                            <Divider />
                            <div className="hotel-info">
                                <div>
                                    <p>{T.translate('check-in')}</p>
                                    <span>{new Date(this.state.day.hotel.checkIn).toLocaleDateString(getNavigatorLanguage(true), { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div>
                                    <p>{T.translate('check-out')}</p>
                                    <span>{new Date(this.state.day.hotel.checkOut).toLocaleDateString(getNavigatorLanguage(true), { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            );
        } else {
            return (
                <section className="hotel-details">
                    <Card raised={true} classes={{ root: "card no-hotel" }}>
                        <p>Add an hotel</p>
                        <Button onClick={this.handleClick} variant="fab" color="primary" aria-label="add" >
                            <AddIcon />
                        </Button>
                        <HotelDialog hotel={this.state.day.hotel} date={this.state.day.date} open={this.state.open} onClose={this.handleClose} onSave={this.handleSave}></HotelDialog>
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
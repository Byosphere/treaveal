import React from 'react';
import { connect } from 'react-redux';
import { ListItem, Avatar, ListItemText, List, ListItemSecondaryAction, IconButton, Chip, Menu, MenuItem, Button, Divider, TextField } from '@material-ui/core';
import LocationCity from '@material-ui/icons/LocationCity';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Delete from '@material-ui/icons/Delete';
import LocalActivity from '@material-ui/icons/LocalActivity';
import Flight from '@material-ui/icons/Flight';
import Note from '@material-ui/icons/Note';
import AccessTime from '@material-ui/icons/AccessTime';
import Timeline from '../../components/timeline/Timeline.jsx';
import Dashboard from '@material-ui/icons/Dashboard';
import DeleteDayDialog from '../../components/dialog/deleteDayDialog/DeleteDayDialog.jsx';
import { setDay, deleteDay, setEvent } from '../../actions/dayActions';
import { EVENT_ACTIVITY, EVENT_TEXT, EVENT_TRANSPORT } from '../../Constants';
import T from 'i18n-react';
import { getNavigatorLanguage } from '../../utils/helpers';
import EventDialog from '../../components/dialog/eventdialog/EventDialog.jsx';

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchor: null,
            day: this.props.days[this.props.currentDay],
            currentDay: this.props.currentDay,
            open: false,
            deleteDayDialogOpen: false,
            eventDialogOpen: false,
            currentEvent: {}
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openDayDialog = this.openDayDialog.bind(this);
        this.closeDayDialog = this.closeDayDialog.bind(this);
        this.saveDayDialog = this.saveDayDialog.bind(this);
        this.deleteDay = this.deleteDay.bind(this);
        this.openDeleteDayDialog = this.openDeleteDayDialog.bind(this);
        this.openEventDialog = this.openEventDialog.bind(this);
        this.closeEvenDialog = this.closeEvenDialog.bind(this);
        this.saveEventDialog = this.saveEventDialog.bind(this);
    }

    handleClick(event) {
        this.setState({ anchor: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchor: null });
    };

    openDayDialog() {
        this.setState({
            open: true,
        });
    }

    saveDayDialog(day) {
        day.date = this.props.arrival;
        this.props.setDay(day);
        this.setState({
            open: false,
            day
        });
    }

    closeDayDialog() {
        this.setState({
            open: false,
        });
    }

    openDeleteDayDialog() {
        this.setState({
            deleteDayDialogOpen: true
        });
    }

    openEventDialog() {
        this.setState({
            eventDialogOpen: true
        });
    }

    closeEvenDialog() {
        this.setState({
            eventDialogOpen: false
        });
    }

    saveEventDialog(event) {
        this.props.setEvent(event);
        this.setState({
            eventDialogOpen: false
        });
    }

    deleteDay() {
        this.props.deleteDay(this.state.currentDay);
        this.setState({
            deleteDayDialogOpen: false
        });
    }

    getAvatarFromType(type) {
        switch (type) {
            case EVENT_ACTIVITY:
                return (<LocalActivity />);
            case EVENT_TRANSPORT:
                return (<Flight />);
            case EVENT_TEXT:
                return (<Note />);
            default:
                return (<Note />);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentDay !== state.currentDay || props.days[props.currentDay] !== state.day) {
            return {
                day: props.days[props.currentDay],
                currentDay: props.currentDay
            }
        }
        return null;
    }

    render() {
        const day = this.state.day;
        const list = this.state.day.events || [];
        return (
            <section className="main-page">
                <div className="app-bar"><Dashboard /><h2>{T.translate("overview")}</h2></div>
                <Timeline></Timeline>
                <div className="wrapper">
                    <div className="day-tags">
                        <Chip
                            avatar={
                                <Avatar>
                                    <LocationCity />
                                </Avatar>
                            }
                            label="Guangzhou"
                        />
                    </div>
                    <div className="buttons">
                        <IconButton aria-haspopup="true" className={this.props.days.length === 1 ? "icon-button disabled" : "icon-button"} onClick={this.openDeleteDayDialog} aria-label="delete" disabled={this.props.days.length === 1}>
                            <Delete />
                        </IconButton>
                        <DeleteDayDialog open={this.state.deleteDayDialogOpen} onClose={() => { this.setState({ deleteDayDialogOpen: false }) }} onDelete={this.deleteDay} />
                    </div>
                    <header>
                        <h2>{T.translate('day')} {this.state.currentDay + 1}</h2>
                        <div className="subtitle">
                            <span className="day-date">{new Date(this.state.day.date).toLocaleDateString(getNavigatorLanguage(true), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="day-name">{this.state.day.name || "___"}</span>
                        </div>
                    </header>
                    <Divider />
                    <List>
                        {list.length === 0 && (
                            <li className="button-list">
                                <p>{T.translate('event.no-event')}</p>
                                <Button color="primary" onClick={this.openEventDialog}>
                                    {T.translate('event.add')}
                                </Button>
                            </li>
                        )}
                        {list.map((e, i) => (
                            <ListItem key={i}>
                                <Avatar>
                                    {this.getAvatarFromType(e.type)}
                                </Avatar>
                                <ListItemText primary={e.title} secondary={e.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-haspopup="true" onClick={this.handleClick} aria-label="edit" aria-owns={this.state.anchor ? 'item-main-menu-' + i : null}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id={"item-main-menu" + 1}
                                        anchorEl={this.state.anchor}
                                        open={Boolean(this.state.anchor)}
                                        onClose={this.handleClose}>
                                        <MenuItem onClick={this.handleClose}>Edit</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Move Up</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Move Down</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Delete</MenuItem>
                                    </Menu>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        {list.length > 0 && (
                            <li className="button-list">
                                <Button color="primary" onClick={this.openEventDialog}>
                                    {T.translate('event.add')}
                                </Button>
                            </li>
                        )}
                    </List>
                </div>
                <EventDialog event={this.state.currentEvent} open={this.state.eventDialogOpen} onClose={this.closeEvenDialog} onSave={this.saveEventDialog} ></EventDialog>
            </section >
        );
    }
}
function mapStateToProps(state) {
    return {
        currentDay: state.days.currentDay,
        days: state.days.list,
        arrival: state.travel.departureDate
    }
}

export default connect(mapStateToProps, { setDay, deleteDay, setEvent })(MainPage);
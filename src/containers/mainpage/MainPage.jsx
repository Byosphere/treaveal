import React from 'react';
import { connect } from 'react-redux';
import { ListItem, Avatar, ListItemText, List, ListItemSecondaryAction, IconButton, Chip, Menu, MenuItem, Button, Divider, TextField } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Delete from '@material-ui/icons/Delete';
import AccessTime from '@material-ui/icons/AccessTime';
import Timeline from '../../components/timeline/Timeline.jsx';
import Dashboard from '@material-ui/icons/Dashboard';
import DeleteDayDialog from '../../components/dialog/deleteDayDialog/DeleteDayDialog.jsx';
import { setDay, deleteDay } from '../../actions/dayActions';
import T from 'i18n-react';
import { getNavigatorLanguage } from '../../utils/helpers';

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchor: null,
            day: this.props.days[this.props.currentDay],
            currentDay: this.props.currentDay,
            open: false,
            deleteDayDialogOpen: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openDayDialog = this.openDayDialog.bind(this);
        this.closeDayDialog = this.closeDayDialog.bind(this);
        this.saveDayDialog = this.saveDayDialog.bind(this);
        this.deleteDay = this.deleteDay.bind(this);
        this.openDeleteDayDialog = this.openDeleteDayDialog.bind(this);
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
        })
    }

    deleteDay() {
        this.props.deleteDay(this.state.currentDay);
        this.setState({
            deleteDayDialogOpen: false
        });
    }

    componentWillUpdate(nextProps) {

        if (nextProps.currentDay !== this.state.currentDay || nextProps.days !== this.props.days) {
            this.setState({
                day: nextProps.days[nextProps.currentDay],
                currentDay: nextProps.currentDay
            });
        }
    }

    render() {
        const day = this.state.day;
        const list = this.state.day.events || [];
        return (
            <section className="main-page">
                <div className="app-bar"><Dashboard /><h2>{T.translate("overview")}</h2></div>
                <Timeline></Timeline>
                <div className="wrapper">
                    <div className="page-people">
                        <Chip
                            avatar={
                                <Avatar>
                                    <AccessTime />
                                </Avatar>
                            }
                            label={new Date(this.state.day.date).toLocaleDateString(getNavigatorLanguage(true), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        />
                    </div>
                    <div className="buttons">
                        <IconButton aria-haspopup="true" className={this.props.days.length === 1 ? "icon-button disabled" : "icon-button"} onClick={this.openDeleteDayDialog} aria-label="delete" disabled={this.props.days.length === 1}>
                            <Delete />
                        </IconButton>
                        <DeleteDayDialog day-id={this.state.currentDay} open={this.state.deleteDayDialogOpen} onClose={() => { this.setState({ deleteDayDialogOpen: false }) }} onDelete={this.deleteDay} />
                    </div>
                    <Divider />
                    <header>
                        <h2>{T.translate('day')} {this.state.currentDay + 1}</h2>
                        <TextField
                            id="full-width"
                            placeholder="day name"
                            fullWidth
                            margin="normal"
                        />
                        <Button color="primary">
                            {T.translate('save')}
                        </Button>
                    </header>
                    <List>
                        {list.length === 0 && (
                            <li className="button-list">
                                <p>Rien n'a été défini ce jour.</p>
                                <Button color="primary" >
                                    Ajouter un événement
                            </Button>
                            </li>
                        )}
                        {list.map((e, i) => (
                            <ListItem key={i}>
                                <Avatar>
                                    {{
                                        'activity': (
                                            <ImageIcon />
                                        ),
                                        'transport': (
                                            <ImageIcon />
                                        ),
                                        'plaintext': (
                                            <ImageIcon />
                                        ),
                                        default: (
                                            <ImageIcon />
                                        )
                                    }[e.type]}
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
                                <Button color="primary">
                                    Ajouter un événement
                        </Button>
                            </li>
                        )}
                    </List>
                </div>
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

export default connect(mapStateToProps, { setDay, deleteDay })(MainPage);
import React from 'react';
import { connect } from 'react-redux';
import { ListItem, Avatar, ListItemText, List, ListItemSecondaryAction, IconButton, Chip, Menu, MenuItem, Button, Divider } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Delete from '@material-ui/icons/Delete';
import Timeline from '../../components/timeline/Timeline.jsx';
import Dashboard from '@material-ui/icons/Dashboard';
import DayDialog from '../../components/dialog/daydialog/DayDialog.jsx'
import { setDay } from '../../actions/dayActions';
import T from 'i18n-react';

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchor: null,
            day: this.props.days[this.props.currentDay],
            currentDay: this.props.currentDay,
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openDayDialog = this.openDayDialog.bind(this);
        this.closeDayDialog = this.closeDayDialog.bind(this);
        this.saveDayDialog = this.saveDayDialog.bind(this);
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
        this.props.setDay(day, true);
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

    componentWillUpdate(nextProps) {

        if (nextProps.currentDay !== this.state.currentDay) {
            this.setState({
                day: nextProps.days[nextProps.currentDay],
                currentDay: nextProps.currentDay
            });
        }
    }

    render() {
        const day = this.state.day;

        if (day) {
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
                                        <FaceIcon />
                                    </Avatar>
                                }
                                onDelete={this.handleDelete}
                                label="Yohann"
                            />
                            <Chip
                                avatar={
                                    <Avatar>
                                        <FaceIcon />
                                    </Avatar>
                                }
                                onDelete={this.handleDelete}
                                label="Maxime"
                            />
                        </div>
                        <div className="buttons">
                            <IconButton aria-haspopup="true" className="icon-button" onClick={this.handleClick} aria-label="delete">
                                <Delete />
                            </IconButton>
                        </div>
                        <Divider />
                        <header>
                            <h2>{T.translate('day')} {this.state.currentDay + 1}</h2>
                            <span>- {day.city} - </span>
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
        } else {
            return (
                <section className="main-page unset">
                    <div className="app-bar"><Dashboard /><h2>Vue d'ensemble</h2></div>
                    <Timeline></Timeline>
                    <div className="wrapper empty">
                        <span className="button-label">Add a day</span>
                        <Button onClick={this.openDayDialog} variant="fab" color="primary" aria-label="add">
                            <AddIcon />
                        </Button>
                        <DayDialog open={this.state.open} onClose={this.closeDayDialog} onSave={this.saveDayDialog} />
                    </div>
                </section>
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        currentDay: state.days.currentDay,
        days: state.days.list
    }
}

export default connect(mapStateToProps, { setDay })(MainPage);
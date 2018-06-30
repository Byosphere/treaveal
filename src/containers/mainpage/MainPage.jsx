import React from 'react';
import { connect } from 'react-redux';
import { ListItem, Avatar, ListItemText, List, ListItemSecondaryAction, IconButton, Chip, Menu, MenuItem, Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import FaceIcon from '@material-ui/icons/Face';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Timeline from '../../components/timeline/Timeline.jsx';
import Dashboard from '@material-ui/icons/Dashboard';

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchor: null,
            day: this.props.days[this.props.currentDay],
            currentDay: this.props.currentDay
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({ anchor: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchor: null });
    };

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
                    <Timeline></Timeline>
                    <div className="app-bar"><Dashboard /><h2>Vue d'ensemble</h2></div>
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
                    <div className="page-date">
                        <Chip label={day.date} />
                    </div>
                    <header>
                        <h2>Jour {this.state.currentDay}</h2>
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
                </section >
            );
        } else {
            return (
                <section className="main-page unset">
                    <Timeline></Timeline>
                    <div className="app-bar"><Dashboard /><h2>Vue d'ensemble</h2></div>
                </section >
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        currentDay: state.travel.currentDay,
        days: state.days.days
    }
}

export default connect(mapStateToProps, {})(MainPage);
import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

class TravelDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title || '',
            location: this.props.location || '',
            daysNum: this.props.daysNum || ''
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    handleSave() {
        this.props.onSave(this.state.title, this.state.location, this.state.daysNum, null);
    }

    handleChange(name, event) {
        this.setState({
            [name]: event.target.value
        });
    }

    render() {

        return (
            <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="travel-dialog" className="travel-dialog dialog" >
                <DialogTitle id="travel-dialog-title">Edit travel</DialogTitle>
                <DialogContent>
                    <TextField
                        id="title"
                        label="Title"
                        placeholder={this.state.title}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('title', evt)}
                    />
                    <TextField
                        id="location"
                        label="Location"
                        placeholder={this.state.location}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('location', evt)}
                    />
                    <TextField
                        id="daysNumber"
                        label="Number of days"
                        placeholder={this.state.daysNum + ''}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('daysNum', evt)}
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        Cancel
                </Button>
                    <Button onClick={this.handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        title: state.travel.title,
        location: state.travel.location,
        daysNum: state.travel.daysNum
    }
}

export default connect(mapStateToProps)(TravelDialog);
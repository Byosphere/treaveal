import React from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { COUNTRY_CODES } from '../../Constants';
import { getCountryFromCountryCode } from '../../utils/helpers';

class TravelDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title || '',
            location: this.props.location || '',
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    handleSave() {
        this.props.onSave(this.state.title, this.state.location);
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
                        value={this.state.title}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('title', evt)}
                    />
                    <FormControl>
                        <InputLabel htmlFor="location">Trip country</InputLabel>
                        <Select
                            value={this.state.location}
                            onChange={(evt) => this.handleChange('location', evt)}
                            className="cover__input"
                            inputProps={{
                                name: 'location',
                                id: 'location',
                            }}>
                            {COUNTRY_CODES.map((e, i) => (
                                <MenuItem key={i} value={e.code}>{e.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
        location: state.travel.location
    }
}

export default connect(mapStateToProps)(TravelDialog);
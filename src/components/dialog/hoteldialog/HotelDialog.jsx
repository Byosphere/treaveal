import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

class HotelDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.hotel.name,
            checkIn: this.props.hotel.checkIn,
            checkOut: this.props.hotel.checkOut,
            phone: this.props.hotel.phone,
            address: this.props.hotel.address,
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    handleSave() {
        this.props.onSave(this.state);
    }

    handleChange(name, event) {
        this.setState({
            [name]: event.target.value
        });
    }

    render() {

        return (
            <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="hotel-dialog" className="hotel-dialog dialog" >
                <DialogTitle id="travel-dialog-title">Create a Hotel Card</DialogTitle>
                <DialogContent>
                    <TextField
                        id="hotel-name"
                        label="Hotel name"
                        placeholder={this.state.name}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('name', evt)}
                    />
                    <TextField
                        id="hotel-checkin"
                        defaultValue={this.state.checkIn}
                        label="Hotel Check in"
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        onChange={(evt) => this.handleChange('checkIn', evt)}
                    />
                    <TextField
                        id="hotel-checkout"
                        defaultValue={this.state.checkOut}
                        margin="normal"
                        label="Hotel Check out"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(evt) => this.handleChange('checkOut', evt)}
                    />
                    <TextField
                        id="hotel-name"
                        label="Hotel phone number"
                        placeholder={this.state.phone}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('phone', evt)}
                    />
                    <TextField
                        id="hotel-name"
                        label="Hotel address"
                        placeholder={this.state.address}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('address', evt)}
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

export default HotelDialog;
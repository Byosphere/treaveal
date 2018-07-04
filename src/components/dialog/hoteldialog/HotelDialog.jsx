import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControlLabel, Checkbox, Divider } from '@material-ui/core';
import T from 'i18n-react';

class HotelDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.hotel.name,
            checkIn: this.props.hotel.checkIn,
            checkOut: this.props.hotel.checkOut,
            phone: this.props.hotel.phone,
            address: this.props.hotel.address,
            autocomplete: false,
            nameError: '',
            checkInError: '',
            checkOutError: ''
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose() {
        this.setState({
            name: '',
            checkIn: this.props.date,
            checkOut: '',
            phone: '',
            address: '',
            autocomplete: false,
            nameError: '',
            checkInError: '',
            checkOutError: ''
        });
        this.props.onClose();
    }

    verifyHotelData() {
        let valid = true;
        this.setState({
            nameError: '',
            checkInError: '',
            checkOutError: ''
        });

        if (!this.state.name) {
            this.setState({
                nameError: T.translate('error-message')
            });
            valid = false;
        }
        if (!this.state.checkIn) {
            valid = false;
            this.setState({
                checkInError: T.translate('error-message')
            });
        }
        if (!this.state.checkOut) {
            valid = false;
            this.setState({
                checkOutError: T.translate('error-message')
            });
        }
        if (new Date(this.state.checkIn) > new Date(this.state.checkOut)) {
            this.setState({
                checkInError: T.translate('hotel.error-hotel-date'),
                checkOutError: T.translate('hotel.error-hotel-date')
            });
            valid = false;
        }
        return valid;
    }

    handleSave() {
        if (this.verifyHotelData()) {
            this.props.onSave(this.state, this.state.autocomplete);
            this.props.onClose();
        }
    }

    handleChange(name, event) {
        this.setState({
            [name]: event.target.value
        });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.hotel.checkIn !== state.checkIn) {
            return {
                checkIn: props.hotel.checkIn
            }
        }
        return null;
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="hotel-dialog" className="hotel-dialog dialog" >
                <DialogTitle id="hotel-dialog-title">{T.translate('hotel.create')}</DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        id="hotel-name"
                        label={T.translate('hotel.name')}
                        placeholder={this.state.name}
                        margin="normal"
                        fullWidth
                        required
                        error={this.state.nameError ? true : false}
                        helperText={this.state.nameError}
                        onChange={(evt) => this.handleChange('name', evt)}
                    />
                    <TextField
                        id="hotel-checkin"
                        value={this.state.checkIn}
                        label={T.translate('hotel.check-in')}
                        margin="normal"
                        type="date"
                        required
                        error={this.state.checkInError ? true : false}
                        helperText={this.state.checkInError}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        disabled={true}
                    />
                    <TextField
                        id="hotel-checkout"
                        defaultValue={this.state.checkOut}
                        margin="normal"
                        error={this.state.checkOutError ? true : false}
                        helperText={this.state.checkOutError}
                        label={T.translate('hotel.check-out')}
                        type="date"
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(evt) => this.handleChange('checkOut', evt)}
                    />
                    <TextField
                        id="hotel-phone"
                        label={T.translate('hotel.phone')}
                        placeholder={this.state.phone}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('phone', evt)}
                    />
                    <TextField
                        id="hotel-address"
                        label={T.translate('hotel.address')}
                        placeholder={this.state.address}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('address', evt)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.autocomplete}
                                onChange={() => this.setState({ autocomplete: !this.state.autocomplete })}
                                color="primary"
                            />
                        }
                        label={T.translate('hotel.autocomplete')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={!this.props.hotel} onClick={this.handleClose} color="secondary">
                        {T.translate('hotel.delete')}
                    </Button>
                    <Button onClick={this.handleClose}>
                        {T.translate('cancel')}
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        {T.translate('save')}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

HotelDialog.propTypes = {
    'open': PropTypes.bool.isRequired,
    'onClose': PropTypes.func.isRequired,
    'onSave': PropTypes.func.isRequired,
    'hotel': PropTypes.object.isRequired
}

export default HotelDialog;
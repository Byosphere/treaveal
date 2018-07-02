import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import T from 'i18n-react';

class HotelDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.hotel.name,
            checkIn: this.props.hotel.checkIn || this.props.date,
            checkOut: this.props.hotel.checkOut,
            phone: this.props.hotel.phone,
            address: this.props.hotel.address,
            autocomplete: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    handleSave() {
        this.props.onSave(this.state, this.state.autocomplete);
    }

    handleChange(name, event) {
        this.setState({
            [name]: event.target.value
        });
    }

    render() {

        return (
            <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="hotel-dialog" className="hotel-dialog dialog" >
                <DialogTitle id="travel-dialog-title">{T.translate('hotel.create')}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="hotel-name"
                        label={T.translate('hotel.name')}
                        placeholder={this.state.name}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('name', evt)}
                    />
                    <TextField
                        id="hotel-checkin"
                        value={this.state.checkIn}
                        label={T.translate('hotel.check-in')}
                        margin="normal"
                        type="date"
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
                        label={T.translate('hotel.check-out')}
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(evt) => this.handleChange('checkOut', evt)}
                    />
                    <TextField
                        id="hotel-name"
                        label={T.translate('hotel.phone')}
                        placeholder={this.state.phone}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('phone', evt)}
                    />
                    <TextField
                        id="hotel-name"
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
                    <Button onClick={this.handleClose} color="secondary">
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

export default HotelDialog;
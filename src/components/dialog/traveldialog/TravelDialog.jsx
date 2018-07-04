import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Divider } from '@material-ui/core';
import { COUNTRY_CODES } from '../../../Constants';
import T from 'i18n-react';

class TravelDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title || '',
            location: this.props.location || ''
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handledeleteTravel = this.handledeleteTravel.bind(this);
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

    handledeleteTravel() {
        // TODO
    }

    render() {

        return (
            <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="travel-dialog" className="travel-dialog dialog" >
                <DialogTitle id="travel-dialog-title">{T.translate('header.edit')}</DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        id="title"
                        label={T.translate('cover.form.title')}
                        value={this.state.title}
                        margin="normal"
                        fullWidth
                        onChange={(evt) => this.handleChange('title', evt)}
                    />
                    <FormControl>
                        <InputLabel htmlFor="location">{T.translate('cover.form.location')}</InputLabel>
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
                    <Button onClick={this.handledeleteTravel} color="secondary">
                        {T.translate('delete-travel')}
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

TravelDialog.propTypes = {
    'title': PropTypes.string,
    'location': PropTypes.string,
    'open': PropTypes.bool.isRequired,
    'onClose': PropTypes.func.isRequired,
    'onSave': PropTypes.func.isRequired,
}

export default TravelDialog;
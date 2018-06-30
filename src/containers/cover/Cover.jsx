import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { COUNTRY_CODES } from '../../Constants';
import { saveTravelInfo } from '../../actions/travelActions';

class Cover extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            nameError: false,
            locationError: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClick() {
        if (this.state.name === '') {
            this.setState({
                nameError: "true"
            });
        }

        if (this.state.location === '') {
            this.setState({
                locationError: "true"
            });
        }

        if (this.state.location && this.state.name) {
            this.setState({
                nameError: "false",
                locationError: "false"
            });

            this.props.saveTravelInfo(this.state.name, this.state.location);
        }

    }

    render() {

        return (
            <section className="cover">
                <div className="logo">
                    <h1>TREVEAL</h1>
                    <span>Dashboard</span>
                </div>
                <p>Plan your trip in a few clicks</p>
                <TextField
                    id="name"
                    label="Trip name"
                    name="name"
                    className="cover__input"
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"
                    error={this.state.nameError}
                />
                <FormControl>
                    <InputLabel htmlFor="location">Trip country</InputLabel>
                    <Select
                        value={this.state.location}
                        onChange={this.handleChange}
                        className="cover__input"
                        inputProps={{
                            name: 'location',
                            id: 'location',
                            error: this.state.locationError
                        }}>
                        {COUNTRY_CODES.map((e, i) => (
                            <MenuItem key={i} value={e.code}>{e.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={this.handleClick} color="primary">
                    Create the plan
                </Button>
            </section>
        );
    }
}

export default connect(null, { saveTravelInfo })(Cover);
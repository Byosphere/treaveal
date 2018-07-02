import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Card } from '@material-ui/core';
import { COUNTRY_CODES } from '../../Constants';
import { saveTravelInfo } from '../../actions/travelActions';
import { setDay } from '../../actions/dayActions';
import T from 'i18n-react';

class Cover extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            nameError: false,
            locationError: false,
            date: '',
            dateError: false
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
                nameError: true
            });
        }

        if (this.state.location === '') {
            this.setState({
                locationError: true
            });
        }

        if (this.state.date === '') {
            this.setState({
                dateError: true
            });
        }

        if (this.state.location && this.state.name) {
            this.setState({
                nameError: false,
                locationError: false,
                dateError: false
            });

            this.props.saveTravelInfo(this.state.name, this.state.location, null, this.state.date);
            this.props.setDay({ name: this.state.name, date: this.state.date });
        }
    }

    render() {

        return (
            <section className="cover">
                <Card className="cover-card">
                    <div className="logo">
                        <h1>{T.translate('app-name')}</h1>
                        <span>{T.translate('app-subtitle')}</span>
                    </div>
                    <p>{T.translate('cover.subtitle')}</p>
                    <TextField
                        id="name"
                        label={T.translate('cover.form.title')}
                        name="name"
                        className="cover__input"
                        value={this.state.name}
                        onChange={this.handleChange}
                        margin="normal"
                        error={this.state.nameError}
                        required
                    />
                    <FormControl>
                        <InputLabel error={this.state.locationError} required htmlFor="location">{T.translate('cover.form.location')}</InputLabel>
                        <Select
                            value={this.state.location}
                            onChange={this.handleChange}
                            className="cover__input"
                            required
                            error={this.state.locationError}
                            inputProps={{
                                name: 'location',
                                id: 'location',
                            }}>
                            {COUNTRY_CODES.map((e, i) => (
                                <MenuItem key={i} value={e.code}>{e.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="date"
                        label={T.translate('cover.form.departure')}
                        name="date"
                        required
                        className="cover__input"
                        value={this.state.date}
                        onChange={this.handleChange}
                        margin="normal"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={this.state.dateError}
                    />
                    <Button onClick={this.handleClick} color="primary">
                        {T.translate('cover.form.validate')}
                    </Button>
                </Card>
            </section>
        );
    }
}

export default connect(null, { saveTravelInfo, setDay })(Cover);
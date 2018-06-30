import React from 'react';
import { connect } from 'react-redux';
import { TextField, Card, CardContent, Button } from '@material-ui/core';
import { saveTravelInfo } from '../../actions/travelActions';

class Notes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.notes || "",
            disabled: true,
            savedValue: ""
        }
        this.textChange = this.textChange.bind(this);
        this.save = this.save.bind(this);
    }

    textChange(event) {
        this.setState({
            value: event.target.value,
            disabled: (event.target.value == this.state.savedValue)
        });
    }

    save() {
        this.props.saveTravelInfo(null, null, null, this.state.value);
        this.setState({
            disabled: true,
            savedValue: this.state.value
        })
    }

    render() {
        return (
            <section className="notes">
                <Card raised={true}>
                    <CardContent className="card-content">
                        <TextField
                            id="multiline-static"
                            label="Notes"
                            multiline
                            rows="4"
                            margin="none"
                            fullWidth={true}
                            className="large-text-field"
                            onChange={this.textChange}
                            value={this.state.value}
                        />
                        <Button onClick={this.save} variant="contained" color="secondary" disabled={this.state.disabled}> Save </Button>
                    </CardContent>
                </Card>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.travel.notes
    }
}

export default connect(mapStateToProps, { saveTravelInfo })(Notes);
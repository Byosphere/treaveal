import React from 'react';
import { connect } from 'react-redux';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { setCurrentDay } from '../../actions/travelActions';

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentDay: this.props.currentDay || 1,
            daysNum: this.props.daysNum || 1,
        }
    }

    handleNext() {
        this.props.setCurrentDay(this.state.currentDay + 1);
        this.setState(state => ({
            currentDay: state.currentDay + 1,
        }));

    }

    handleBack() {
        this.props.setCurrentDay(this.state.currentDay - 1);
        this.setState(state => ({
            currentDay: state.currentDay - 1,
        }));

    }

    componentWillUpdate(nextProps) {
        if (nextProps.daysNum !== this.props.daysNum) {
            if (this.state.currentDay >= nextProps.daysNum) {
                this.setState({
                    currentDay: this.state.daysNum
                });
            }
            this.setState({
                daysNum: nextProps.daysNum
            });
        }
    }

    render() {
        return (
            <section className="timeline">
                <MobileStepper
                    classes={{ dot: 'dot', root: 'stepper', dotActive: 'active' }}
                    steps={this.state.daysNum}
                    position="static"
                    activeStep={this.state.currentDay - 1}
                    nextButton={
                        <Button size="small" onClick={this.handleNext.bind(this)} disabled={this.state.currentDay === this.state.daysNum}>
                            Next
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack.bind(this)} disabled={this.state.currentDay === 1}>
                            <KeyboardArrowLeft />
                            Back
                        </Button>
                    }
                />
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        daysNum: state.travel.daysNum,
        currentDay: state.travel.currentDay,
    }
}

export default connect(mapStateToProps, { setCurrentDay })(Timeline);
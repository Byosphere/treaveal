import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/header/Header.jsx';
import MainPage from '../mainpage/MainPage.jsx';
import Spending from '../spending/Spending.jsx';
import Cover from '../cover/Cover.jsx';
import Footer from '../footer/Footer.jsx';
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Notes from '../../components/notes/Notes.jsx';
import Toolbox from '../../components/toolbox/Toolbox.jsx';
import Hotelbox from '../../components/hotelbox/Hotelbox.jsx';
import Flight from '../../components/flight/Flight.jsx';


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.init) {
            return (
                <div id="home">
                    <section className="app-name">
                        <h1>TREVEAL</h1>
                        <span>Dashboard</span>
                    </section>
                    <Header></Header>
                    <Sidebar></Sidebar>
                    <Flight></Flight>
                    <Toolbox></Toolbox>
                    <Notes></Notes>
                    <Switch>
                        <Route exact path='/dashboard' component={MainPage} />
                        <Route exact path='/spending' component={Spending} />
                        <Redirect to="/dashboard" />
                    </Switch>
                    <Hotelbox></Hotelbox>
                    <Footer></Footer>
                </div>
            );
        } else {
            return (
                <Cover></Cover>
            );
        }

    }
}

function mapStateToProps(state) {
    return {
        init: state.travel.init
    }
}

export default connect(mapStateToProps, {})(Home);
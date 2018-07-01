import React from 'react';
import Timeline from '../../components/timeline/Timeline.jsx';
import AttachMoney from '@material-ui/icons/AttachMoney';
import T from 'i18n-react';

class Activities extends React.Component {

    render() {

        return (
            <section className="activities">
                <div className="app-bar"><AttachMoney /><h2>{T.translate("spending")}</h2></div>
                <div className="wrapper"></div>
            </section>
        );
    }
}

export default Activities;
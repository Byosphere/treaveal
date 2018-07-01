import React from 'react';
import { Button, Avatar } from '@material-ui/core';
import PersonOutline from '@material-ui/icons/PersonOutline';
import T from 'i18n-react';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="login">
                <Avatar className="avatar">
                    <PersonOutline />
                </Avatar>
                <div className="button-group">
                    <Button className="red" size="small" color="inherit">{T.translate('login.subscribe')}</Button>
                    <Button size="small" color="inherit">{T.translate('login.login')}</Button>
                </div>
            </section>
        );
    }
}

export default Login;
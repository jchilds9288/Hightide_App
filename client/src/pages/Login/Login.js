import React, {Component, useState} from 'react';
import {Redirect} from "react-router-dom";
import {Col, Row, Container} from '../../components/Grid';
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// import API from '../../utils/API';
const useStyles = makeStyles(theme => ({
  google: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    height: '100%',
    color: 'black',
    fontWeight: 'bold'
  }
}));

export default function Login() {

    const [userInfo, setUser] = useState({
      isAuthenticated: false,
      user: null,
      token: null
    });

    const classes = useStyles();

    const onFailure = (error) => {
        alert(error);
    }

    const googleResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], {type: 'application/json' });
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('/api/user/auth/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                console.log('User authenticated :: ', user);
                if (token) {
                    sessionStorage.setItem('user', JSON.stringify(user));
                    setUser({
                      isAuthenticated: true,
                      user,
                      token
                    })
                    console.log(`found: ${JSON.stringify(user)}`)
                }
            });
        })
    };

    let content = !!userInfo.isAuthenticated ?
    (
        <Redirect to="/Profile" />
    ) :
    (
        <div>
             <Container fluid>
                <Row>
                    <Col size="md-12" className={classes.google}>
                            <GoogleLogin
                                clientId={config.GOOGLE_CLIENT_ID}
                                buttonText="Login Using Your Google Account"
                                onSuccess={googleResponse}
                                onFailure={googleResponse}
                                className={classes.google}
                            />
                    </Col>
                </Row>
            </Container>
        </div>
    );

    return (
        <div className='App'>
            {content}
        </div>
    );
}

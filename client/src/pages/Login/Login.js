import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {Col, Row, Container} from '../../components/Grid';
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';

// import API from '../../utils/API';

class Login extends Component {
    state = {
        isAuthenticated: false,
        user: null,
    };
    
    onFailure = (error) => {
        alert(error);
    }

    googleResponse = (response) => {
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
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
    };

    render(){
        let content = !!this.state.isAuthenticated ?
        (
            <Redirect to="/Profile" />
        ) :
        (
            <div>
                 <Container fluid>
                    <Row>
                        <Col size="md-4">
                            <div>
                                <GoogleLogin
                                    clientId={config.GOOGLE_CLIENT_ID}
                                    buttonText="Login"
                                    onSuccess={this.googleResponse}
                                    onFailure={this.googleResponse}
                                />
                            </div>
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
}

export default Login;





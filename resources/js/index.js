import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';

class Index extends Component {
	render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            {
                                routes.map((route) => {
                                    return (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            render={(props) => {
                                                return <route.component {...props} />
                                            }}
                                        />
                                    );
                                })
                            }
                        </Switch>
                    </div>
                </Router>
            </div>
        );
	}
}

export default Index;

if (document.getElementById('nexos-app')) {
    ReactDOM.render(<Index />,
    document.getElementById('nexos-app'));
}

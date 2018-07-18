import { Screen, Divider } from '@shoutem/ui';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { connect, Provider } from 'react-redux';

import rootReducer from './reducers/reducer';
import { initData } from './actions/actions';

import CurrentValue from './components/CurrentValue';
import TransactionVolumeGraph from './components/TransactionVolumeGraph';
import Description from './Description';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(initData());
    }

    render() {
        return (
            <Screen>
                <Divider />
                <CurrentValue />
                <Divider />
                <Divider />
                <TransactionVolumeGraph />
                <Divider />
                <Description />
            </Screen>
        )
    }
}

const connectedApp = connect(state => state)(App);

export default () => (
    <Provider store={store}>
        <ConnecteApp />
    </Provider>
);
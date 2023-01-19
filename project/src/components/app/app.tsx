import Main from '../main/main';
import {Offer, State} from '../../types/types-and-mock';

const App = (props: {offers: Offer[]; city: State}): JSX.Element => <Main offers={props.offers} city={props.city} />;

export default App;

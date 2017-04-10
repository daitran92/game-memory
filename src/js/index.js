import '../scss/index.scss';

import { render } from 'react-dom';
import routes from './routes';

const element = document.getElementById('content');
render(routes, element);

document.body.classList.remove('loading');

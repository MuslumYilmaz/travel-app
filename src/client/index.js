import { calculateDay } from './js/calculateDay';
import { get, postData, updateUI } from './js/app';

import './styles/saved-trip.scss';
import './styles/styles.scss';

var requireContext = require.context("./icons", true, /^\.\/.*\.png$/);
requireContext.keys().map(requireContext);

export {
    get,
    postData,
    updateUI
}
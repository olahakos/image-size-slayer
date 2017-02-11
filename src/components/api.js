import debugLib from 'debug';

import config from '../../conf/config';

const debug = debugLib('slayer:api:log');
const getBase64 = (file) => {
  debug(file, config);
};

module.exports = {
  getBase64,
};

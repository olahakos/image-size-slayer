import debugLib from 'debug';
import request from 'superagent';

import config from '../../conf/config';

const debug = debugLib('slayer:api:log');
const debugErr = debugLib('slayer:api:error');
const fileReader = new FileReader();

function getAnnotations(base64) {
  const url = 'https://vision.googleapis.com/v1/images:annotate?key=';
  const req = {
    requests: [{
      features: [
        {type: 'TYPE_UNSPECIFIED', maxResults: 50},
        {type: 'LANDMARK_DETECTION', maxResults: 50},
        {type: 'FACE_DETECTION', maxResults: 50},
        {type: 'LOGO_DETECTION', maxResults: 50},
        {type: 'LABEL_DETECTION', maxResults: 50},
        {type: 'TEXT_DETECTION', maxResults: 50},
        {type: 'SAFE_SEARCH_DETECTION', maxResults: 50},
      ],
      image: {
        content: base64.split(',').pop()
      }
    }]
  };
  // debug(dataURL);
  return new Promise((resolve, reject) => {
    request.post(`${url}${config.google_api_key}`)
      .send(req)
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
}

const getBase64 = file => (
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onloadend = resolve;
  })
);

module.exports = {
  getBase64,
  getAnnotations,
};

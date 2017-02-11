import debugLib from 'debug';
import request from 'superagent';

import config from '../../conf/config';

const debug = debugLib('slayer:api:log');

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
        if (!res ||
          !res.body ||
          !res.body.responses ||
          !res.body.responses.length ||
          !res.body.responses[0].labelAnnotations
        ) return reject('shit response');

        return resolve(
          res.body.responses[0].labelAnnotations
            .map(annotation => annotation.description
          ));
      });
  });
}

const getBase64 = file => (
  new Promise((resolve) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onloadend = resolve;
  })
);

const getImages = annotations => (
  new Promise((resolve, reject) => {
    const url = `https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${encodeURI(annotations.join('+').slice(0, 5))}`;
    request.get(url)
      .set('Ocp-Apim-Subscription-Key', config.bing_api_key)
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res.body.value.map(item => ({
          url: item.contentUrl,
          contentSize: item.contentSize.replace(' B', ''),
        })));
      });
  })
);

module.exports = {
  getAnnotations,
  getBase64,
  getImages,
};

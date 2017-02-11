import React from 'react';
import debugLib from 'debug';

import BigBox from './BigBox';
import ImageDropBox from './ImageDropBox';
import ResultBox from './ResultBox';

import './app.less';
import Api from './api.js';

const debug = debugLib('slayer:AppComponent:log');

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      images: [],
      currentImage: null,
    };
  }

  onDrop(files) {
    this.setState({ files }, () => {
      debug('Accepted files: ', this.state.files);
    });

    Api
      .getBase64(files[0])
      .then(res => Api.getAnnotations(res.target.result))
      .then(annotations => Api.getImages(annotations))
      .then((images) => {
        debug(images);
        this.setState({
          images,
          currentImage: images[0],
        });
      })
      .catch(e => debug(e));
  }

  render() {
    return (
      <div className="index">
        <div className="upper-cnt">
          <BigBox>
            <ImageDropBox
              onDrop={files => this.onDrop(files)}
              files={this.state.files}
            />
          </BigBox>
          <BigBox>
            <ResultBox
              className="cnt"
              backgroundImage={this.state.currentImage}
              />
          </BigBox>
        </div>
        <div className="bottom-cnt">
          {this.state.images.length > 0 && this.state.images.map(image => (
            <img alt="no" src={image.thumbnailUrl} />
          ))}
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

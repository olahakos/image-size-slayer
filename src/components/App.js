import React from 'react';
import debugLib from 'debug';

import BigBox from './BigBox';
import ImageDropBox from './ImageDropBox';
import ResultBox from './ResultBox';
import SliderBox from './SliderBox';

import './app.less';
import Api from './api.js';

const debug = debugLib('slayer:AppComponent:log');

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
      images: [],
      currentImage: null,
      sliderValue: 3,
    };
  }

  onDrop(files) {
    const uploadedFile = files[0];
    this.setState({ uploadedFile });
    debug(uploadedFile);
    Api
      .getBase64(uploadedFile)
      .then(res => Api.getAnnotations(res.target.result))
      .then(annotations => Api.getImages(annotations))
      .then((images) => {
        this.setState({
          images,
          currentImage: images[this.state.sliderValue],
        });
      })
      .catch(e => debug(e));
  }

  onSliderChange(e) {
    const sliderValue = parseInt(e.target.value, 10);
    this.setState({
      sliderValue,
      currentImage: this.state.images[sliderValue],
    });
  }

  render() {
    return (
      <div className="index">
        <div className="upper-cnt">
          <BigBox>
            <ImageDropBox
              onDrop={files => this.onDrop(files)}
              uploadedFile={this.state.uploadedFile}
            />
          </BigBox>
          <BigBox>
            <ResultBox
              className="cnt"
              backgroundImageObj={this.state.currentImage}
              />
          </BigBox>
        </div>
        {this.state.currentImage && <div className="bottom-cnt">
          <SliderBox
            onSliderChange={e => this.onSliderChange(e)}
            sliderValue={this.state.sliderValue}
          />
          <a href={this.state.currentImage.url} download>SAVE</a>
        </div>}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

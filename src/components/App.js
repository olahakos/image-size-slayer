import React from 'react';
import debugLib from 'debug';
import humanize from 'humanize';

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
      sliderValue: 1,
      min: 0,
      max: 2,
      showSpinner: false,
    };
  }

  onDrop(files) {
    const uploadedFile = files[0];
    this.setState({ uploadedFile });
    debug(uploadedFile);
    this.setState({ showSpinner: true });
    Api
      .getBase64(uploadedFile)
      .then(res => Api.getAnnotations(res.target.result))
      .then((annotations) => {
        debug(annotations);
        return Api.getImages(annotations, uploadedFile.size, this.state.max);
      })
      .then((images) => {
        this.setState({
          images,
          currentImage: images[this.state.sliderValue],
          showSpinner: false,
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
        <h1>Save for web</h1>
        <div className="upper-cnt">
          <BigBox>
            <ImageDropBox
              onDrop={files => this.onDrop(files)}
              uploadedFile={this.state.uploadedFile}
            />
            {this.state.uploadedFile && <div className="file-size">
              File Size: <span>{humanize.filesize(this.state.uploadedFile.size)}</span>
            </div>}
          </BigBox>
          <BigBox>
            <ResultBox
              className="cnt resultBox"
              backgroundImageObj={this.state.currentImage}
              showSpinner={this.state.showSpinner}
              />
            {this.state.currentImage && <div className="file-size">
              File Size: <span>{humanize.filesize(this.state.currentImage.contentSize)}</span>
            </div>}
          </BigBox>
        </div>
        <div className="bottom-cnt">
          {this.state.currentImage && <SliderBox
            onSliderChange={e => this.onSliderChange(e)}
            min={this.state.min}
            max={this.state.max}
            sliderValue={this.state.sliderValue}
          />}
          {this.state.currentImage &&
            <a className="save-btn" href={this.state.currentImage.url} download>
              Save Image
            </a>}
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

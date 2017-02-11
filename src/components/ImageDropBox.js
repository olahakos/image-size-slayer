import React from 'react';
import Dropzone from 'react-dropzone';
import debugLib from 'debug';

import './imageDropBox.less';

const debug = debugLib('ImageDrBoxComponent:log');

class ImageDrBoxComponent extends React.Component {

  getCntStyle() {
    if (!this.props.uploadedFile) return {};
    return {backgroundImage: `url(${this.props.uploadedFile.preview})`};
  }

  getHint() {
    if (this.props.uploadedFile) return null;
    return <div className="hint">Drop an image here, or click to select image to upload.</div>;
  }

  render() {
    return (
      <div className="cnt imageDropBox" style={this.getCntStyle()}>
        <Dropzone className="imageDropBox_dropbox" onDrop={this.props.onDrop}>
          {this.getHint()}
        </Dropzone>
      </div>
    );
  }
}

ImageDrBoxComponent.propTypes = {
  uploadedFile: React.PropTypes.object,
  onDrop: React.PropTypes.func.isRequired,
};
ImageDrBoxComponent.defaultProps = {
  uploadedFile: null,
};

export default ImageDrBoxComponent;

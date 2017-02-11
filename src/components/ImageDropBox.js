import React from 'react';
import Dropzone from 'react-dropzone';
import debugLib from 'debug';

import './imageDropBox.less';

const debug = debugLib('ImageDrBoxComponent:log');

class ImageDrBoxComponent extends React.Component {

  getCntStyle() {
    if (!this.hasImage()) return {};
    return {backgroundImage: `url(${this.props.files[0].preview})`};
  }

  getHint() {
    if (this.hasImage()) return null;
    return <div>Try dropping some files here, or click to select files to upload.</div>;
  }

  hasImage() {
    return this.props.files && this.props.files.length > 0;
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
  files: React.PropTypes.array.isRequired,
  onDrop: React.PropTypes.func.isRequired,
};

export default ImageDrBoxComponent;

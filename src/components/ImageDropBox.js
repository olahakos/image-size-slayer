import React from 'react';
import Dropzone from 'react-dropzone';
import debugLib from 'debug';

import './imageDropBox.less';

const debug = debugLib('ImageDrBoxComponent:log');

class ImageDrBoxComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({ files }, () => {
      debug('Accepted files: ', this.state.files);
    });
  }

  hasImage() {
    return this.state.files && this.state.files.length > 0;
  }

  getCntStyle() {
    if (!this.hasImage()) return {};
    return {backgroundImage: `url(${this.state.files[0].preview})`};
  }

  getHint() {
    if (this.hasImage()) return null;
    return <div>Try dropping some files here, or click to select files to upload.</div>;
  }

  render() {
    return (
      <div className="cnt imageDropBox" style={this.getCntStyle()}>
        <Dropzone className="imageDropBox_dropbox" onDrop={files => this.onDrop(files)}>
          {this.getHint()}
        </Dropzone>
      </div>
    );
  }
}

ImageDrBoxComponent.defaultProps = {
  children: React.PropTypes.element.isRequired,
};

export default ImageDrBoxComponent;

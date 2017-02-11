import React from 'react';
import Dropzone from 'react-dropzone';
import debugLib from 'debug';

// import YeomanImage from './YeomanImage';
import './app.css';

const debug = debugLib('AppComponent:log');

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({ files }, () => {
      debug('Accepted files: ', this.state.files);
    });
  }

  render() {
    return (
      <div className="index">
        <Dropzone onDrop={files => this.onDrop(files)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {this.state.files ? <div>
          <h2>Uploading {this.state.files.length} files...</h2>
          <div>{this.state.files.map((file) => {
            debug('here', file);
            return <img alt="Preview" src={file.preview} />;
          })}</div>
        </div> : null}
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

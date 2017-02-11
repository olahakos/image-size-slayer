import React from 'react';
import debugLib from 'debug';

import BigBox from './BigBox';
import ImageDropBox from './ImageDropBox';
import './app.less';
import Api from './api.js';

const debug = debugLib('slayer:AppComponent:log');

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop(files) {
    this.setState({ files }, () => {
      debug('Accepted files: ', this.state.files);
    });
    Api.getBase64(files[0]);
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
            <div className="cnt">THIS IS THE OUTPUT</div>
          </BigBox>
        </div>
        <div className="bottom-cnt">SLIDER</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

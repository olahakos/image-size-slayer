import React from 'react';
// import debugLib from 'debug';

import BigBox from './BigBox';
import ImageDropBox from './ImageDropBox';

// import YeomanImage from './YeomanImage';
import './app.less';
// const debug = debugLib('AppComponent:log');

class AppComponent extends React.Component {

  render() {
    return (
      <div className="index">
        <div className="upper-cnt">
          <BigBox>
            <ImageDropBox />
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

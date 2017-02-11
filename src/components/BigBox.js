import React from 'react';
import Dropzone from 'react-dropzone';
import debugLib from 'debug';

// import YeomanImage from './YeomanImage';
import './bigBox.less';

const debug = debugLib('AppComponent:log');

class BigBoxComponent extends React.Component {

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
      <div className="bigBox">
        {this.props.children}
      </div>
    );
  }
}

BigBoxComponent.defaultProps = {
  children: React.PropTypes.element.isRequired,
};

export default BigBoxComponent;

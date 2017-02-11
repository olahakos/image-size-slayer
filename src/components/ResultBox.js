import React from 'react';

import './imageDropBox.less';

class ResultBoxComponent extends React.Component {

  getCntStyle() {
    if (!this.props.backgroundImage || !this.props.backgroundImage.url) return {};
    return {backgroundImage: `url(${this.props.backgroundImage.url})`};
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={this.getCntStyle()} />
    );
  }
}

ResultBoxComponent.propTypes = {
  backgroundImage: React.PropTypes.object,
  className: React.PropTypes.string,
};

ResultBoxComponent.defaultProps = {
  backgroundImage: null,
  className: '',
};

export default ResultBoxComponent;

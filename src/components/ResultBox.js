import React from 'react';

class ResultBoxComponent extends React.Component {

  getCntStyle() {
    if (!this.props.backgroundImageObj || !this.props.backgroundImageObj.thumbnailUrl) return {};
    return {backgroundImage: `url(${this.props.backgroundImageObj.thumbnailUrl})`};
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
  backgroundImageObj: React.PropTypes.object,
  className: React.PropTypes.string,
};

ResultBoxComponent.defaultProps = {
  backgroundImageObj: null,
  className: '',
};

export default ResultBoxComponent;

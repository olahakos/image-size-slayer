import React from 'react';

class ResultBoxComponent extends React.Component {

  getCntStyle() {
    if (!this.props.backgroundImageObj || !this.props.backgroundImageObj.thumbnailUrl) return {};
    return {backgroundImage: `url(${this.props.backgroundImageObj.thumbnailUrl})`};
  }

  showSpinner() {
    if (this.props.showSpinner === true) {
      return (<div className="spinner">
        <div className="double-bounce1"/>
        <div className="double-bounce2"/>
      </div>);
    }
    return null;
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={this.getCntStyle()}>
        {this.showSpinner()}
      </div>
    );
  }
}

ResultBoxComponent.propTypes = {
  backgroundImageObj: React.PropTypes.object,
  className: React.PropTypes.string,
  showSpinner: React.PropTypes.bool,
};

ResultBoxComponent.defaultProps = {
  backgroundImageObj: null,
  className: '',
};

export default ResultBoxComponent;

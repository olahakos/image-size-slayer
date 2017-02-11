import React from 'react';

import './sliderBox.less';

class SliderBoxComponent extends React.Component {

  render() {
    return (
      <input
        className="slider"
        type="range"
        onChange={this.props.onSliderChange}
        min="1"
        max="5"
        step="1"
        value={this.props.sliderValue}
        />
    );
  }
}

SliderBoxComponent.propTypes = {
  onSliderChange: React.PropTypes.func.isRequired,
  sliderValue: React.PropTypes.number.isRequired,
};

export default SliderBoxComponent;

import React from 'react';

import './sliderBox.less';

class SliderBoxComponent extends React.Component {

  render() {
    return (
      <div className="slider-cnt">
        <input
          className="slider"
          type="range"
          onChange={this.props.onSliderChange}
          min={this.props.min}
          max={this.props.max}
          step="1"
          value={this.props.sliderValue}
        />
        <div className="labels">
          <div>Small</div>
          <div>Medium</div>
          <div>Large</div>
        </div>
      </div>
    );
  }
}

SliderBoxComponent.propTypes = {
  onSliderChange: React.PropTypes.func.isRequired,
  sliderValue: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default SliderBoxComponent;

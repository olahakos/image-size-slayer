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
          <a href="#small" onClick={() => this.props.onClick(0)}>Small</a>
          <a href="#medium" onClick={() => this.props.onClick(1)}>Medium</a>
          <a href="#large" onClick={() => this.props.onClick(2)}>Large</a>
        </div>
      </div>
    );
  }
}

SliderBoxComponent.propTypes = {
  onSliderChange: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func.isRequired,
  sliderValue: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default SliderBoxComponent;

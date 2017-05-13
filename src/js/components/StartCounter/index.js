'use strict';

import React, { Component, PropTypes } from 'react';
import { Box } from 'grommet';
import classnames from 'classnames';

import './index.module.scss';

class StartCounter extends Component {
  constructor(props) {
    super(props);
    this.onStart = this.onStart.bind(this);

    this.state = {
      counter: 'Start'
    };
  }

  onStart() {
    const { onEnd, second } = this.props;

    this.setState({
      counter: second
    });

    this.counterInterval = setInterval(() => {
      this.setState({
        counter: this.state.counter - 1
      });

      if (this.state.counter === -1) {
        clearInterval(this.counterInterval);
        if (onEnd) onEnd();
      }
    }, 1000);
  }

  render() {
    const className = classnames({
      clickable: this.state.counter === 'Start'
    });

    return (
      <Box className="start-counter" align="center" justify="center">
        <span
          onClick={this.state.counter === 'Start' ? this.onStart : null}
          className={className}
        >
          {this.state.counter}
        </span>
      </Box>
    );
  }
}

StartCounter.propTypes = {
  onEnd: PropTypes.func,
  second: PropTypes.number
};

StartCounter.defaultProps = {
  second: 5
};

export default StartCounter;

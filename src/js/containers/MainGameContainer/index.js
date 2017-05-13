'use strict';

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { Box } from 'grommet';

import StartCounter from 'components/StartCounter';

import './index.module.scss';
import ViewStore from './stores';

@observer class MainGameContainer extends Component {
  constructor(props) {
    super(props);
    this.viewStore = new ViewStore();

    this.onStart = this.onStart.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onRestart = this.onRestart.bind(this);
  }

  onStart() {
    this.viewStore.hideCounter();
    this.viewStore.nextGame();
  }

  onRestart() {
    this.viewStore.restart();
  }

  onClick(cellIndex) {
    const { numbers, openNumberAt, addWrongNumber } = this.viewStore;

    if (numbers.indexOf(cellIndex) > -1) {
      openNumberAt(numbers.indexOf(cellIndex));
    } else {
      addWrongNumber(cellIndex);
    }
  }

  render() {
    const {
      numbers,
      numbersState,
      isShowResult,
      wrongNumber,
      showStartCounter,
      showGameOver,
      isWon,
      level,
      score,
      nextGame
    } = this.viewStore;

    return (
      <Box
        className="main-game-container"
        responsive={false}
        justify="center"
        align="center"
      >
        <Box
          className="game-statistic"
          responsive={false}
          justify="end"
          direction="row"
          margin={{ bottom: 'medium' }}
        >
          <Box className="score" margin={{ right: 'small' }}>
            <span>SCORE</span>
            <div>{score}</div>
          </Box>
          <Box className="level">
            <span>LEVEL</span>
            <div>{level}</div>
          </Box>
        </Box>
        <Box className="game-grid" responsive={false} justify="between">
          {[1, 2, 3, 4, 5].map(row => {
            return (
              <Box
                responsive={false}
                direction="row"
                justify="between"
                key={`row-${row}`}
              >
                {[1, 2, 3, 4, 5].map(col => {
                  const cellIndex = (row - 1) * 5 + col;
                  const indexInResult = numbers.indexOf(cellIndex);
                  const highlight =
                    indexInResult > -1 &&
                    (numbersState[indexInResult] || isShowResult);
                  const wrong =
                    !highlight && wrongNumber.indexOf(cellIndex) > -1;

                  const classes = classnames('tile', {
                    highlight: highlight,
                    wrong: wrong
                  });

                  return (
                    <Box
                      key={cellIndex}
                      className={classes}
                      onClick={() => this.onClick(cellIndex)}
                    />
                  );
                })}
              </Box>
            );
          })}
          {showStartCounter
            ? <StartCounter onEnd={this.onStart} second={3} />
            : null}
          {showGameOver
            ? <Box className="game-over" justify="center" align="center">
                <span>Game Over</span>
                <span className="play-again" onClick={this.onRestart}>
                  Play Again
                </span>
              </Box>
            : null}
          {isWon
            ? <Box className="game-won" justify="center" align="center">
                <span>Congratulation!</span>
                <span className="next-game" onClick={nextGame}>
                  Next Game
                </span>
              </Box>
            : null}
        </Box>
      </Box>
    );
  }
}

MainGameContainer.propTypes = {};

MainGameContainer.defaultProps = {};

export default MainGameContainer;

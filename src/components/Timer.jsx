import React from "react";
import { connect } from "../slomux/connect";
import Interval from "./Interval";

class TimerMain extends React.Component {
  state = {
    currentTime: 0,
    prevInterval: this.props.currentInterval,
    timerId: null
  };

  resetTimer = currentTime => {
    this.setState({
      timerId: null,
      currentTime
    });
    this.handleStart();
  };

  changeCurrentTime = () => {
    const { currentTime, prevInterval, timerId } = this.state;
    const { currentInterval } = this.props;

    if (currentInterval > prevInterval) {
      clearInterval(timerId);
      setTimeout(
        this.resetTimer,
        1000 * (currentInterval - prevInterval),
        currentTime + currentInterval
      );
    } else if (currentInterval < prevInterval) {
      clearInterval(timerId);
      this.resetTimer(currentTime + prevInterval);
    } else {
      this.setState({
        currentTime: currentTime + currentInterval
      });
    }
  };

  handleStart = () => {
    const { timerId } = this.state;
    const { currentInterval } = this.props;

    if (timerId) {
      return;
    }

    const newTimerId = setInterval(
      this.changeCurrentTime,
      1000 * currentInterval
    );

    this.setState({
      timerId: newTimerId,
      prevInterval: currentInterval
    });
  };

  handleStop = () => {
    const { timerId } = this.state;

    clearInterval(timerId);
    this.setState({ currentTime: 0, timerId: null });
  };

  render() {
    return (
      <>
        <Interval />
        <div>Секундомер: {this.state.currentTime} сек.</div>
        <div>
          <button onClick={this.handleStart}>Старт</button>
          <button onClick={this.handleStop}>Стоп</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  currentInterval: state
});
const Timer = connect(mapStateToProps)(TimerMain);

export default Timer;

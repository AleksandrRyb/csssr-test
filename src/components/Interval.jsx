import React from "react";
import { connect } from "../slomux/connect";
import { changeInterval } from "../slomux/action";

function TimerInterval({ currentInterval, changeInterval }) {
  function increase() {
    changeInterval(1);
  }

  function decrease() {
    currentInterval > 0 && changeInterval(-1);
  }

  return (
    <div>
      <span>Интервал обновления секундомера: {currentInterval} сек.</span>
      <span>
        <button onClick={() => decrease()}>-</button>
        <button onClick={() => increase()}>+</button>
      </span>
    </div>
  );
}

const mapStateToProps = state => ({
  currentInterval: state
});

const mapDispatchToProps = dispatch => ({
  changeInterval: value => dispatch(changeInterval(value))
});

const Timer = connect(mapStateToProps, mapDispatchToProps)(TimerInterval);

export default Timer;

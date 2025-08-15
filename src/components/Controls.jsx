import React from "react";
import PropTypes from "prop-types";

const Controls = ({
  onPlay,
  onRestart,
  onToggleAutoPlay,
  time,
  pointsCount,
  setPointsCount,
  isAutoPlay,
  isPlaying,
}) => {
  return (
    <div className="controls">
      <div className="input-group">
        <label htmlFor="points-input">Points:</label>
        <input
          id="points-input"
          type="number"
          value={pointsCount}
          onChange={(e) => setPointsCount(Number(e.target.value))}
          disabled={isPlaying}
          min="1"
        />
      </div>
      <div className="input-group">
        <label>Time:</label>
        <span id="time-display">{time.toFixed(1)}s</span>
      </div>
      <div className="buttons">
        <button onClick={() => onPlay(pointsCount)} disabled={isPlaying}>
          Play
        </button>
        <button onClick={onRestart} disabled={!isPlaying && time === 0}>
          Restart
        </button>
        <button onClick={onToggleAutoPlay} disabled={!isPlaying}>
          Auto Play {isAutoPlay ? "OFF" : "ON"}
        </button>
      </div>
    </div>
  );
};

Controls.propTypes = {
  onPlay: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  onToggleAutoPlay: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  pointsCount: PropTypes.number.isRequired,
  setPointsCount: PropTypes.func.isRequired,
  isAutoPlay: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Controls;

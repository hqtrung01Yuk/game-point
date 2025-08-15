import React from "react";
import PropTypes from "prop-types";

const Point = ({ id, x, y, isVisible, onClick, isCurrent }) => {
  if (!isVisible) {
    return null;
  }

  const style = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    transform: "translate(-50%, -50%)",
    backgroundColor: isCurrent ? "red" : "rgba(0, 0, 0, 0.5)",
  };

  return (
    <div className="point" style={style} onClick={() => onClick(id)}>
      {id}
    </div>
  );
};

Point.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isCurrent: PropTypes.bool.isRequired,
};

export default Point;

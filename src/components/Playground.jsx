import React, { useState, useEffect, useRef } from "react";
import Point from "./Point.jsx";
import Controls from "./Controls.jsx";

// Hàm để tạo vị trí ngẫu nhiên
const getRandomPosition = (width, height, radius) => {
  return {
    x: Math.random() * (width - 2 * radius) + radius,
    y: Math.random() * (height - 2 * radius) + radius,
  };
};

const Playground = () => {
  const [points, setPoints] = useState([]);
  const [nextPoint, setNextPoint] = useState(1);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [pointsCount, setPointsCount] = useState(5);
  const timerRef = useRef(null);
  const autoPlayRef = useRef(null);
  const gameStatus = useRef("");

  const playgroundStyle = {
    width: "500px",
    height: "500px",
    border: "2px solid #333",
    position: "relative",
    margin: "20px auto",
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (isAutoPlay && isPlaying) {
      autoPlayRef.current = setInterval(() => {
        const targetPoint = points.find((p) => p.id === nextPoint);
        if (targetPoint) {
          handlePointClick(targetPoint.id);
        }
      }, 500); // Tự động click mỗi 0.5 giây
    } else {
      clearInterval(autoPlayRef.current);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, isPlaying, nextPoint, points]);

  const initializeGame = (count) => {
    const newPoints = [];
    const containerWidth = 500;
    const containerHeight = 500;
    const radius = 25;

    for (let i = count; i > 0; i--) {
      const { x, y } = getRandomPosition(
        containerWidth,
        containerHeight,
        radius
      );
      newPoints.push({
        id: i,
        x: x,
        y: y,
        isVisible: true,
      });
    }

    setPoints(newPoints);
    setPointsCount(count);
    setNextPoint(1);
    setTime(0);
    setIsPlaying(true);
    gameStatus.current = "";
  };

  const handlePointClick = (id) => {
    if (!isPlaying) return;

    if (id === nextPoint) {
      setPoints((prevPoints) =>
        prevPoints.map((p) => (p.id === id ? { ...p, isVisible: false } : p))
      );
      setNextPoint((prevNextPoint) => prevNextPoint + 1);
    } else {
      setIsPlaying(false);
      gameStatus.current = "GAME OVER";
    }
  };

  useEffect(() => {
    if (nextPoint > pointsCount && pointsCount > 0) {
      setIsPlaying(false);
      gameStatus.current = `ALL CLEARED! Time: ${time.toFixed(1)}s`;
    }
  }, [nextPoint, pointsCount, time]);

  const handleRestart = () => {
    setIsPlaying(false);
    setIsAutoPlay(false);
    setPoints([]);
    setNextPoint(1);
    setTime(0);
    gameStatus.current = "";
  };

  const handlePlay = (count) => {
    if (count > 0) {
      initializeGame(count);
    }
  };

  return (
    <div className="container">
      <Controls
        onPlay={handlePlay}
        onRestart={handleRestart}
        onToggleAutoPlay={() => setIsAutoPlay((prev) => !prev)}
        time={time}
        pointsCount={pointsCount}
        setPointsCount={setPointsCount}
        isAutoPlay={isAutoPlay}
        isPlaying={isPlaying}
      />
      <div className="playground" style={playgroundStyle}>
        {points.map((point) => (
          <Point
            key={point.id}
            id={point.id}
            x={point.x}
            y={point.y}
            isVisible={point.isVisible}
            onClick={handlePointClick}
            isCurrent={point.id === nextPoint && isPlaying && !isAutoPlay}
          />
        ))}
      </div>
      <div className="game-status">{gameStatus.current}</div>
    </div>
  );
};

export default Playground;

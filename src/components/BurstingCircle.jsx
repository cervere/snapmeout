import React, { useEffect } from 'react';
import { Circle, Stage, Layer } from 'react-konva';

const BurstingCircle = () => {
  useEffect(() => {
    const circle = document.getElementById('burstingCircle');

    if (circle) {
      // Define a Konva animation to simulate bursting effect
      const animation = new window.Konva.Animation((frame) => {
        const radius = frame.time / 5; // Adjust the bursting effect
        circle.setAttr('radius', radius);

        if (radius > 200) {
          animation.stop(); // Stop animation when bursting effect completes
          circle.destroy(); // Remove the circle from the stage
        }
      }, circle.getLayer());

      animation.start();

      return () => {
        animation.stop(); // Clean up if the component unmounts before animation completes
      };
    }
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* Render the Konva Circle */}
        <Circle
          id="burstingCircle"
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          radius={0}
          fill="red"
        />
      </Layer>
    </Stage>
  );
};

export default BurstingCircle;
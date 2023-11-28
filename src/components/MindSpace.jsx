import React, { useRef, useEffect, useState, useContext } from "react";
import { Stage, Layer, Circle, Group, Transformer, Text } from "react-konva";
import { Html } from 'react-konva-utils';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { ThoughtContext } from '../utils/ThoughtContext';
import CircleWithText from './CircleWithText';
import Confetti from 'react-confetti'
import BurstingCircle from "./BurstingCircle";

const stickyCircleRadius = 100;

const MindSpace = () => {
  const circleRef = useRef(null);
  const statStageRef = useRef(null);
  const deleteRef = useRef(null);
  const { thoughts, setThoughts, setAction, actionDisplayRef } = useContext(ThoughtContext);
  const stageRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [intThoughts, setIntThoughts] = useState(thoughts.map((thought) => {
    const circleRadius = 100;
    // const coords = getRandomCoordinates();
    return {
      ...thought,
      // x: coords.x,
      // y: coords.y,
      size: circleRadius
    }
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [onDelete, setOnDelete] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const statStage = statStageRef.current;
    const circle = circleRef.current;
    if (stage) {
      stage.on("wheel", (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.1;
        const oldScale = stage.scaleX();

        const newScale =
          e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        setZoomLevel(newScale);
      });
      if(statStage && circle) {
        const newX = window.innerWidth / 2 - stickyCircleRadius / 2; // Adjust X position as needed
        const newY = window.innerHeight / 2 - stickyCircleRadius / 2; // Adjust Y position as needed
        // Set the position and size of the sticky circle
        circle.position({ x: newX / scale, y: newY / scale });
        circle.scale({ x: 1 / scale, y: 1 / scale });
        // Set Z-index
        circle.zIndex(10);
      }
    }

  }, []);

  const deleteArea = () => {
    if(actionDisplayRef.current) {
      const rect = actionDisplayRef.current.getBoundingClientRect();
      return {x: rect.left, y: rect.top};
    } else {
      return
    }
  }

  const whileDragging = () => {
    setIsDragging(true);
    setAction("DONE");
  }

  const onDragStop = () => {
    setIsDragging(false);
    setAction(null);
  }

  return (
    <div>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      ref={stageRef}
      scaleX={zoomLevel}
      scaleY={zoomLevel}
    >
      <Layer>
      <Group draggable={true}> 
          {/* Example shapes - Rect and Circle */}
          {
            intThoughts.map((thought, i) => {
              return (<CircleWithText
                key={`circle-${i}`} 
                item={thought} 
                whileDragging={whileDragging}
                onDragStop={onDragStop}
                deleteArea={deleteArea()}
                setOnDelete={setOnDelete}
                stageRef={stageRef}
                scale={zoomLevel}
                />)
            })
          }
          {/* Transformer for resizing shapes */}
          <Transformer />
      </Group>
      </Layer>
    </Stage>
    </div>
  );
};


export default MindSpace;

import React, { useRef, useEffect, useState, useLocation } from "react";
import { Circle, Group, Line, Text } from "react-konva";
import mojs from "@mojs/core";

const MAX_WORD_LENGTH = 10;
const getRandomCoordinates = () => {
    // Generate random x and y coordinates within the canvas area
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const paddingX = 50;
    const paddingY = 50;
    return {x: Math.random() * (canvasWidth - paddingX) + paddingX, y: Math.random() * (canvasHeight - paddingY) + paddingY}
  };

const CircleWithText = ({item, whileDragging, onDragStop, deleteArea, setOnDelete, stageRef, scale}) => {
    const [position, setPosition] = useState(getRandomCoordinates())
    const [center, setCenter] = useState();
    const [text, setText] = useState(item.message);
    const fontSize = 16;
    const textRef = useRef(null);
    const circleRef = useRef(null);
    const thoughtRef = useRef(null);

    useEffect(() => {
        if(position && textRef.current) {
            const textNode = textRef.current;
            const width = textNode.width();
            const height = textNode.height();
            setCenter({
                x: position.x + item.size/2,
                y: position.y + height/2,
                radius: item.size/2 + 10
            })
        }
    }, [textRef, position])

  


    const onDragStart = (pos) => {
        const draggableObj = circleRef.current;
        const {x, y} = draggableObj.getAbsolutePosition();
        if(stageRef.current) {
            const newText = `${text} circle: ${pos.x},${pos.y} `
            // setText(newText);
        }
        draggableObj.y(Math.max(draggableObj.y(), 50));
        whileDragging();
    }

    const onDragEnd = (e) => {
            // setText(item.message);
            // Calculate the minimum distance between the edges of the components
            if(!deleteArea) {
                return;
            }
            // Define a threshold value for approximate overlap
            const threshold = 100; // Adjust as needed
            const draggableObj = circleRef.current;
            const {x, y} = draggableObj.getAbsolutePosition()
            const distance = Math.sqrt(Math.pow(deleteArea.x - x, 2) + Math.pow(deleteArea.y - y, 2));


            if (distance < threshold) {
                console.log('In Delete Area');
                setOnDelete(true);
                // Perform actions when the components are in close proximity
                const burst = new mojs.Burst({
                    radius:   { 0: 200 },
                    count:    15,
                    children: {
                      shape:        'circle',
                      radius:       20,
                      fill:         [ 'deeppink', 'cyan', 'yellow' ],
                      strokeWidth:  5,
                      duration:     2000
                    }
                  });
                  burst
                  .tune({ left:x, top: y })
                  .setSpeed(3)
                  .replay();
                  console.log('end of burst');
                  thoughtRef.current.remove();
            } else {
                setOnDelete(false);
            }
            onDragStop();
    }

    return <Group draggable={true}
    onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      ref={thoughtRef}
      >
    {center && <Circle 
    x={center.x} 
    y={center.y} 
    radius={center.radius} 
    fill="lightblue"
    ref={circleRef}
    />}
    <Text
        ref={textRef}
        x={position.x} 
        y={position.y} 
        text={text}
        width={item.size}
        fontSize={fontSize}
        wrap={"word"}
        fill="black"
        align="center"
        fontStyle="bold" 
      />
  </Group>
  }

  
export default CircleWithText;

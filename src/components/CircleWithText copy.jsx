import React, { useRef, useEffect, useState } from "react";
import { Circle, Group, Text } from "react-konva";

const MAX_WORD_LENGTH = 10;

const CircleWithText = ({item}) => {
    const midRef = useRef(null);
    const midRefLeft = useRef(null);

    const [lines, setLines] = useState([]);
    const [center, setCenter] = useState();
    const fontSize = 16;

    useEffect(() => {
        console.log(`Reloading bla bla`)
        setLines(splitText(item.message));
    }, [])

    useEffect(() => {
        if(midRef.current) {
            if(midRefLeft.current) {
                const x = midRefLeft.current.getX() + Math.max(midRef.current.width(), midRefLeft.current.width())/2;
                const y = midRef.current.getY();
                const radius = Math.max(midRef.current.width(), midRefLeft.current.width())/2
                setCenter({x, y, radius:70});
            } else {
                const x = midRef.current.getX() + midRef.current.width()/2;
                const y = midRef.current.getY() + fontSize/2;
                const radius = midRef.current.width()/2;
                setCenter({x, y, radius: 70});
            }
        }
    }, [lines])

    const splitText = (text) => {
        // split by space, if a word length > 10, split into 9c+- and -+rest
        const words = text.trim().split(' ');
        const wordsUpdate = [];
        const lines = [];
        for (const word of words) {
            if(word.length <= MAX_WORD_LENGTH) {
                wordsUpdate.push(word)
            } else {
                const chunks = word.match(new RegExp(`.{1,${MAX_WORD_LENGTH-1}}`, 'g'));
                wordsUpdate.push(...chunks.map((chunk, i) => i === 0 ? `${chunk}-` : `-${chunk}`));
            }
        }
        let currLine = wordsUpdate[0];
        if(wordsUpdate.length === 1) {
            lines.push(currLine);
        } else {
            for(const word of wordsUpdate.slice(1)){
                if (currLine.length + " " + word.length <= MAX_WORD_LENGTH) {
                    currLine += " " + word;
                    if(currLine.length === MAX_WORD_LENGTH) {
                        lines.push(currLine)
                    }
                } else {
                    lines.push(currLine);
                    currLine = word;
                }
            }
            if(currLine.length <= MAX_WORD_LENGTH) {
                lines.push(currLine)
            }
        }
        const linesData = []
        /*
        1: x - radius, y - fontSize/2
        2: x - radius, y - 2*fontSize/2
        3: x - radius, y - 3*fontSize/2   
        4: x - radius, y - 4*fontSize/2 
        */
        let startY = (lines.length + 1) * (fontSize / 2);
        for (const line of lines) {
            const thisY = startY - fontSize/2;
            linesData.push({
                content: line,
                getX : (centerX, radius) => {
                    return centerX - radius
                },
                getY : (centerY) => {
                    return centerY - thisY + 100 
                }
            });
            startY -= fontSize / 2
        }
        return linesData;
    }

    const divStyle = {
        border: '2px solid black', // Border with 2px width, solid style, and black color
        padding: '10px', // Optional: Adding padding for better visualization
      };

    return <Group draggable={true}>
    <Circle 
    x={center?.x} 
    y={center?.y} 
    radius={center?.radius} 
    fill="lightblue" 
    />
    {lines.map((line, i) => {
        let thisRef = null;
        if(Math.floor(lines.length / 2) === Math.ceil(lines.length / 2)) {
            // even elements
            if (i === Math.floor(lines.length / 2)){
                thisRef = midRef;
            } else if(i === Math.floor(lines.length / 2) - 1){
                thisRef = midRefLeft;
            }
        } else {
            if (i === Math.floor(lines.length / 2)){
                thisRef = midRef;
            } 
        }
       
        return (
        <Text
        key={i}
        ref={thisRef}
        x={line.getX(item.x, item.size)} 
        y={line.getY(item.y) - fontSize + 10} 
        text={line.content}
        // width={thought.size}
        fontSize={fontSize}
        wrap={"word"}
        fill="black"
        padding={100}
      />
      )
    })
    }
  </Group>
  }
  
export default CircleWithText;

import React, { useState } from 'react';
import './Maze.css';

const Maze = ({size}) => {

  const rows = size;
  const cols = size;

  const [maze, setMaze] = useState([]);

  //function to generate a maze
  const generateMaze = () => {

      //initialised all cells as walls
      const newMaze = Array.from({length: rows}, () => Array(cols).fill('W')); 

      //stack for adding current cell and neighbors
      const path = [[0,0]];

      //marked starting cell as path
      newMaze[1][0] = 'P';

      while (path.length > 0) {
        
        //current cell position
        const [x, y] = path.pop();

        //directions Down[1,0], Right[0,1], Up[-1,0] and Left[0,-1]
        const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
        ];

        //Shuffle the directions
        directions.sort(() => Math.random() - 0.5);

        directions.forEach(([dx, dy]) => {
          //next cell adjacent to current cell
          const newX = x + dx * 2;
          const newY = y + dy * 2;
         
          if (
          newX >= 0 &&
          newY >= 0 &&
          newX < rows &&
          newY < cols &&
          newMaze[newX][newY] === 'W'
          ) {

            //marked the neighbor cell as path
            newMaze[newX][newY] = 'P';

            //marked wall between current and neighbor cell as path
            newMaze[x + dx][y + dy] = 'P';

            //pushed the neighbor cell to the stack
            path.push([newX, newY]);
        } 
        }
        );
        //exit path in case the maze size is even
        newMaze[rows-2][cols-1] = 'P';
        setMaze(newMaze);
    }
  }

  const handleClick = () => {
    if(size < 5) {
      alert('Maze size too small');
    } else if (size >= 30) {
      alert('Maze size too big');
    } else {
    generateMaze();
    }
  }
  
  return (
    <div className='container'>
      <button className='button' onClick={handleClick}>Generate</button>
      <div className="maze">
        {maze.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div key={j} className={`cell ${cell}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Maze;
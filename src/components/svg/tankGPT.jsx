import React, { useEffect, useState } from 'react';

export const WaterTank = () => {
  const [waterLevel, setWaterLevel] = useState(50);

  const tankStyle = {
    width: '200px',
    height: '300px',
    border: '1px solid black'
  };

  const waterStyle = {
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: '1px',
    transition: 'all 1s ease-in-out',
    height: `${(waterLevel / 100) * 260}px`
  };

  const handleClick = () => {
    setWaterLevel(25);
  };

  const cellAmount = [0, 1];
  let prevWaterLevel = 25;

  useEffect(() => {
    console.log('update data2');

    const thirdData = setTimeout(() => {
      setWaterLevel(90);
      console.log('third data');
    }, 10000);
    return () => {
      clearTimeout(thirdData);
    };
  }, []);

  return (
    <svg
      viewBox={`0 0 ${cellAmount.length * 100} 200`}
      x='0px'
      y='0px'
      xmlns='http://www.w3.org/2000/svg'
    >
      {cellAmount.map((item, i) => (
        <g transform={`translate(${i * 100},0)`}>
          <g fill='rgb(178, 178, 178)'>
            <path d='M37.6,11.5c-9.3,2.8-22.1,11.2-26.1,17.4c-1.2,1.8,2.1,1.9,39.4,2c22.3,0,40.6-0.5,40.6-1.1c0-1.5-9.2-9.3-15.4-13.1C64.9,9.9,49.9,7.9,37.6,11.5z' />
            <path
              fill='rgb(96, 150, 180)'
              stroke-width='4px'
              stroke='rgb(178, 178, 178)'
              d='M17.7,98.3v56.1l32.5,0.2c17.9,0.2,33,0.2,33.8,0l1.3-0.4V98.2V42.2H51.4H17.7V98.3z'
            />
            <path d='M91.4,160.1l-0.2-4.3c0-0.6-0.3-1.1-0.6-1.1H51.4H12.2c-0.3,0-0.6,0.5-0.6,1.1l-0.2,4.3l-0.1,4c0,0.7,0.2,1.2,0.6,1.2h39.5H91c0.3,0,0.6-0.6,0.6-1.2L91.4,160.1z' />
            <path d='M65.2,185.5c9.3-2.8,22.1-11.2,26.1-17.4c1.2-1.8-2.1-1.9-39.4-2c-22.3,0-40.6,0.5-40.6,1.1c0,1.5,9.2,9.3,15.4,13.1C37.9,187.1,53,189.1,65.2,185.5z' />
            <path d='M11.5,37l0.2,4.3c0,0.6,0.3,1.1,0.6,1.1h39.2h39.2c0.3,0,0.6-0.5,0.6-1.1l0.2-4.3l0.1-4c0-0.7-0.2-1.2-0.6-1.2H51.4H11.9c-0.3,0-0.6,0.6-0.6,1.2L11.5,37z' />
          </g>
          <rect
            fill='rgb(29, 133, 202)'
            stroke-width='2px'
            stroke='rgb(178, 178, 178)'
            width='10'
            height='20'
            x='46.6'
            y='189.11'
          />
          <rect class='water' fill='black' width='67.5' height={waterLevel} x='17.7' y='42.45'>
            <animate
              attributeName='height'
              from={prevWaterLevel}
              to={waterLevel}
              dur='0.5s'
              fill='freeze'
            />
          </rect>
          <text x='30' y='100' font-family='Verdana' font-size='20' font-weight='700' fill='white'>
            2.5
          </text>
          <text
            x='35'
            y='40'
            font-size='10'
            font-weight='700'
            fill='white'
            style={{ textAlign: 'center' }}
          >
            4.5 m
          </text>
          <text x='35' y='163' font-size='10' font-weight='700' fill='white'>
            0 m
          </text>
        </g>
      ))}
    </svg>
  );
};

export const WaterTankString = () => {
  const [waterLevel, setWaterLevel] = useState(50);

  const handleClick = () => {
    setWaterLevel(25);
    console.log('click fun');
  };

  const svgMarkup = `
    <svg viewBox="0 0 200 300">
      <rect x="20" y="20" width="160" height="260" />
      <rect x="20" y="20" width="160" style="fill: blue; stroke: blue; stroke-width: 1px; transition: all 1s ease-in-out; height: ${
        (waterLevel / 100) * 260
      }px;" />
      <text x="20" y="290" color='white' onClick="${handleClick}">
        Click me to change the water level
      </text>
    </svg>
  `;

  return <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />;
};

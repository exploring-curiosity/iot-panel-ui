import React from 'react';

const FloorView = ({ floors, onFloorClick }) => {
  return (
    <div className="floor-view">
      <div className="center-dot"></div>
      {floors.map((floor, index) => {
        const angle = (360 / floors.length) * index; // Calculate angle for each floor
        const radius = 200; // Distance from the center
        const x = Math.cos((angle * Math.PI) / 180) * radius; // X position
        const y = Math.sin((angle * Math.PI) / 180) * radius; // Y position
        return (
          <div
            key={floor.id}
            className="floor"
            style={{
              position: 'absolute',
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: 'translate(-50%, -50%)', // Center the floor element
            }}
            onClick={() => onFloorClick(floor)}
          >
            {floor.name}
          </div>
        );
      })}
    </div>
  );
};

export default FloorView;
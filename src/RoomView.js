import React from 'react';

const RoomView = ({ floor, onRoomClick, onBack }) => {
  return (
    <div className="room-view">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <div className="corner-dot"></div>
      {floor.rooms.map((room, index) => {
        const angle = (360 / floor.rooms.length) * index; // Calculate angle for each room
        const radius = 200; // Distance from the corner dot
        const x = Math.cos((angle * Math.PI) / 180) * radius; // X position
        const y = Math.sin((angle * Math.PI) / 180) * radius; // Y position
        return (
          <div
            key={room.id}
            className="room"
            style={{
              position: 'absolute',
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: 'translate(-50%, -50%)', // Center the room element
            }}
            onClick={() => onRoomClick(room)}
          >
            {room.name}
          </div>
        );
      })}
    </div>
  );
};

export default RoomView;
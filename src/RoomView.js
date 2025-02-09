import React, {useState, useEffect} from 'react';

const RoomView = ({ floor, onRoomClick, onBack }) => {
  const [rooms, setRooms] = useState([])
  useEffect(()=>{
    async function fetchData() {
      const url = `https://energy-manager-service.onrender.com/api/floors/user/sudharshanthunk@gmail.com`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json()
      const rooms = data.find(fl => fl._id === floor._id).rooms
      console.log(rooms)
      setRooms(rooms)
    }
    fetchData();
  },[])
  return (
    <div className="room-view">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <div className="corner-dot"></div>
      {rooms.map((room, index) => {
        const angle = (360 / rooms.length) * index; // Calculate angle for each room
        const radius = 200; // Distance from the corner dot
        const x = Math.cos((angle * Math.PI) / 180) * radius; // X position
        const y = Math.sin((angle * Math.PI) / 180) * radius; // Y position
        return (
          <div
            key={room._id}
            className="room"
            style={{
              position: 'absolute',
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: 'translate(-50%, -50%)', // Center the room element
            }}
            onClick={() => onRoomClick(room)}
          >
            {room.roomName}
          </div>
        );
      })}
    </div>
  );
};

export default RoomView;
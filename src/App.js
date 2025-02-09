import React, { useState } from 'react';
import metadata from './metadata.json';
import FloorView from './FloorView';
import RoomView from './RoomView';
import './App.css';

const App = () => {
  const [floors, setFloors] = useState(metadata.floors); // State for floors
  const [currentFloor, setCurrentFloor] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleFloorClick = (floor) => {
    setCurrentFloor(floor);
    setCurrentRoom(null);
  };

  const handleRoomClick = (room) => {
    setCurrentRoom(room);
  };

  const handleBack = () => {
    if (currentRoom) {
      setCurrentRoom(null);
    } else if (currentFloor) {
      setCurrentFloor(null);
    }
  };

  const handleAdd = () => {
    if (!currentFloor) {
      // Add new floor
      const floorName = prompt('Enter the name of the new floor:');
      if (floorName) {
        const newFloor = {
          id: `floor${floors.length + 1}`,
          name: floorName,
          rooms: [],
        };
        setFloors([...floors, newFloor]);
      }
    } else if (!currentRoom) {
      // Add new room to the current floor
      const roomName = prompt('Enter the name of the new room:');
      if (roomName) {
        const newRoom = {
          id: `room${currentFloor.rooms.length + 1}`,
          name: roomName,
          appliances: [],
        };
        const updatedFloors = floors.map((floor) =>
          floor.id === currentFloor.id
            ? { ...floor, rooms: [...floor.rooms, newRoom] }
            : floor
        );
        setFloors(updatedFloors);
        updatedFloors.map((floor) => {
          if (floor.id === currentFloor.id) {
            setCurrentFloor(floor)
          }
        })
      }
    } else {
      // Add new device to the current room
      const applianceName = prompt('Enter the name of the new appliance:');
      const diodeId = prompt('Enter the diode ID of the new appliance:');
      const applianceType = prompt(
        'Enter the type of the new appliance (AC, Fan, Light, Sockets, TV, Refrigerator, Washing Machine, Dryer, Oven, Other):'
      );
      if (applianceName && diodeId && applianceType) {
        const newAppliance = {
          id: `appliance${currentRoom.appliances.length + 1}`,
          name: applianceName,
          type: applianceType,
        };
        const updatedFloors = floors.map((floor) =>
          floor.id === currentFloor.id
            ? {
                ...floor,
                rooms: floor.rooms.map((room) =>
                  room.id === currentRoom.id
                    ? { ...room, appliances: [...room.appliances, newAppliance] }
                    : room
                ),
              }
            : floor
        );
        setFloors(updatedFloors);
        updatedFloors.map((floor) => {
          if (floor.id === currentFloor.id) {
            floor.rooms.map((room) =>{
              if (room.id === currentRoom.id) {
                setCurrentRoom(room)
              }
            })
          }
        })
      }
    }
  };

  return (
    <div className="app">
      {!currentFloor && (
        <FloorView floors={floors} onFloorClick={handleFloorClick} />
      )}
      {currentFloor && !currentRoom && (
        <RoomView floor={currentFloor} onRoomClick={handleRoomClick} onBack={handleBack} />
      )}
      {currentRoom && (
        <div className="room-details">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <h2>{currentRoom.name}</h2>
          <div className="appliances">
            {currentRoom.appliances.map((appliance) => (
              <div key={appliance.id} className="appliance-card">
                <h3>{appliance.name}</h3>
                <p>Type: {appliance.type}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="fab" onClick={handleAdd}>
        +
      </button>
    </div>
  );
};

export default App;
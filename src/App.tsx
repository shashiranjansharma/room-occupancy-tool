import { useMemo, useState } from "react";
import { allocateRooms } from "./lib/allocateRooms";
import "./App.css";
import RoomType from "./components/RoomType";

const GUESTS = [23, 45, 155, 374, 22, 99, 100, 101, 115, 209];

export default function App() {
  const [premiumRooms, setPremiumRooms] = useState('0');
  const [economyRooms, setEconomyRooms] = useState('0');

  const result = useMemo(
    () => {
      if (Number.isNaN(Number(premiumRooms)) || Number.isNaN(Number(economyRooms)) || Number(premiumRooms) < 0 || Number(economyRooms) < 0) {
        return {
          premiumRoomsUsed: 0,
          economyRoomsUsed: 0,
          premiumRevenue: 0,
          economyRevenue: 0
        };
      }
      return allocateRooms(Number(premiumRooms), Number(economyRooms), GUESTS);
    },
    [premiumRooms, economyRooms]
  );

  const totalRevenue = result.premiumRevenue + result.economyRevenue;

  return (
    <div className="container">
      <h1 className="text-center mb-2 title">Room Occupancy Optimizer</h1>
      <div className="flex">
        <RoomType roomType="premium" availableRooms={premiumRooms} setAvailableRooms={setPremiumRooms} result={result} />
        <RoomType roomType="economy" availableRooms={economyRooms} setAvailableRooms={setEconomyRooms} result={result} />
      </div>
      <div className="card total-revenue mt-2">
        <h3 className="text-center">
          Total Revenue:
          &nbsp;
          <span
            data-testid="total-revenue"
            data-value={totalRevenue}
          >
            €{totalRevenue}
          </span>
        </h3>
      </div>
    </div>
  );
}


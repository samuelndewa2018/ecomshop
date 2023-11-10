import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { server } from "../../server";
import axios from "axios";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  const callTinnyStk = async () => {
    try {
      await axios.post(`${server}/tiny/tinystk`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents.length !== 0 && (
              <EventCard data={allEvents && allEvents[0]} />
            )}
            <h4>{allEvents?.length === 0 && "No Events at the moment!"}</h4>
          </div>
        </div>
      )}
      <button onClick={() => callTinnyStk()}>click me</button>
    </div>
  );
};

export default Events;

import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import { useEventsPage } from "../../../../../../state/context/ClientEventsPage";
import { formatDate, ceilHour, floorHour } from "../../../../../../utils/time";

const groupBy = (array, key) => {
  return array.reduce((acc, obj) => {
    const property = obj[key];
    if (!acc[property]) {
      acc[property] = [];
    }
    acc[property].push(obj);
    return acc;
  }, {});
};

const Calendar = () => {
  const { eventsList, eventsError } = useEventsPage();
  const [eventsGroupedByDay, setEventsGroupedByDay] = useState([]);
  const [totalBlocksEveryDay, setTotalBlocksEveryDay] = useState([]);
  const [blocksEveryDay, setBlocksEveryDay] = useState([]);

  useEffect(() => {
    const events = eventsList?.map((event) => ({
      ...event,
      day: `${new Date(event.startTime).getFullYear()}-${new Date(
        event.startTime
      ).getMonth()}-${new Date(event.startTime).getDate()}`,
    }));
    // group events by day
    const groupedEvents = groupBy(events, "day");
    // convert object to array, sort by date
    const groupedEventsArray = Object.keys(groupedEvents)
      .map((key) => ({
        day: new Date(key),
        events: groupedEvents[key],
      }))
      .sort((a, b) => a.day - b.day);
    setEventsGroupedByDay(groupedEventsArray);
  }, [eventsList]);

  useEffect(() => {
    const minStartTimes = eventsGroupedByDay?.map((day) =>
      day.events.reduce(
        (min, event) => (event.startTime < min ? event.startTime : min),
        day.events[0].startTime
      )
    );

    const maxEndTimes = eventsGroupedByDay?.map((day) =>
      day.events.reduce(
        (max, event) => (event.endTime > max ? event.endTime : max),
        day.events[0].endTime
      )
    );

    const totalBlocks = minStartTimes?.map((min, index) => {
      const max = maxEndTimes[index];
      const minNextFullHour = ceilHour(min);
      const maxPrevFullHour = floorHour(max);
      let blocks = Math.floor((maxPrevFullHour - minNextFullHour) / 3600000);
      // check if min or max are not full hours
      if (new Date(min).getMinutes() !== 0) {
        blocks += 1;
      } else if (new Date(max).getMinutes() !== 0) {
        blocks += 1;
      }
      return Math.min(Math.max(blocks, 0), 24);
    });
    setTotalBlocksEveryDay(totalBlocks);

    const blocks = minStartTimes?.map((min, index) => {
      const max = maxEndTimes[index];
      const minPrevFullHour = floorHour(min);
      const maxNextFullHour = ceilHour(max);
      const startTime = new Date(minPrevFullHour).getHours();
      let endTime = new Date(maxNextFullHour).getHours();
      if (endTime === 0) endTime = 24;
      let blocks = [];
      for (let i = startTime; i <= endTime; i++) {
        blocks.push(i);
      }
      return blocks;
    });
    setBlocksEveryDay(blocks);
  }, [eventsGroupedByDay]);

  const getIndexOfBlock = (dayIndex, time) => {
    // get length of blocks in previous days
    const prevDays = totalBlocksEveryDay.slice(0, dayIndex);
    const prevDaysBlocks = prevDays.flat().length;
    // get index of block in blocksEveryDay
    const blocks = blocksEveryDay[dayIndex];
    const fullPrevHourTime = floorHour(time);
    const fullPrevHour = new Date(fullPrevHourTime).getHours();
    let index = blocks?.findIndex((block) => block === fullPrevHour);
    if (new Date(time).getMinutes() !== 0) {
      index += new Date(time).getMinutes() / 60;
    }
    return prevDaysBlocks + index;
  };

  const getBlocks = (startTime, endTime) => {
    const oneHour = 60 * 60 * 1000;
    return (new Date(endTime) - new Date(startTime)) / oneHour;
  };

  if (eventsError) {
    return (
      <div className={styles.calendar}>
        <div className={styles.error}>
          {eventsError.data?.message ||
            eventsError.message ||
            "Error loading events"}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h2 className={styles.title}>Calendar</h2>
        </div>
        <div className={styles.events}>
          {eventsList?.map((event) => (
            <div className={styles.event} key={event._id}>
              {event.name}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.timeline}>
          {blocksEveryDay?.map((blocks, index) => (
            <div className={styles.day} key={`${blocks.length}-${index}`}>
              <div className={styles.date}>
                {formatDate(eventsGroupedByDay[index].day)}
              </div>
              <div className={styles.blocks}>
                {blocks?.map((block, blockIndex) => (
                  <span className={styles.block} key={`${block}-${index}`}>
                    {block === 0 || block === 24
                      ? "12 am"
                      : block === 12
                      ? "12 pm"
                      : block > 12
                      ? `${block - 12}`
                      : `${block}`}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.gantts}>
          {eventsGroupedByDay?.map((day, dayIndex) => (
            <div className={styles.gantt} key={day.day}>
              {day.events.map((event) => (
                <div
                  key={event._id}
                  className={styles.block}
                  style={{
                    "--block-size": getBlocks(event.startTime, event.endTime),
                    "--block-index": getIndexOfBlock(dayIndex, event.startTime),
                  }}
                >
                  <div className={styles.tile}>{event.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

import React, { useContext, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { MdClose, MdDragHandle, MdOutlineSchedule } from "react-icons/md";
import { RiCheckFill } from "react-icons/ri";
import GlobalContext from "../context/GlobalContext";
import styles from "../styles/Logbook.module.scss";

const labelsClasses: string[] = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  };

  return (
    <div className={styles.eventModal}>
      <form>
        <header className={styles.eventHeader}>
          <span>
            <MdDragHandle size={"1.5rem"} />
          </span>
          <span className="flex flex-row items-center">
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="cursor-pointer mr-3 hover:text-red-500"
              >
                <AiOutlineDelete size={"1.3rem"} />
              </span>
            )}
            <span
              onClick={() => setShowEventModal(false)}
              className="cursor-pointer hover:text-blue-500"
            >
              <MdClose size={"1.5rem"} />
            </span>
          </span>
        </header>
        <div className="p-4">
          <div className="flex flex-col">
            <div></div>
            <div className="flex items-center pb-1">
              <MdOutlineSchedule size={"1.2rem"} />
              <p className="pl-1">{daySelected.format("dddd, MMMM DD")}</p>
            </div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className={styles.eventInput}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h2 className="pt-4">Description of work done</h2>
            <textarea
              name="description"
              placeholder="Add description"
              value={description}
              required
              rows={4}
              className={styles.eventTextArea}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="mt-2">
              <label htmlFor="diagram">Upload Diagram</label>
              <input id="diagram" type="file" accept="image/*" />
            </div>
            <div className="flex gap-x-2 mt-3 items-center">
              <span className="mr-2">
                <FaRegBookmark />
              </span>
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span>
                      <RiCheckFill />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;

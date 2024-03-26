import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import plus from "../../../assets/resources/plus.svg";
import web from "../../../assets/resources/web.svg";
import settings from "../../../assets/resources/settings.svg";

import css from "./styles/buttons.module.css";

const Buttons = () => {
  const [buttons, setButtons] = useState([
    { id: "widgets", src: plus, alt: "Plus Icon" },
    { id: "web", src: web, alt: "Web Icon" },
    { id: "settings", src: settings, alt: "Settings Icon" },
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(buttons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setButtons(items);
  };

  return (
    <div className={css.Main}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="icons" direction="horizontal">
          {provided => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={css.Tabs}
            >
              {buttons.map((button, index) => (
                <Draggable
                  key={button.id}
                  draggableId={button.id}
                  index={index}
                >
                  {provided => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={css.Icons}
                    >
                      <Link to={`/${button.id}`}>
                        <img src={button.src} alt={button.alt} />
                      </Link>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Buttons;

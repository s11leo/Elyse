import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ item, index }) => (
  <Draggable draggableId={item.id.toString()} index={index}>
    {(provided) => (
      <div
        className={`card ${item.group}`}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <img src={item.content.img} alt={item.content.alt} />
        <div className="card-content">
          <p>{item.content.text}</p>
        </div>
      </div>
    )}
  </Draggable>
);

export default Card;

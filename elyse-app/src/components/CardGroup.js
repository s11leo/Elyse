import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const CardGroup = ({ id, items = [] }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <div
        className="group"
        id={id}
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {items.map((item, index) => (
          <Card key={item.id.toString()} item={item} index={index} />
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default CardGroup;

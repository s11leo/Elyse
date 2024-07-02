export const onDragEnd = (result, groups, setGroups) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    const startGroup = [...groups[source.droppableId]];
    const finishGroup = [...groups[destination.droppableId]];
  
    // Moving within the same group
    if (source.droppableId === destination.droppableId) {
      const [movedItem] = startGroup.splice(source.index, 1);
      startGroup.splice(destination.index, 0, movedItem);
  
      setGroups({
        ...groups,
        [source.droppableId]: startGroup,
      });
      return;
    }
  
    // Moving to a different group
    const [movedItem] = startGroup.splice(source.index, 1);
    movedItem.group = destination.droppableId === 'group-1' || destination.droppableId === 'group-3' ? 'large' : 'small';
    finishGroup.splice(destination.index, 0, movedItem);
  
    setGroups({
      ...groups,
      [source.droppableId]: startGroup,
      [destination.droppableId]: finishGroup,
    });
  };
  
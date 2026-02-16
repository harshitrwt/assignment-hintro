"use client";

import { useApp } from "@/context/AppContext";
import Column from "./Column";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Task } from "@/types";
import { useState } from "react";
import TaskCard from "./TaskCard";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export default function TaskBoard() {
  const { state, dispatch } = useApp();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = state.tasks.find((t: Task) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;
    const task = state.tasks.find((t: Task) => t.id === active.id);
    if (task && task.status !== over.id) {
      dispatch({
        type: "MOVE_TASK",
        id: active.id as string,
        status: over.id as Task["status"],
      });
    }
  };

  let tasks = state.tasks.filter((t: Task) =>
    t.title.toLowerCase().includes(state.search.toLowerCase())
  );

  if (state.filter && state.filter !== "all") {
    tasks = tasks.filter((t: Task) => t.priority === state.filter);
  }

  tasks = [...tasks].sort((a: Task, b: Task) => {
    switch (state.sort) {
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "priority":
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      case "title":
        return a.title.localeCompare(b.title);
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-5 h-full">
        <Column title="To Do" id="todo" tasks={tasks} />
        <Column title="Doing" id="doing" tasks={tasks} />
        <Column title="Done" id="done" tasks={tasks} />
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}

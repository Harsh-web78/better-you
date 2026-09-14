import TaskItem from './TaskItem'

export default function ChecklistTimeline({ tasks, doneMap, onToggle, onExpandWorkout }) {
  return (
    <ol className="animate-rise-in">
      {tasks.map((task, i) => (
        <TaskItem
          key={task.id}
          task={task}
          done={!!doneMap[task.id]}
          isLast={i === tasks.length - 1}
          onToggle={onToggle}
          onExpand={task.expandable ? onExpandWorkout : undefined}
        />
      ))}
    </ol>
  )
}

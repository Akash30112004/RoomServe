import Button from '../common/Button'
import StatusBadge from '../common/StatusBadge'

function TaskCard({ task, onAccept, onInProgress, onCompleted, isUpdated = false }) {
  const canAccept = task.status === 'Pending'
  const canMarkInProgress = task.status === 'Accepted'
  const canMarkCompleted = task.status === 'In Progress'

  return (
    <article
      className={`glass-card p-4 transition duration-300 md:p-5 ${
        isUpdated ? 'ring-1 ring-accent-400/50' : ''
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-500">Room {task.roomNumber}</p>
          <h3 className="mt-1 text-base font-semibold text-white">{task.serviceType}</h3>
        </div>
        <StatusBadge status={task.status} />
      </div>

      <p className="mt-3 text-sm text-ink-300">{task.notes}</p>
      <p className="mt-2 text-xs text-ink-500">Assigned {task.assignedAt}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onAccept(task.id)} disabled={!canAccept}>
          Accept Task
        </Button>
        <Button
          variant="ghost"
          className="px-3 py-2 text-xs"
          onClick={() => onInProgress(task.id)}
          disabled={!canMarkInProgress}
        >
          Mark In Progress
        </Button>
        <Button
          className="px-3 py-2 text-xs"
          onClick={() => onCompleted(task.id)}
          disabled={!canMarkCompleted}
        >
          Mark Completed
        </Button>
      </div>
    </article>
  )
}

export default TaskCard

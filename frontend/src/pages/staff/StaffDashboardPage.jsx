import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import TaskCard from '../../components/cards/TaskCard'
import Button from '../../components/common/Button'
import LoadingSkeleton from '../../components/feedback/LoadingSkeleton'
import { staffTaskSeed } from '../../services/mockData'

const filterOptions = ['All', 'Pending', 'In Progress', 'Completed']

function StaffDashboardPage() {
  const [tasks, setTasks] = useState(staffTaskSeed)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [updatedTaskId, setUpdatedTaskId] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 550)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!updatedTaskId) {
      return undefined
    }

    const timeout = setTimeout(() => {
      setUpdatedTaskId(null)
    }, 900)

    return () => clearTimeout(timeout)
  }, [updatedTaskId])

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'All') {
      return tasks
    }

    return tasks.filter((task) => task.status === activeFilter)
  }, [activeFilter, tasks])

  const counts = useMemo(
    () => ({
      all: tasks.length,
      pending: tasks.filter((task) => task.status === 'Pending').length,
      inProgress: tasks.filter((task) => task.status === 'In Progress').length,
      completed: tasks.filter((task) => task.status === 'Completed').length,
    }),
    [tasks],
  )

  const updateTaskStatus = (taskId, nextStatus, successMessage) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: nextStatus } : task)))
    setUpdatedTaskId(taskId)
    toast.success(successMessage)
  }

  const handleAcceptTask = (taskId) => {
    updateTaskStatus(taskId, 'Accepted', 'Task accepted')
  }

  const handleInProgressTask = (taskId) => {
    updateTaskStatus(taskId, 'In Progress', 'Task moved to in progress')
  }

  const handleCompletedTask = (taskId) => {
    updateTaskStatus(taskId, 'Completed', 'Task marked as completed')
  }

  return (
    <section className="space-y-5 md:space-y-6 fade-slide">
      <header>
        <p className="page-kicker">Staff</p>
        <h1 className="section-title">Task Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">Scan tasks quickly and update request progress in real time.</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">All Tasks</p>
          <p className="mt-2 text-2xl font-semibold text-white">{counts.all}</p>
        </article>
        <article className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-orange-200">{counts.pending}</p>
        </article>
        <article className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">In Progress</p>
          <p className="mt-2 text-2xl font-semibold text-blue-200">{counts.inProgress}</p>
        </article>
        <article className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Completed</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-200">{counts.completed}</p>
        </article>
      </section>

      <section className="glass-card p-4 md:p-5">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'primary' : 'ghost'}
              className="px-3 py-2 text-xs"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="glass-card animate-pulse p-5">
              <LoadingSkeleton className="h-4 w-1/4" />
              <LoadingSkeleton className="mt-2 h-5 w-2/5" />
              <LoadingSkeleton className="mt-4 h-4 w-full" />
              <LoadingSkeleton className="mt-2 h-4 w-4/5" />
            </div>
          ))
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isUpdated={updatedTaskId === task.id}
              onAccept={handleAcceptTask}
              onInProgress={handleInProgressTask}
              onCompleted={handleCompletedTask}
            />
          ))
        ) : (
          <div className="glass-card p-6 text-center">
            <p className="text-sm text-ink-500">No tasks found for the selected filter.</p>
          </div>
        )}
      </section>
    </section>
  )
}

export default StaffDashboardPage

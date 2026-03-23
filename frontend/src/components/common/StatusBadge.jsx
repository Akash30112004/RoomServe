const tones = {
  pending: 'border-orange-300/30 bg-orange-300/10 text-orange-200',
  requested: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
  accepted: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-200',
  in_progress: 'border-blue-300/30 bg-blue-300/10 text-blue-200',
  completed: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
  occupied: 'border-rose-300/30 bg-rose-300/10 text-rose-200',
  vacant: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
}

function StatusBadge({ status }) {
  const normalized = status.toLowerCase().replace(/\s+/g, '_')

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${tones[normalized] ?? 'border-white/20 bg-white/10 text-ink-300'}`}
    >
      {status.replace('_', ' ')}
    </span>
  )
}

export default StatusBadge

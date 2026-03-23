import { createElement } from 'react'

function ServiceCard({ title, icon, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group glass-card w-full text-left transition duration-300 hover:-translate-y-1 hover:border-accent-500/45 hover:bg-ink-700/70"
    >
      <div className="p-5">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-400 transition group-hover:scale-105 group-hover:border-accent-500/45">
          {createElement(icon, { size: 20 })}
        </div>
        <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-ink-500">{description}</p>
      </div>
    </button>
  )
}

export default ServiceCard

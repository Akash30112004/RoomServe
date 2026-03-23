import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  AlertTriangle,
  Check,
  CircleDot,
  CircleCheckBig,
  CookingPot,
  House,
  LoaderCircle,
  Search,
  Shirt,
  Wifi,
} from 'lucide-react'
import toast from 'react-hot-toast'
import ServiceCard from '../../components/cards/ServiceCard'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingSkeleton from '../../components/feedback/LoadingSkeleton'
import {
  bootstrappedData,
  foodMenuCatalog,
  guestRequestStatuses,
  guestServiceOptions,
} from '../../services/mockData'

const iconByService = {
  'House Cleaning': House,
  'WiFi Service': Wifi,
  'Food Order': CookingPot,
  Laundry: Shirt,
  'Report Issue': AlertTriangle,
}

const notesPlaceholderByService = {
  'House Cleaning': 'Ex: Please clean after 2 PM and change bedsheets.',
  'WiFi Service': 'Ex: WiFi not connecting on laptop, please assist.',
  'Food Order': 'Ex: Tea should be sweet, Rajma should not be too spicy.',
  Laundry: 'Ex: Please use express laundry, pickup after 6 PM.',
  'Report Issue': 'Ex: AC not cooling, bathroom light flickering.',
}

const statusIcon = {
  Requested: CircleDot,
  Accepted: CircleCheckBig,
  'In Progress': LoaderCircle,
  Completed: CircleCheckBig,
}

function GuestRoomPage() {
  const { token } = useParams()
  const [selectedService, setSelectedService] = useState(null)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFoodItems, setSelectedFoodItems] = useState({})
  const [menuSearchTerm, setMenuSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('')
  const menuSectionRefs = useRef({})

  const roomNumber = bootstrappedData.room.number

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 550)

    return () => clearTimeout(timeout)
  }, [])

  const statusList = useMemo(
    () =>
      guestRequestStatuses.map((item) => ({
        ...item,
        Icon: statusIcon[item.status] ?? CircleDot,
      })),
    [],
  )

  const openServiceModal = (service) => {
    setSelectedService(service)
  }

  const closeServiceModal = () => {
    setSelectedService(null)
    setNotes('')
    setIsSubmitting(false)
    setSelectedFoodItems({})
    setMenuSearchTerm('')
  }

  const increaseFoodQuantity = (itemName) => {
    setSelectedFoodItems((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] ?? 0) + 1,
    }))
  }

  const decreaseFoodQuantity = (itemName) => {
    setSelectedFoodItems((prev) => {
      const current = prev[itemName] ?? 0

      if (current <= 1) {
        const { [itemName]: _removed, ...rest } = prev
        return rest
      }

      return {
        ...prev,
        [itemName]: current - 1,
      }
    })
  }

  const selectedFoodSummary = useMemo(() => {
    return Object.entries(selectedFoodItems)
      .filter(([, quantity]) => quantity > 0)
      .map(([item, quantity]) => `${item} x${quantity}`)
  }, [selectedFoodItems])

  const totalFoodAmount = useMemo(() => {
    return foodMenuCatalog.reduce((sum, group) => {
      return (
        sum +
        group.items.reduce((inner, item) => {
          const qty = selectedFoodItems[item.name] ?? 0
          return inner + qty * item.price
        }, 0)
      )
    }, 0)
  }, [selectedFoodItems])

  const filteredFoodMenuCatalog = useMemo(() => {
    const query = menuSearchTerm.trim().toLowerCase()

    if (!query) {
      return foodMenuCatalog
    }

    return foodMenuCatalog
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.name.toLowerCase().includes(query)),
      }))
      .filter((group) => group.items.length > 0)
  }, [menuSearchTerm])

  useEffect(() => {
    if (filteredFoodMenuCatalog.length > 0) {
      setActiveCategory(filteredFoodMenuCatalog[0].category)
      return
    }

    setActiveCategory('')
  }, [filteredFoodMenuCatalog])

  const scrollToCategory = (category) => {
    const target = menuSectionRefs.current[category]

    if (!target) {
      return
    }

    setActiveCategory(category)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedService) {
      return
    }

    if (selectedService.title === 'Food Order' && selectedFoodSummary.length === 0) {
      toast.error('Please select at least one food item')
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })

    toast.success(
      selectedService.title === 'Food Order'
        ? `Food order submitted (${selectedFoodSummary.length} item${selectedFoodSummary.length > 1 ? 's' : ''})`
        : `${selectedService.title} request submitted`,
    )
    closeServiceModal()
  }

  return (
    <div className="space-y-5 md:space-y-6 fade-slide">
      <section className="glass-card p-5 md:p-7">
        <p className="page-kicker">Guest Portal</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="section-title">Room {roomNumber}</h1>
            <p className="mt-1 text-sm text-ink-500">Welcome to RoomServe. Token: {token}</p>
          </div>
          <span className="rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-400">
            Connected
          </span>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="section-title text-lg md:text-xl">Services</h2>
        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: guestServiceOptions.length }).map((_, index) => (
              <div key={index} className="glass-card animate-pulse p-5">
                <LoadingSkeleton className="h-11 w-11 rounded-xl" />
                <LoadingSkeleton className="mt-4 h-5 w-1/2" />
                <LoadingSkeleton className="mt-2 h-4 w-4/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {guestServiceOptions.map((service) => {
              const Icon = iconByService[service.title] ?? CircleDot
              return (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={Icon}
                  onClick={() => openServiceModal(service)}
                />
              )
            })}
          </div>
        )}
      </section>

      <section className="glass-card p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="section-title text-lg md:text-xl">Request Status</h2>
          <span className="text-xs text-ink-500">Live Updates</span>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <LoadingSkeleton className="h-4 w-2/5" />
                <LoadingSkeleton className="mt-2 h-3 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {statusList.map((item) => {
              const ItemIcon = item.Icon
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-ink-900 text-accent-400">
                      <ItemIcon size={16} className={item.status === 'In Progress' ? 'animate-spin' : ''} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.service}</p>
                      <p className="text-xs text-ink-500">{item.time}</p>
                    </div>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <Modal
        isOpen={Boolean(selectedService)}
        onClose={closeServiceModal}
        title={selectedService ? `Request ${selectedService.title}` : 'Request Service'}
        description="Share any notes to help our team fulfill your request faster."
        fullScreen={selectedService?.title === 'Food Order'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          {selectedService?.title === 'Food Order' ? (
            <div className="grid gap-4 lg:grid-cols-[220px_1fr_280px]">
              <aside className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-3 lg:sticky lg:top-0 lg:h-fit">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500">Categories</p>
                <div className="space-y-1.5">
                  {filteredFoodMenuCatalog.map((group) => (
                    <button
                      type="button"
                      key={group.category}
                      onClick={() => scrollToCategory(group.category)}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                        activeCategory === group.category
                          ? 'border-accent-500/50 bg-accent-500/10 text-accent-300'
                          : 'border-white/10 text-ink-300 hover:border-white/25 hover:bg-white/5'
                      }`}
                    >
                      {group.category}
                    </button>
                  ))}
                </div>
              </aside>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" size={16} />
                  <input
                    value={menuSearchTerm}
                    onChange={(event) => setMenuSearchTerm(event.target.value)}
                    placeholder="Search menu item"
                    className="w-full rounded-xl border border-white/15 bg-ink-900 px-9 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                  />
                </div>

                <div className="max-h-[52dvh] space-y-4 overflow-y-auto pr-1 md:max-h-[60dvh]">
                  {filteredFoodMenuCatalog.map((group) => (
                    <section
                      key={group.category}
                      className="space-y-2"
                      ref={(element) => {
                        if (element) {
                          menuSectionRefs.current[group.category] = element
                        }
                      }}
                    >
                      <h3 className="text-sm font-semibold text-white">{group.category}</h3>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {group.items.map((item) => {
                          const quantity = selectedFoodItems[item.name] ?? 0

                          return (
                            <article key={item.name} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                <div className="space-y-2 p-3">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-semibold text-white">{item.name}</p>
                                  <p className="text-sm font-semibold text-accent-400">Rs. {item.price}</p>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                  {item.tags.map((tag) => (
                                    <span key={tag} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-ink-500">
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => decreaseFoodQuantity(item.name)}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 text-sm text-ink-300 transition hover:border-white/30"
                                  >
                                    -
                                  </button>
                                  <span className="min-w-5 text-center text-sm font-medium text-white">{quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() => increaseFoodQuantity(item.name)}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 text-sm text-ink-300 transition hover:border-white/30"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </article>
                          )
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              <aside className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-3 lg:sticky lg:top-0 lg:h-fit">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500">Order Summary</p>
                {selectedFoodSummary.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedFoodSummary.map((line) => (
                      <li key={line} className="flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-2 text-sm text-white">
                        <Check size={14} className="text-accent-400" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rounded-lg border border-white/10 px-2.5 py-2 text-sm text-ink-300">No food item selected yet.</p>
                )}

                <div className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-3 py-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-accent-400">Estimated Total</p>
                  <p className="mt-1 text-lg font-semibold text-white">Rs. {totalFoodAmount}</p>
                </div>
              </aside>
            </div>
          ) : null}

          <label className="block space-y-1">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500">
              {selectedService?.title === 'Food Order' ? 'Food Changes / Special Instructions' : 'Notes'}
            </span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder={
                selectedService
                  ? notesPlaceholderByService[selectedService.title] ?? 'Share any helpful details for your request.'
                  : 'Share any helpful details for your request.'
              }
              className="w-full resize-none rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
            />
          </label>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={closeServiceModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default GuestRoomPage

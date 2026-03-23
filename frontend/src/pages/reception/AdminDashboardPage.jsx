import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingSkeleton from '../../components/feedback/LoadingSkeleton'
import { receptionServiceTypes, roomInventorySeed } from '../../services/mockData'

function AdminDashboardPage() {
  const [rooms, setRooms] = useState(roomInventorySeed)
  const [isLoading, setIsLoading] = useState(true)
  const [formState, setFormState] = useState({
    roomNumber: '',
    serviceType: receptionServiceTypes[0],
    notes: '',
  })
  const [bookingForm, setBookingForm] = useState({
    roomNumber: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    checkInDate: '',
    checkOutDate: '',
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 550)

    return () => clearTimeout(timeout)
  }, [])

  const metrics = useMemo(
    () => ({
      totalRooms: rooms.length,
      occupied: rooms.filter((room) => room.status === 'Occupied').length,
      vacant: rooms.filter((room) => room.status === 'Vacant').length,
    }),
    [rooms],
  )

  const toggleRoomStatus = (roomId) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: room.status === 'Occupied' ? 'Vacant' : 'Occupied',
              customerName: room.status === 'Occupied' ? '' : room.customerName,
              customerEmail: room.status === 'Occupied' ? '' : room.customerEmail,
              customerPhone: room.status === 'Occupied' ? '' : room.customerPhone,
              checkInDate: room.status === 'Occupied' ? '' : room.checkInDate,
              checkOutDate: room.status === 'Occupied' ? '' : room.checkOutDate,
            }
          : room,
      ),
    )

    const room = rooms.find((item) => item.id === roomId)

    if (!room) {
      return
    }

    const nextStatus = room.status === 'Occupied' ? 'Vacant' : 'Occupied'
    toast.success(`Room ${room.roomNumber} marked ${nextStatus.toLowerCase()}`)
  }

  const handleGenerateQr = (roomNumber) => {
    toast.success(`QR placeholder generated for room ${roomNumber}`)
  }

  const handleInputChange = (field) => (event) => {
    setFormState((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleBookingInputChange = (field) => (event) => {
    setBookingForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSubmitRequest = (event) => {
    event.preventDefault()

    if (!formState.roomNumber.trim()) {
      toast.error('Room number is required')
      return
    }

    toast.success(`Manual request created for room ${formState.roomNumber}`)
    setFormState({
      roomNumber: '',
      serviceType: receptionServiceTypes[0],
      notes: '',
    })
  }

  const handleSubmitBooking = (event) => {
    event.preventDefault()

    if (
      !bookingForm.roomNumber.trim() ||
      !bookingForm.customerName.trim() ||
      !bookingForm.customerEmail.trim()
    ) {
      toast.error('Room number, customer name and email are required')
      return
    }

    const roomIndex = rooms.findIndex((room) => room.roomNumber === bookingForm.roomNumber.trim())

    if (roomIndex < 0) {
      toast.error('Room not found')
      return
    }

    if (rooms[roomIndex].status === 'Occupied') {
      toast.error(`Room ${bookingForm.roomNumber} is already occupied`)
      return
    }

    setRooms((prev) =>
      prev.map((room) =>
        room.roomNumber === bookingForm.roomNumber.trim()
          ? {
              ...room,
              status: 'Occupied',
              customerName: bookingForm.customerName.trim(),
              customerEmail: bookingForm.customerEmail.trim(),
              customerPhone: bookingForm.customerPhone.trim(),
              checkInDate: bookingForm.checkInDate,
              checkOutDate: bookingForm.checkOutDate,
            }
          : room,
      ),
    )

    toast.success(`Booking saved for room ${bookingForm.roomNumber}`)

    setBookingForm({
      roomNumber: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      checkInDate: '',
      checkOutDate: '',
    })
  }

  return (
    <section className="space-y-5 md:space-y-6 fade-slide">
      <header>
        <p className="page-kicker">Reception</p>
        <h1 className="section-title">Operations Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">Manage room occupancy and create service requests from one place.</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Total Rooms</p>
          <p className="mt-2 text-2xl font-semibold text-white">{metrics.totalRooms}</p>
        </article>
        <article className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Occupied</p>
          <p className="mt-2 text-2xl font-semibold text-rose-200">{metrics.occupied}</p>
        </article>
        <article className="glass-card p-4 sm:col-span-2 xl:col-span-1">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Vacant</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-200">{metrics.vacant}</p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="glass-card overflow-hidden">
          <header className="border-b border-white/10 px-4 py-3 md:px-5">
            <h2 className="text-base font-semibold text-white">Room Status</h2>
          </header>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-ink-500">
                <tr>
                  <th className="px-4 py-3 md:px-5">Room</th>
                  <th className="px-4 py-3 md:px-5">Customer</th>
                  <th className="px-4 py-3 md:px-5">Email</th>
                  <th className="px-4 py-3 md:px-5">Status</th>
                  <th className="px-4 py-3 md:px-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="border-t border-white/10">
                        <td className="px-4 py-4 md:px-5">
                          <LoadingSkeleton className="h-4 w-12" />
                        </td>
                        <td className="px-4 py-4 md:px-5">
                          <LoadingSkeleton className="h-4 w-28" />
                        </td>
                        <td className="px-4 py-4 md:px-5">
                          <LoadingSkeleton className="h-4 w-36" />
                        </td>
                        <td className="px-4 py-4 md:px-5">
                          <LoadingSkeleton className="h-4 w-20" />
                        </td>
                        <td className="px-4 py-4 md:px-5">
                          <LoadingSkeleton className="h-8 w-40" />
                        </td>
                      </tr>
                    ))
                  : rooms.map((room) => (
                      <tr key={room.id} className="border-t border-white/10">
                        <td className="px-4 py-4 font-medium text-white md:px-5">{room.roomNumber}</td>
                        <td className="px-4 py-4 md:px-5 text-sm text-ink-300">
                          {room.status === 'Occupied' ? room.customerName : 'Vacant'}
                        </td>
                        <td className="px-4 py-4 md:px-5 text-sm text-ink-500">
                          {room.status === 'Occupied' ? room.customerEmail : '--'}
                        </td>
                        <td className="px-4 py-4 md:px-5">
                          <StatusBadge status={room.status} />
                        </td>
                        <td className="px-4 py-4 md:px-5">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="ghost"
                              className="px-3 py-2 text-xs"
                              onClick={() => toggleRoomStatus(room.id)}
                            >
                              Mark {room.status === 'Occupied' ? 'Vacant' : 'Occupied'}
                            </Button>
                            <Button
                              variant="ghost"
                              className="px-3 py-2 text-xs"
                              onClick={() => handleGenerateQr(room.roomNumber)}
                            >
                              Generate QR
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="space-y-4">
          <article className="glass-card p-4 md:p-5">
            <h2 className="text-base font-semibold text-white">Customer Booking Entry</h2>
            <p className="mt-1 text-sm text-ink-500">Enter customer details while booking and assign a room.</p>

            <form className="mt-4 space-y-3" onSubmit={handleSubmitBooking}>
              <label className="block space-y-1">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Room Number</span>
                <input
                  value={bookingForm.roomNumber}
                  onChange={handleBookingInputChange('roomNumber')}
                  placeholder="e.g. 102"
                  className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Customer Name</span>
                <input
                  value={bookingForm.customerName}
                  onChange={handleBookingInputChange('customerName')}
                  placeholder="Customer full name"
                  className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Customer Email</span>
                <input
                  type="email"
                  value={bookingForm.customerEmail}
                  onChange={handleBookingInputChange('customerEmail')}
                  placeholder="customer@email.com"
                  className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Customer Phone</span>
                <input
                  value={bookingForm.customerPhone}
                  onChange={handleBookingInputChange('customerPhone')}
                  placeholder="+91XXXXXXXXXX"
                  className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Check-in</span>
                  <input
                    type="date"
                    value={bookingForm.checkInDate}
                    onChange={handleBookingInputChange('checkInDate')}
                    className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Check-out</span>
                  <input
                    type="date"
                    value={bookingForm.checkOutDate}
                    onChange={handleBookingInputChange('checkOutDate')}
                    className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                  />
                </label>
              </div>

              <Button type="submit" className="w-full">
                Save Booking
              </Button>
            </form>
          </article>

          <article className="glass-card p-4 md:p-5">
            <h2 className="text-base font-semibold text-white">Manual Service Request</h2>
            <p className="mt-1 text-sm text-ink-500">Create requests when guests contact reception directly.</p>

            <form className="mt-4 space-y-3" onSubmit={handleSubmitRequest}>
              <label className="block space-y-1">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Room Number</span>
                <input
                  value={formState.roomNumber}
                  onChange={handleInputChange('roomNumber')}
                  placeholder="e.g. 205"
                  className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Service Type</span>
                <select
                  value={formState.serviceType}
                  onChange={handleInputChange('serviceType')}
                  className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                >
                  {receptionServiceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1">
                <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Notes</span>
                <textarea
                  rows={4}
                  value={formState.notes}
                  onChange={handleInputChange('notes')}
                  placeholder="Any special notes for the service team"
                  className="w-full resize-none rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
                />
              </label>

              <Button type="submit" className="w-full">
                Create Request
              </Button>
            </form>
          </article>
        </div>
      </section>
    </section>
  )
}

export default AdminDashboardPage

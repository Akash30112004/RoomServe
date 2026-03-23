export const bootstrappedData = {
  room: {
    number: '501',
    token: 'ROOM501',
  },
}

export const guestServiceOptions = [
  {
    id: 'house-cleaning',
    title: 'House Cleaning',
    description: 'Request cleaning support for your room.',
  },
  {
    id: 'wifi-service',
    title: 'WiFi Service',
    description: 'Get internet connectivity help and router support.',
  },
  {
    id: 'food-order',
    title: 'Food Order',
    description: 'Place a quick in-room meal request.',
  },
  {
    id: 'laundry',
    title: 'Laundry',
    description: 'Send your clothes for laundry service.',
  },
  {
    id: 'report-issue',
    title: 'Report Issue',
    description: 'Notify staff about any room issue.',
  },
]

export const guestRequestStatuses = [
  {
    id: 1,
    service: 'WiFi Service',
    status: 'Requested',
    time: '2m ago',
  },
  {
    id: 2,
    service: 'Food Order',
    status: 'Accepted',
    time: '15m ago',
  },
  {
    id: 3,
    service: 'House Cleaning',
    status: 'In Progress',
    time: '32m ago',
  },
  {
    id: 4,
    service: 'Report Issue',
    status: 'Completed',
    time: '1h ago',
  },
]

export const staffTaskSeed = [
  {
    id: 'task-1001',
    roomNumber: '401',
    serviceType: 'WiFi Service',
    notes: 'WiFi keeps disconnecting on laptop.',
    status: 'Pending',
    assignedAt: '3m ago',
  },
  {
    id: 'task-1002',
    roomNumber: '317',
    serviceType: 'House Cleaning',
    notes: 'Guest requested after 2 PM.',
    status: 'In Progress',
    assignedAt: '18m ago',
  },
  {
    id: 'task-1003',
    roomNumber: '210',
    serviceType: 'Laundry',
    notes: 'Express service if possible.',
    status: 'Completed',
    assignedAt: '45m ago',
  },
  {
    id: 'task-1004',
    roomNumber: '505',
    serviceType: 'Report Issue',
    notes: 'AC not cooling properly.',
    status: 'Pending',
    assignedAt: '1h ago',
  },
  {
    id: 'task-1005',
    roomNumber: '124',
    serviceType: 'Food Order',
    notes: 'Low spice and extra napkins.',
    status: 'Accepted',
    assignedAt: '1h ago',
  },
]

export const roomInventorySeed = [
  {
    id: 'room-101',
    roomNumber: '101',
    status: 'Occupied',
    customerName: 'Arjun Malhotra',
    customerEmail: 'arjun.malhotra@example.com',
  },
  {
    id: 'room-102',
    roomNumber: '102',
    status: 'Vacant',
    customerName: '',
    customerEmail: '',
  },
  {
    id: 'room-103',
    roomNumber: '103',
    status: 'Occupied',
    customerName: 'Rhea Kapoor',
    customerEmail: 'rhea.kapoor@example.com',
  },
  {
    id: 'room-104',
    roomNumber: '104',
    status: 'Vacant',
    customerName: '',
    customerEmail: '',
  },
  {
    id: 'room-105',
    roomNumber: '105',
    status: 'Occupied',
    customerName: 'Daniel Joseph',
    customerEmail: 'daniel.joseph@example.com',
  },
  {
    id: 'room-106',
    roomNumber: '106',
    status: 'Vacant',
    customerName: '',
    customerEmail: '',
  },
]

export const receptionServiceTypes = [
  'House Cleaning',
  'WiFi Service',
  'Food Order',
  'Laundry',
  'Report Issue',
]

export const managerKpiSeed = [
  { id: 'total-requests', label: 'Total Requests', value: '284', trend: '+12% this week' },
  { id: 'pending-tasks', label: 'Pending Tasks', value: '34', trend: '-8% from yesterday' },
  { id: 'completed-tasks', label: 'Completed Tasks', value: '250', trend: '+18% this week' },
  { id: 'avg-response', label: 'Avg Response Time', value: '12m', trend: '-2m improvement' },
]

export const staffPerformanceSeed = [
  { id: 'stf-1', name: 'Anita Roy', tasksCompleted: 42, avgResponse: '10m', delays: 2 },
  { id: 'stf-2', name: 'Rahul Mehta', tasksCompleted: 38, avgResponse: '12m', delays: 3 },
  { id: 'stf-3', name: 'Sana Iqbal', tasksCompleted: 35, avgResponse: '11m', delays: 1 },
  { id: 'stf-4', name: 'Vikram Das', tasksCompleted: 29, avgResponse: '14m', delays: 4 },
]

export const managerActivitySeed = [
  {
    id: 'act-1',
    text: 'Room 317 laundry request completed by Sana Iqbal',
    time: '3m ago',
  },
  {
    id: 'act-2',
    text: 'Reception created a manual issue request for Room 505',
    time: '11m ago',
  },
  {
    id: 'act-3',
    text: 'Food order requests increased by 9% in lunch window',
    time: '27m ago',
  },
  {
    id: 'act-4',
    text: 'Average response time dropped below 12 minutes',
    time: '55m ago',
  },
]

export const managerRequestTrendSeed = [
  { day: 'Mon', requests: 32 },
  { day: 'Tue', requests: 36 },
  { day: 'Wed', requests: 41 },
  { day: 'Thu', requests: 38 },
  { day: 'Fri', requests: 46 },
  { day: 'Sat', requests: 51 },
  { day: 'Sun', requests: 40 },
]

export const foodMenuCatalog = [
  {
    category: 'Indian Main Course',
    items: [
      {
        name: 'Paneer Butter Masala',
        price: 260,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        tags: ['Veg', 'Popular'],
      },
      {
        name: 'Dal Tadka',
        price: 190,
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
        tags: ['Veg'],
      },
      {
        name: 'Rajma Masala',
        price: 220,
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
        tags: ['Veg', 'Comfort'],
      },
      {
        name: 'Chole Bhature',
        price: 240,
        image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
        tags: ['Popular'],
      },
      {
        name: 'Veg Biryani',
        price: 280,
        image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg',
        tags: ['Chef Special'],
      },
      {
        name: 'Jeera Rice',
        price: 160,
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
        tags: ['Veg'],
      },
      {
        name: 'Butter Naan',
        price: 75,
        image: 'https://images.pexels.com/photos/5409022/pexels-photo-5409022.jpeg',
        tags: ['Bread'],
      },
      {
        name: 'Tandoori Roti',
        price: 55,
        image: 'https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg',
        tags: ['Bread'],
      },
    ],
  },
  {
    category: 'Chinese',
    items: [
      {
        name: 'Veg Hakka Noodles',
        price: 230,
        image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',
        tags: ['Veg'],
      },
      {
        name: 'Schezwan Noodles',
        price: 245,
        image: 'https://images.pexels.com/photos/6249524/pexels-photo-6249524.jpeg',
        tags: ['Spicy'],
      },
      {
        name: 'Veg Fried Rice',
        price: 220,
        image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
        tags: ['Veg'],
      },
      {
        name: 'Manchurian Gravy',
        price: 260,
        image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
        tags: ['Popular'],
      },
      {
        name: 'Chilli Paneer',
        price: 275,
        image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
        tags: ['Spicy'],
      },
      {
        name: 'Spring Rolls',
        price: 210,
        image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
        tags: ['Snacks'],
      },
      {
        name: 'Hot and Sour Soup',
        price: 170,
        image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
        tags: ['Soup'],
      },
    ],
  },
  {
    category: 'South Indian',
    items: [
      {
        name: 'Masala Dosa',
        price: 180,
        image: 'https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg',
        tags: ['Popular'],
      },
      {
        name: 'Plain Dosa',
        price: 150,
        image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg',
        tags: ['Veg'],
      },
      {
        name: 'Idli Sambar',
        price: 140,
        image: 'https://images.pexels.com/photos/5410401/pexels-photo-5410401.jpeg',
        tags: ['Healthy'],
      },
      {
        name: 'Vada Sambar',
        price: 150,
        image: 'https://images.pexels.com/photos/5410402/pexels-photo-5410402.jpeg',
        tags: ['Crunchy'],
      },
      {
        name: 'Upma',
        price: 130,
        image: 'https://images.pexels.com/photos/5638733/pexels-photo-5638733.jpeg',
        tags: ['Breakfast'],
      },
      {
        name: 'Curd Rice',
        price: 145,
        image: 'https://images.pexels.com/photos/7658701/pexels-photo-7658701.jpeg',
        tags: ['Cooling'],
      },
    ],
  },
  {
    category: 'Snacks',
    items: [
      {
        name: 'Veg Sandwich',
        price: 165,
        image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg',
        tags: ['Quick Bite'],
      },
      {
        name: 'Club Sandwich',
        price: 210,
        image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
        tags: ['Filling'],
      },
      {
        name: 'French Fries',
        price: 150,
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg',
        tags: ['Crunchy'],
      },
      {
        name: 'Cheese Garlic Bread',
        price: 175,
        image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
        tags: ['Cheesy'],
      },
      {
        name: 'Paneer Tikka',
        price: 250,
        image: 'https://images.pexels.com/photos/5639421/pexels-photo-5639421.jpeg',
        tags: ['Starter'],
      },
      {
        name: 'Samosa',
        price: 90,
        image: 'https://images.pexels.com/photos/144240/samosa-snack-food-indian-144240.jpeg',
        tags: ['Snack'],
      },
    ],
  },
  {
    category: 'Beverages',
    items: [
      {
        name: 'Masala Tea',
        price: 80,
        image: 'https://images.pexels.com/photos/5946971/pexels-photo-5946971.jpeg',
        tags: ['Hot'],
      },
      {
        name: 'Green Tea',
        price: 90,
        image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
        tags: ['Healthy'],
      },
      {
        name: 'Black Coffee',
        price: 110,
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
        tags: ['Hot'],
      },
      {
        name: 'Cold Coffee',
        price: 145,
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
        tags: ['Cold'],
      },
      {
        name: 'Fresh Lime Soda',
        price: 120,
        image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
        tags: ['Refreshing'],
      },
      {
        name: 'Orange Juice',
        price: 130,
        image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg',
        tags: ['Juice'],
      },
      {
        name: 'Mango Shake',
        price: 160,
        image: 'https://images.pexels.com/photos/5946639/pexels-photo-5946639.jpeg',
        tags: ['Shake'],
      },
      {
        name: 'Mineral Water',
        price: 50,
        image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
        tags: ['Basic'],
      },
    ],
  },
  {
    category: 'Desserts',
    items: [
      {
        name: 'Gulab Jamun',
        price: 125,
        image: 'https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg',
        tags: ['Sweet'],
      },
      {
        name: 'Ice Cream',
        price: 140,
        image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg',
        tags: ['Cold'],
      },
      {
        name: 'Brownie',
        price: 155,
        image: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg',
        tags: ['Chocolate'],
      },
      {
        name: 'Fruit Salad',
        price: 135,
        image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
        tags: ['Healthy'],
      },
      {
        name: 'Kheer',
        price: 130,
        image: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg',
        tags: ['Traditional'],
      },
    ],
  },
]

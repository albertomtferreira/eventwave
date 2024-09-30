export const headerLinks = [
  {
    id: "0",
    label: 'Home',
    route: '/',
  },
  {
    id: "1",
    label: 'Create Event',
    route: '/events/create',
  },
  {
    id: "2",
    label: 'My Profile',
    route: '/profile',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  locality: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}
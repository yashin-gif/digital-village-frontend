export const STORAGE_KEYS = {
  language: 'village-language',
}

// গ্রামের ম্যাপ খোঁজার ঠিকানা (পিন ঠিক জায়গায় না এলে এটা বদলে নিও)
export const VILLAGE_MAP_QUERY = 'Bogarchar, Bakshiganj, Jamalpur, Bangladesh'

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

// "গ্রামীণ সেবা" ড্রপডাউনের লিংক
export const SERVICE_LINKS = [
  { key: 'people', to: '/people' },
  { key: 'families', to: '/families' },
  { key: 'blood', to: '/blood-donors' },
  { key: 'mosques', to: '/mosques' },
  { key: 'institutions', to: '/institutions' },
  { key: 'places', to: '/places' },
]

// মূল মেনু (children থাকলে ড্রপডাউন হবে)
export const MAIN_NAV = [
  { key: 'home', to: '/' },
  { key: 'biography', to: '/biography' },
  { key: 'about', to: '/about' },
  { key: 'services', children: SERVICE_LINKS },
  { key: 'news', to: '/news' },
]
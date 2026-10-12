import {
  Building2,
  Droplets,
  GraduationCap,
  HandHeart,
  HandCoins,
  House,
  LayoutDashboard,
  Map as MapIcon,
  Mic,
  BookOpen,
  Megaphone,
  Newspaper,
  School,
  Siren,
  UserCog,
  Users,
} from 'lucide-react'
import { BLOOD_GROUPS } from './constants'
import { getFullName } from './helpers'

// অ্যাডমিন সাইডবারের মেনু
export const ADMIN_NAV = [
  { key: 'dashboard', to: '/admin', Icon: LayoutDashboard, end: true },
  { key: 'users', to: '/admin/users', Icon: UserCog },
  { key: 'people', to: '/admin/people', Icon: Users },
  { key: 'families', to: '/admin/families', Icon: House },
  { key: 'blood', to: '/admin/blood', Icon: Droplets },
  { key: 'zakat', to: '/admin/zakat', Icon: HandCoins },
  { key: 'help', to: '/admin/help', Icon: HandHeart },
  { key: 'education', to: '/admin/education', Icon: GraduationCap },
  { key: 'bayan', to: '/admin/bayan', Icon: Mic },
  { key: 'kitab', to: '/admin/kitab', Icon: BookOpen },
  { key: 'kitabProgress', to: '/admin/kitab-progress', Icon: BookOpen },
  { key: 'mosques', to: '/admin/mosques', Icon: Building2 },
  { key: 'institutions', to: '/admin/institutions', Icon: School },
  { key: 'places', to: '/admin/places', Icon: MapIcon },
  { key: 'news', to: '/admin/news', Icon: Newspaper },
  { key: 'announcements', to: '/admin/announcements', Icon: Megaphone },
  { key: 'emergency', to: '/admin/emergency', Icon: Siren },
]

export const EMERGENCY_TYPES = ['medical', 'fire', 'flood', 'accident', 'other']

// প্রতিটি রিসোর্সের বর্ণনা। ফর্ম, টেবিল ও খোঁজ — সব এখান থেকে তৈরি হয়।
// field.type: text | tel | email | date | password | textarea | checkbox | number | select | relation
// field.asDateTime: date ফিল্ড ব্যাকেন্ডে datetime হলে "YYYY-MM-DDT00:00:00" পাঠায়
// relation: অন্য রিসোর্সের আইডি (resource), label(item) দিয়ে নাম দেখায়
// সম্পর্কিত নাম: "label" বাছাই-বক্সে দেখায়, "shows" টেবিলে (সার্ভার থেকে আসা নাম)
const personRelation = (name, required = false) => ({
  name,
  type: 'relation',
  resource: 'people',
  required,
  label: getFullName,
  shows: 'person_name',
})

export const ADMIN_RESOURCES = {
  people: {
    path: '/people/',
    fields: [
      { name: 'first_name', type: 'text', required: true },
      { name: 'last_name', type: 'text' },
      { name: 'gender', type: 'select', options: ['male', 'female'] },
      { name: 'date_of_birth', type: 'date' },
      { name: 'phone', type: 'tel' },
      { name: 'blood_group', type: 'select', options: BLOOD_GROUPS },
      { name: 'occupation', type: 'text' },
      { name: 'current_location', type: 'text' },
      { name: 'family_id', type: 'relation', resource: 'families', required: true, label: (family) => family.head_name, shows: 'family_head' },
      { name: 'is_blood_donor', type: 'checkbox' },
      { name: 'is_disabled', type: 'checkbox' },
      { name: 'is_widow', type: 'checkbox' },
      { name: 'needs_assistance', type: 'checkbox' },
    ],
    columns: ['first_name', 'last_name', 'family_id', 'phone', 'blood_group', 'current_location'],
    display: (person) => getFullName(person),
  },

  families: {
    path: '/families/',
    fields: [
      { name: 'family_code', type: 'text', required: true },
      { name: 'head_name', type: 'text', required: true },
      { name: 'village', type: 'text', required: true },
      { name: 'address', type: 'textarea' },
      { name: 'phone', type: 'tel' },
    ],
    columns: ['family_code', 'head_name', 'village', 'phone'],
    display: (family) => family.head_name,
  },

  blood: {
    path: '/blood/',
    fields: [
      personRelation('person_id', true),
      { name: 'blood_group', type: 'select', options: BLOOD_GROUPS, required: true },
      { name: 'is_available', type: 'checkbox', default: true },
      { name: 'last_donation_date', type: 'date', asDateTime: true },
      { name: 'notes', type: 'textarea' },
    ],
    columns: ['person_id', 'blood_group', 'is_available', 'last_donation_date'],
    display: (donor) => donor.person_name ?? '',
  },

  zakat: {
    path: '/zakat/',
    fields: [
      personRelation('person_id'),
      { name: 'record_type', type: 'text', required: true },
      { name: 'amount', type: 'number' },
      { name: 'description', type: 'textarea' },
      { name: 'status', type: 'text' },
    ],
    columns: ['person_id', 'record_type', 'amount', 'status'],
    display: (row) => `${row.person_name ?? ''} · ${row.record_type}`,
  },

  help: {
    path: '/help-requests/',
    fields: [
      personRelation('person_id'),
      { name: 'request_type', type: 'text', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      { name: 'status', type: 'text' },
    ],
    columns: ['person_id', 'request_type', 'title', 'status'],
    display: (row) => row.title,
  },

  education: {
    path: '/education/',
    fields: [
      personRelation('person_id', true),
      { name: 'education_level', type: 'text', required: true },
      { name: 'institution_name', type: 'text' },
      { name: 'subject', type: 'text' },
      { name: 'passing_year', type: 'number' },
      { name: 'result', type: 'text' },
      { name: 'current_status', type: 'text' },
    ],
    columns: ['person_id', 'education_level', 'institution_name', 'passing_year'],
    display: (row) => `${row.person_name ?? ''} · ${row.education_level}`,
  },

  bayan: {
    path: '/bayan/',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'speaker_name', type: 'text' },
      { name: 'mosque_id', type: 'relation', resource: 'mosques', label: (row) => row.name, shows: 'mosque_name' },
      { name: 'session_date', type: 'date', required: true },
      { name: 'media_url', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'is_published', type: 'checkbox', default: true },
    ],
    columns: ['title', 'speaker_name', 'mosque_id', 'session_date', 'is_published'],
    display: (row) => row.title,
  },

  kitab: {
    path: '/kitab/',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'author', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
    columns: ['title', 'author'],
    display: (row) => row.title,
  },

  kitabProgress: {
    path: '/kitab-progress/',
    fields: [
      { name: 'kitab_id', type: 'relation', resource: 'kitab', required: true, label: (row) => row.title, shows: 'kitab_title' },
      { name: 'read_date', type: 'date', required: true },
      { name: 'from_reference', type: 'text' },
      { name: 'to_reference', type: 'text' },
      { name: 'note', type: 'textarea' },
    ],
    columns: ['kitab_id', 'read_date', 'from_reference', 'to_reference'],
    display: (row) => `${row.kitab_title ?? ''} · ${row.read_date}`,
  },

  mosques: {
    path: '/mosques/',
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'address', type: 'text' },
      { name: 'imam_name', type: 'text' },
      { name: 'contact_phone', type: 'tel' },
      { name: 'latitude', type: 'text' },
      { name: 'longitude', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
    columns: ['name', 'imam_name', 'contact_phone', 'address'],
    display: (row) => row.name,
  },

  institutions: {
    path: '/institutions/',
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'institution_type', type: 'text', required: true },
      { name: 'address', type: 'text' },
      { name: 'phone', type: 'tel' },
      { name: 'latitude', type: 'number' },
      { name: 'longitude', type: 'number' },
      { name: 'description', type: 'textarea' },
    ],
    columns: ['name', 'institution_type', 'phone', 'address'],
    display: (row) => row.name,
  },

  places: {
    path: '/places/',
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'place_type', type: 'text', required: true },
      { name: 'address', type: 'text' },
      { name: 'latitude', type: 'text' },
      { name: 'longitude', type: 'text' },
      { name: 'description', type: 'textarea' },
    ],
    columns: ['name', 'place_type', 'address'],
    display: (row) => row.name,
  },

  news: {
    path: '/news/',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'content', type: 'textarea', required: true },
      { name: 'is_published', type: 'checkbox', default: true },
    ],
    columns: ['title', 'is_published'],
    display: (row) => row.title,
  },

  announcements: {
    path: '/announcements/',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'content', type: 'textarea', required: true },
      { name: 'is_active', type: 'checkbox', default: true },
    ],
    columns: ['title', 'is_active'],
    display: (row) => row.title,
  },

  emergency: {
    path: '/emergency/',
    fields: [
      { name: 'emergency_type', type: 'select', options: EMERGENCY_TYPES, required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      { name: 'contact_phone', type: 'tel' },
      { name: 'location', type: 'text' },
      { name: 'status', type: 'text' },
    ],
    columns: ['emergency_type', 'title', 'contact_phone', 'status'],
    display: (row) => row.title,
  },
}

export const USER_ROLES = ['user', 'moderator', 'admin']

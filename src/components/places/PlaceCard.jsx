import { MapPin, MapPinned } from 'lucide-react'
import InfoCard from '../common/InfoCard'
import MapLink from './MapLink'

export default function PlaceCard({ place }) {
  return (
    <InfoCard
      icon={MapPinned}
      tint="bg-orange-50 text-orange-700"
      title={place.name}
      badge={place.place_type}
      description={place.description}
      details={place.address ? [{ icon: MapPin, text: place.address }] : []}
    >
      <MapLink item={place} />
    </InfoCard>
  )
}
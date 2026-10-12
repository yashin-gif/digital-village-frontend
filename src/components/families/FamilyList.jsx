import FamilyCard from './FamilyCard'

export default function FamilyList({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((family) => (
        <FamilyCard key={family.id} family={family} />
      ))}
    </div>
  )
}

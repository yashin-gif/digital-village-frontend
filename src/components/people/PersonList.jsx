import PersonCard from './PersonCard'


export default function PersonList({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  )
}

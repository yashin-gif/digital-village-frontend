import { useState } from 'react'
import { ChevronDown, MapPin, Phone, Users, UsersRound } from 'lucide-react'
import InfoCard from '../common/InfoCard'
import useFetch from '../../hooks/useFetch'
import useLanguage from '../../hooks/useLanguage'
import { getFullName, phoneHref } from '../../utils/helpers'

export default function FamilyCard({ family }) {
  const { t } = useLanguage()
  const text = t.families
  const [open, setOpen] = useState(false)
  const members = useFetch(open ? `/people/?family_id=${family.id}&limit=200` : null, { auth: true })
  const memberList = members.data ?? []
  const place = [family.village, family.address].filter(Boolean).join(', ')
  const details = [
    { icon: Users, text: `${family.member_count ?? 0} ${text.members}` },
    place && { icon: MapPin, text: place },
    family.phone && {
      icon: Phone,
      text: family.phone,
      href: phoneHref(family.phone),
    },
  ].filter(Boolean)

  return (
    <InfoCard
      icon={UsersRound}
      tint="bg-amber-50 text-amber-700"
      title={family.head_name}
      badge={`${text.code}: ${family.family_code}`}
      details={details}
    >
      {(family.member_count ?? 0) > 0 && (
        <>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
          >
            {open ? text.hideMembers : text.showMembers}
            <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <ul className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm">
              {members.loading && <li className="text-slate-500">…</li>}
              {memberList.map((member) => (
                <li key={member.id} className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-slate-800">{getFullName(member)}</span>
                  {member.occupation && <span className="text-slate-500">{member.occupation}</span>}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </InfoCard>
  )
}

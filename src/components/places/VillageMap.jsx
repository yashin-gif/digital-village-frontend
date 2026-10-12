import { ExternalLink } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'
import { VILLAGE_MAP_QUERY } from '../../utils/constants'
import { mapEmbedUrl, mapSearchUrl } from '../../utils/helpers'

export default function VillageMap() {
  const { t } = useLanguage()

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <iframe
        title={t.places.mapTitle}
        src={mapEmbedUrl(VILLAGE_MAP_QUERY)}
        className="h-80 w-full sm:h-[26rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm font-medium text-slate-700">{t.footer.addressText}</p>
        <a
          href={mapSearchUrl(VILLAGE_MAP_QUERY)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
        >
          {t.places.openMap}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
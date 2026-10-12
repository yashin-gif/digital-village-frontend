import PageHeader from '../components/common/PageHeader'
import MissionVision from '../components/about/MissionVision'
import PlatformOffers from '../components/about/PlatformOffers'
import JoinCTA from '../components/home/JoinCTA'
import useLanguage from '../hooks/useLanguage'

export default function About() {
  const { t } = useLanguage()
  const about = t.about

  return (
    <>
      <PageHeader badge={about.badge} title={about.title} text={about.text} />
      <MissionVision />
      <PlatformOffers />
      <div className="pt-16 sm:pt-20">
        <JoinCTA />
      </div>
    </>
  )
}
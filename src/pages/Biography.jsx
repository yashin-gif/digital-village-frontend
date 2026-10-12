import PageHeader from '../components/common/PageHeader'
import BiographyIntro from '../components/biography/BiographyIntro'
import BiographyTopics from '../components/biography/BiographyTopics'
import useLanguage from '../hooks/useLanguage'

export default function Biography() {
  const { t } = useLanguage()
  const bio = t.biography

  return (
    <>
      <PageHeader badge={bio.badge} title={bio.title} text={bio.text} />
      <BiographyIntro />
      <BiographyTopics />
    </>
  )
}
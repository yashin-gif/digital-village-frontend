import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import useLanguage from '../hooks/useLanguage'

export default function ComingSoon() {
  const { t } = useLanguage()

  return (
    <EmptyState
      title={t.common.comingSoon}
      description={t.common.comingSoonText}
    >
      <Button to="/" variant="outline">
        {t.common.backHome}
      </Button>
    </EmptyState>
  )
}
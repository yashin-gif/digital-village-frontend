import Button from '../common/Button'
import useLanguage from '../../hooks/useLanguage'

export default function JoinCTA() {
  const { t } = useLanguage()
  const cta = t.home.cta

  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-linear-to-r from-brand-700 to-brand-500 px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-brand-100">
          {cta.text}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/register" variant="light" size="lg">
            {cta.join}
          </Button>
          <Button to="/about" variant="outlineLight" size="lg">
            {cta.about}
          </Button>
        </div>
      </div>
    </section>
  )
}
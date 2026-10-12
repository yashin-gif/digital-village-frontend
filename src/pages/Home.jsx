import Hero from '../components/home/Hero'
import VillageIntro from '../components/home/VillageIntro'
import QuickServices from '../components/home/QuickServices'
import BloodEmergency from '../components/home/BloodEmergency'
import VillageHighlights from '../components/home/VillageHighlights'
import RecentNews from '../components/home/RecentNews'
import JoinCTA from '../components/home/JoinCTA'
import useFetch from '../hooks/useFetch'
import { truncate } from '../utils/helpers'

export default function Home() {
  // ব্যাকএন্ড নতুন খবর আগে দেয়, তাই প্রথম ৩টাই সর্বশেষ
  const { data } = useFetch('/news/')

  const latestNews = (data ?? []).slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    summary: truncate(item.content, 140),
    created_at: item.created_at,
  }))

  return (
    <>
      <Hero />
      <VillageIntro />
      <QuickServices />
      <BloodEmergency />
      <VillageHighlights />
      <RecentNews items={latestNews} />
      <JoinCTA />
    </>
  )
}
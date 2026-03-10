import Hero from '../components/Hero'
import StatsCounter from '../components/StatsCounter'
import Problem from '../components/Problem'
import Solution from '../components/Solution'
import FuelShowcase from '../components/FuelShowcase'
import WhoWeNeed from '../components/WhoWeNeed'
import QuickStart from '../components/QuickStart'
import GettingStarted from '../components/GettingStarted'
import Roadmap from '../components/Roadmap'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <Problem />
      <Solution />
      <FuelShowcase />
      <WhoWeNeed />
      <QuickStart />
      <GettingStarted />
      <Roadmap />
      <Contact />
    </>
  )
}

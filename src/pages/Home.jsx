import Hero from '../components/Hero'
import Problem from '../components/Problem'
import Solution from '../components/Solution'
import FuelShowcase from '../components/FuelShowcase'
import WhoWeNeed from '../components/WhoWeNeed'
import Roadmap from '../components/Roadmap'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <FuelShowcase />
      <WhoWeNeed />
      <Roadmap />
      <Contact />
    </>
  )
}

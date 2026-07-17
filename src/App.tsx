import './App.css'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { MakiScrollSequence } from './components/MakiScrollSequence'
import { MenuSection } from './components/MenuSection'
import { Offers } from './components/Offers'
import { SignatureSection } from './components/SignatureSection'
import { Hours } from './components/Hours'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <MakiScrollSequence />
        <MenuSection />
        <Offers />
        <SignatureSection />
        <Hours />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default App

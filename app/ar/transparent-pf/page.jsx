import React from 'react'
import CrystalSeries from '@/components/TransparentPF/Crsytal'
import FogSeries from '@/components/TransparentPF/Fogg'
import FrostSeries from '@/components/TransparentPF/Frost'
import GuardSeries from '@/components/TransparentPF/Guard'

const TransparentPff = () => {
  return (
    <div className="flex flex-col">
      
      {/* Crystal Section */}
      <section id="crystal-section" className="scroll-mt-24">
        <CrystalSeries/>
      </section>

      {/* Frost Section */}
      <section id="frost-section" className="scroll-mt-24">
        <FrostSeries/>
      </section>

      {/* Guard Series Section */}
      <section id="guard-series" className="scroll-mt-24">
        <GuardSeries/>
      </section>

      {/* Fogg Section */}
      <section id="fogg-section" className="scroll-mt-24">
        <FogSeries/>
      </section>

    </div>
  )
}

export default TransparentPff
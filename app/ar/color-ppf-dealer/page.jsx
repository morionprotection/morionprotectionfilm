import React from 'react'
import Hero from '@/components/ColorPPF/Hero'
import SolidSeriesSection from '@/components/ColorPPF/SolidSeries'
import SolidSeriesColors from '@/components/ColorPPF/SolidSeriesColors'
import MetallicSeriesSection from '@/components/ColorPPF/MetalicSeries'
import MetalicSeriesColors from '@/components/ColorPPF/MetalicSeriesColors'
import MatteSeriesSection from '@/components/ColorPPF/MatteSeries'
import MatteSeriesColors from '@/components/ColorPPF/MatteSeriesColors'
import LiquidSeriesSection from '@/components/ColorPPF/LiquidSeries'
import LiquidSeriesColors from '@/components/ColorPPF/LiquidSeriesColors'
import ColorShiftSeriesSection from '@/components/ColorPPF/ColorsShiftSeries'
import ColorShiftColors from '@/components/ColorPPF/ColorsShiftColors'
import GetQuoteSection from '@/components/Home/GetQouteSection'

const ColorPPFPage = () => {
  return (
    <main className="bg-black min-h-screen">
      
      {/* The Hero component contains the Sticky Navigation */}
      <Hero/>

      {/* 1. SOLID SERIES SECTION */}
      <div id="solid-section">
        <SolidSeriesSection/>
        <SolidSeriesColors/>
      </div>

      {/* 2. METALLIC SERIES SECTION */}
      <div id="metallic-section">
        <MetallicSeriesSection/>
        <MetalicSeriesColors/>
      </div>

      {/* 3. MATTE SERIES SECTION */}
      <div id="matte-section">
        <MatteSeriesSection/>
        <MatteSeriesColors/>
      </div>

      {/* 4. LIQUID SERIES SECTION */}
      <div id="liquid-section">
        <LiquidSeriesSection/>
        <LiquidSeriesColors/>
      </div>

      {/* 5. COLOR-SHIFT SERIES SECTION */}
      <div id="color-shift-section">
        <ColorShiftSeriesSection/>
        <ColorShiftColors/>
      </div>

      {/* 6. GET QUOTATION SECTION */}
      <div id="get-quote-section">
      <GetQuoteSection/>
      </div>

    </main>
  )
}

export default ColorPPFPage
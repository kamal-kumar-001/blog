import React from 'react'
import BlogList from "./blogList";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const Home = ({ blogs }) => {
    const [sliderRef, instanceRef] = useKeenSlider(
        {
          slideChanged() {
            console.log('slide changed')
          },
        },
        [
          // add plugins here
        ]
      )
  return (
    <div>
        <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide">1</div>
      <div className="keen-slider__slide">2</div>
      <div className="keen-slider__slide">3</div>
    </div>
        <h1 className="mt-2 mb-3 text-2xl font-semibold tracking-tight  lg:leading-snug text-brand-primary lg:text-3xl dark:text-white">
        Recent Blogs
        </h1>
        <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 ">
          <BlogList blogs={blogs} aspect="landscape" />
        </div>
    </div>
  )
}

export default Home
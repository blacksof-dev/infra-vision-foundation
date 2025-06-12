import React from 'react'
import Banner from "../../_components/molecules/Banner";
import image from "@/../public/assets/archive/banner/banner.jpg"
export default function BannerSection() {
    return (
        <Banner
            image={image}
            heading="Archive"
            title="Archive"
            subdesc="Knowledge resources shaping India's infrastructure growth story."
        />
    )
}

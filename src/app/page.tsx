import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import { DEMO_MORE_EXPLORE_DATA_2 } from "@/components/SectionGridMoreExplore/data";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionPromo1 from "@/components/SectionPromo1";
import { SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import { createContentfulClient } from "@/utils/conteentfulClient";

async function getRegions() {
  const client = createContentfulClient();
  
  const regionRes = await client.getEntries({ content_type: "region" });
  const beachRes = await client.getEntries({ content_type: "beach" });

  const regions = regionRes.items.map((item: any) => ({
    id: item.sys.id,
    name: item.fields.name,
    image: item.fields.image?.fields?.file?.url || "",
  }));

  const beachCounts = beachRes.items.reduce((acc: any, beach: any) => {
    const regionId = beach.fields.region?.sys?.id;
    if (regionId) {
      acc[regionId] = (acc[regionId] || 0) + 1;
    }
    return acc;
  }, {});

  return regions.map((region) => ({
    ...region,
    count: beachCounts[region.id] || 0,
  }));
}

async function PageHome2() {
  const regions = await getRegions();
  console.log(regions);

  return (
    <div className="nc-PageHome2 relative overflow-hidden">
        <SectionHero2 />
      {/* <div className="mt-24 lg:mt-32"> */}
        {/* <DiscoverMoreSlider /> */}
      {/* </div> */}
      <div className="container relative space-y-16 my-16 lg:space-y-16 lg:my-16">
        <SectionHowItWork />

        {/* SECTION */}
        {/* <SectionSliderProductCard
          data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
          subHeading="New Sports equipment"
        /> */}

        {/* SECTION */}
        {/* <SectionPromo2 /> */}

        {/* SECTION 3 */}
        {/* <SectionSliderLargeProduct /> */}

        {/* SECTION */}
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore data={regions} />
        </div>

        {/* SECTION */}
        {/* <SectionGridFeatureItems data={SPORT_PRODUCTS} /> */}

        {/* SECTION */}
        {/* <SectionPromo1 /> */}
      </div>
    </div>
  );
}

export default PageHome2;

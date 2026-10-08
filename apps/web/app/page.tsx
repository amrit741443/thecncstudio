import { MaxWidthWrapper } from "@/components/global/max-width-wrapper"
import {
  HeroSection,
  Fqa,
  Testimonial,
  TrustedBySection,
  CtaBannerSection,
  TeamSection,
} from "@/components/landing"

export default function Page() {
  return (
    <div className="">
      <MaxWidthWrapper>
        <HeroSection />
      </MaxWidthWrapper>

      <TrustedBySection />

      <TeamSection />

      <MaxWidthWrapper>
        <Testimonial />
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <Fqa />
        <CtaBannerSection />
      </MaxWidthWrapper>
    </div>
  )
}

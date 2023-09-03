import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Unlock Your Best Self:
            <br className="hidden sm:inline" />
            Your Ultimate Progress Tracking Companion!
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Track your diet, weight, and workouts.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/marketing-hero.svg"}
            alt={"hero"}
            width={600}
            height={600}
          />
        </div>
      </section>
      {/* BeFit Success Story Section */}
      <section className="container mt-8 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold text-primary">
            From Doubt to Determination: The BeFit Success Story
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            In a world where busy schedules, endless distractions, and
            self-doubt often derail our fitness ambitions, there emerged a
            powerful solution – BeFit. This is the story of how one innovative
            app transformed the lives of countless individuals, empowering them
            to take control of their fitness journey.
          </p>
          {/* Add more story content here */}
        </div>
      </section>
    </>
  )
}

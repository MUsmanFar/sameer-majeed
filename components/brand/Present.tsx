import Image from "next/image";
import { getRole, profile } from "@/lib/career";
import { presentCapabilities } from "@/lib/journey";

const flooss = getRole("flooss");

export function Present() {
  return (
    <section id="present" className="stage stage-ivory" aria-labelledby="present-title">
      <div className="photo-plate relative h-[62dvh] lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[54%]">
        <Image
          src={profile.portrait}
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 54vw"
          className="object-cover object-[center_8%] lg:object-[center_10%]"
        />
      </div>

      <div className="relative z-10 ml-auto flex min-h-[100dvh] flex-col justify-end px-[clamp(1.1rem,4.5vw,3.5rem)] pb-14 pt-10 lg:w-[46%]">
        <p className="kicker text-forest/50">Currently</p>
        <p className="mt-5 display-md text-forest">{flooss.company}</p>
        <p className="mt-4 text-xl font-medium">FP&A Manager</p>
        <p className="mt-2 kicker text-forest/45">2025 — Present · Riyadh</p>
        <h2 id="present-title" className="display-lg mt-10 text-forest">
          Planning
          <span className="block">what comes</span>
          <span className="block serif-italic font-normal">next.</span>
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-y-3 text-sm font-medium tracking-wide text-forest/75">
          {presentCapabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section className="stage stage-ink flex items-center px-[clamp(1.1rem,4.5vw,4rem)] py-24" aria-label="Editorial">
      <div className="pointer-events-none absolute inset-y-0 right-[-18%] w-[58%] opacity-[0.22]">
        <Image src={profile.portrait} alt="" fill sizes="58vw" className="object-cover object-[78%_18%]" />
      </div>
      <div className="relative max-w-5xl">
        <p className="display-lg">
          Good finance
          <span className="block">isn’t about</span>
          <span className="block">more numbers.</span>
        </p>
        <p className="display-lg serif-italic mt-12 font-normal text-ivory/78">
          It’s about
          <span className="block">better decisions.</span>
        </p>
      </div>
    </section>
  );
}

export function Numbers() {
  return (
    <section className="stage stage-forest flex flex-col justify-center px-[clamp(1.1rem,4.5vw,4rem)] py-24" aria-label="Milestones">
      <p className="display-xl">
        10+
        <span className="mt-3 block text-[0.22em] tracking-[0.28em]">Years</span>
      </p>
      <ol className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
        {[
          { year: "2014", label: "Start" },
          { year: "2021", label: "Riyadh" },
          { year: "2023", label: "FP&A" },
          { year: "2025", label: "Flooss" },
        ].map((item) => (
          <li key={item.year}>
            <p className="display-md">{item.year}</p>
            <p className="mt-3 kicker text-ivory/45">{item.label}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

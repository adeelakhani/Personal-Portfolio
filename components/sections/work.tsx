const experiences: { company: string; role: string; year: string; description: string; href: string; logo: string; logoBg?: boolean; extras?: { label: string; href: string }[] }[] = [
  {
    company: "Lindy",
    role: "software engineer",
    year: "sep 2026 —",
    description: "building agent infra and keeping things reliable",
    href: "https://www.lindy.ai/",
    logo: "/lindy.png",
  },
  {
    company: "Boardy",
    role: "software engineer",
    year: "jan — apr 2026",
    description: "agentic calendar integration + autonomous scheduling across 10,000+ calendars",
    href: "https://boardy.ai/",
    logo: "/boardy.png",
  },
  {
    company: "Script Runner",
    role: "software engineer",
    year: "may — aug 2025",
    description: "ai-powered prescription delivery for pharmacies across Canada. helped launch the Uber Direct partnership",
    href: "https://scriptrunner.ai/",
    logo: "/script-runner.jpeg",
    extras: [
      { label: "yahoo finance", href: "https://ca.finance.yahoo.com/news/script-runner-uber-direct-partner-140000175.html" },
      { label: "the logic", href: "https://thelogic.co/briefing/prescription-delivery-platform-script-runner-inks-deal-to-use-ubers-route-planning-tech/" },
      { label: "retail insider", href: "https://retail-insider.com/retail-insider/2025/10/script-runner-uber-direct-partner-on-rx-delivery/" },
    ],
  },
  {
    company: "SoftSages Technology",
    role: "software engineer",
    year: "may — aug 2022",
    description: "ml regression for clients + nlp email spam classifier with tf-idf n-grams and logistic regression",
    href: "https://www.softsages.com/",
    logo: "/softsages.png",
    logoBg: true,
  },
];

export function WorkSection() {
  return (
    <section id="work" className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-xl">
        <p className="mb-6 text-[15px] font-medium text-white">work</p>

        <div className="space-y-5">
          {experiences.map((exp) => (
            <div key={exp.company}>
              <p className="text-[15px] text-white/80">
                <span className="text-white/30 text-[13px] mr-2">{exp.year}</span>
                {exp.role},{" "}
                <a href={exp.href} target="_blank" rel="noopener noreferrer"
                   className="group inline-flex items-center gap-1 font-medium text-white underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-[hsl(33,94%,61%)] hover:decoration-[hsl(33,94%,61%)]/50">
                  <span>{exp.company}</span>
                  <img src={exp.logo} alt="" className={`h-3.5 w-3.5 rounded-[3px] object-cover opacity-70 transition-opacity group-hover:opacity-100${exp.logoBg ? " bg-white p-[1px]" : ""}`} />
                </a>
              </p>
              <p className="mt-0.5 text-[14px] text-white/40">
                {exp.description}
              </p>
              {exp.extras && exp.extras.length > 0 && (
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px]">
                  <span className="text-white/30">press:</span>
                  {exp.extras.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                       className="text-white/30 underline decoration-white/15 underline-offset-[3px] transition-colors hover:text-[hsl(33,94%,61%)] hover:decoration-[hsl(33,94%,61%)]/40">
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

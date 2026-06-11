const experiences: { company: string; role: string; description: string; href: string; extra?: { label: string; href: string } }[] = [
  {
    company: "Boardy",
    role: "software engineer",
    description: "agentic calendar integration + autonomous scheduling across 2,000+ calendars",
    href: "https://boardy.ai/",
  },
  {
    company: "Script Runner",
    role: "software engineer",
    description: "ai-powered prescription delivery for pharmacies across Canada. helped launch the Uber Direct partnership",
    href: "https://scriptrunner.ai/",
    extra: { label: "yahoo finance", href: "https://ca.finance.yahoo.com/news/script-runner-uber-direct-partner-140000175.html" },
  },
  {
    company: "SoftSages Technology",
    role: "software engineer",
    description: "ML regression projects + NLP-based email spam classifier",
    href: "https://www.softsages.com/",
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
                {exp.role},{" "}
                <a href={exp.href} target="_blank" rel="noopener noreferrer"
                   className="font-medium text-white underline decoration-white/25 underline-offset-[3px] transition-colors hover:text-[hsl(33,94%,61%)] hover:decoration-[hsl(33,94%,61%)]/50">
                  {exp.company}
                </a>
              </p>
              <p className="mt-0.5 text-[14px] text-white/40">
                {exp.description}
              </p>
              {exp.extra && (
                <p className="mt-1 text-[13px]">
                  <a href={exp.extra.href} target="_blank" rel="noopener noreferrer"
                     className="text-white/30 underline decoration-white/15 underline-offset-[3px] transition-colors hover:text-[hsl(33,94%,61%)] hover:decoration-[hsl(33,94%,61%)]/40">
                    {exp.extra.label}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

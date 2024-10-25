"use client";

export default function Features() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <span className="mb-3 inline-block text-purple-400">
            Advanced Controls
          </span>
          <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
            Built for modern product teams
          </h2>
          <p className="text-lg">
            Open AI reads and understands your files, with nothing more than a
            single line of feedback, so you can go further than the speed of
            thought.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={index}
              className="space-y-2 rounded-3xl p-10 dark:bg-zinc-900/30"
            >
              <svg
                className="h-6 w-6 fill-purple-500"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {feature.icon}
              </svg>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm">{feature.discription}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Project Milestones",
    icon: <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />,
    discription:
      "Add milestones to your projects and track progress across them.",
  },
  {
    title: "Team Views",
    icon: <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />,
    discription:
      "Add milestones to your projects and track progress across them.",
  },
  {
    title: "Advanced Search",
    icon: (
      <path d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z" />
    ),
    discription:
      "Add milestones to your projects and track progress across them.",
  },
  {
    title: "Strategic Initiatives",
    icon: (
      <path d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z" />
    ),
    discription:
      "Add milestones to your projects and track progress across them.",
  },
  {
    title: "Flexible Workflows",
    icon: (
      <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818Z" />
    ),
    discription:
      "Add milestones to your projects and track progress across them.",
  },
  {
    title: "Unified Timeline",
    icon: (
      <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
    ),
    discription:
      "Add milestones to your projects and track progress across them.",
  },
];

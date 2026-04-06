"use client";

export default function ProtocolPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24 flex flex-col items-center">
      <div className="max-w-4xl w-full">

        <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
          X‑RAY Protocol
        </h1>

        <section className="space-y-8 text-gray-300 text-lg leading-relaxed">
          <p>
            Before posts. Before followers. Before reputation.
            There is structure.
          </p>

          <p>
            Beneath every Farcaster identity lies a hidden genetic pattern —
            a radiographic signature formed by presence, behavior, and time.
          </p>

          <p className="text-white font-semibold">
            X‑RAY does not create identity. It reveals it.
          </p>
        </section>

        <hr className="my-16 border-white/10" />

        <section className="space-y-8 text-gray-300 text-lg leading-relaxed">
          <h2 className="text-2xl font-bold text-white">Genesis Phase</h2>

          <p>Only 333 Genesis Keys were released.</p>

          <p>
            Each Genesis Key can activate up to
            <span className="text-green-400 font-semibold"> three DNA Strands </span>
            inside the protocol.
          </p>

          <p>
            The first strand unlocks at mint.<br />
            The second awakens through consistency.<br />
            The third requires true mutation.
          </p>

          <p className="text-white font-semibold">
            Activation is not automatic. It is earned.
          </p>
        </section>

        <hr className="my-16 border-white/10" />

        <section className="space-y-8 text-gray-300 text-lg leading-relaxed">
          <h2 className="text-2xl font-bold text-white">Mutation Engine</h2>

          <p>DNA inside X‑RAY is not static.</p>

          <p>It evolves through consistency, interaction, and presence.</p>

          <p>Rare mutations are not purchased. They are earned.</p>

          <p className="text-white font-semibold">
            The highest forms belong to the most consistent.
          </p>
        </section>

        <hr className="my-16 border-white/10" />

        <section className="space-y-8 text-gray-300 text-lg leading-relaxed">
          <h2 className="text-2xl font-bold text-white">
            The Radiographic Layer
          </h2>

          <p>Farcaster shows what you say.</p>

          <p className="text-white font-semibold">
            X‑RAY shows what you are.
          </p>

          <p>
            The protocol observes silently.
            It records evolution.
            It rewards structure.
          </p>
        </section>

        <hr className="my-16 border-white/10" />

        <section className="text-center mt-20">
          <h2 className="text-2xl font-bold text-white mb-6">
            The Scan Is Live
          </h2>

          <a
            href="https://x-rayv2.vercel.app"
            className="inline-block px-10 py-4 bg-green-500 hover:bg-green-400 rounded-xl font-semibold shadow-lg shadow-green-500/30 transition-all"
          >
            🧬 Initiate Genesis Scan
          </a>
        </section>

      </div>
    </main>
  );
}

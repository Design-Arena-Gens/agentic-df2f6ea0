import type { Prd } from "../lib/types";

export default function PrdView({ prd }: { prd: Prd }) {
  return (
    <article>
      <h2>Product Requirements Document</h2>

      <section>
        <h3>Problem</h3>
        <p>{prd.problem}</p>
      </section>

      <section>
        <h3>Audience</h3>
        <ul>
          {prd.audience.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Goals</h3>
        <ul>
          {prd.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Non-Goals</h3>
        <ul>
          {prd.nonGoals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Key Features</h3>
        <ul>
          {prd.features.map((f) => (
            <li key={f.name}>
              <strong>{f.name}:</strong> {f.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Metrics</h3>
        <ul>
          {prd.metrics.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Risks</h3>
        <ul>
          {prd.risks.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Launch Checklist</h3>
        <ul>
          {prd.launchChecklist.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

<script lang="ts">
  import Section from '$story/Story.Section.svelte'
  import StatBlock from '$story/Story.StatBlock.svelte'
  import ChartBlock from '$story/Story.ChartBlock.svelte'
  import PersonaCard from '$story/Story.PersonaCard.svelte'
  import Donut from '$components/figure/Figure.Donut.svelte'
  import BarChart from "$components/figure/Figure.BarChart.svelte"
  import { PERSONAS } from '$data/personas.js'
  import charts from '$data/charts.json'

  const emre = PERSONAS.find(p => p.id === 'emre')!

  const vertrauen = charts.vertrauenbetreiber
  const percentPublic = (vertrauen.items.find(i => i.answer === '3')?.percent ?? 0)
                  + (vertrauen.items.find(i => i.answer === '4')?.percent ?? 0)
</script>

<svelte:head>
	<title>VERTRAUEN Datenstory Sensoren</title>
</svelte:head>

<Section accent="var(--story-accent-vertrauen)" eyebrow="2 · VERTRAUEN" next="/story/kameras">
  <h2>Wem vertrauen Bürger:innen?</h2>
  <p class="intro">
    Öffentliche oder private Betreiber: macht das einen Unterschied?
    Und unter welchen Bedingungen stimmen Menschen einer Datennutzung zu?
  </p>

  <hr />

  <PersonaCard persona={emre} expanded />

  <StatBlock
    stat={`${percentPublic}%`}
    statFont="var(--font-mono)"
    text="der Befragten vertrauen eher öffentlichen Betreibern bei der datenschutzkonformen Verarbeitung."
    source="Quelle: ÖFIT 2021, f11b"
  />

  <div class="trust-donut-block">
    <ChartBlock title="Vertrauen: öffentlich vs. privat" code="f11b">
    <Donut items={charts.vertrauenbetreiber.items} note={charts.vertrauenbetreiber.note} n={charts.vertrauenbetreiber.n}
           colors={[
             'var(--story-accent-vertrauen)',
             'var(--story-accent-vertrauen-2)',
             'var(--story-accent-vertrauen-3)',
             'var(--story-accent-vertrauen-4)',
             'var(--story-accent-vertrauen-5)'
           ]} />
    </ChartBlock>
  </div>


    <p class="followup-note">
		Einem Großteil der Befragten ist es wichtig, Kontrolle über die Freigabe mich betreffender Daten zu behalten.
	</p>

  <details class="f10-accordion">
    <summary class="f10-summary">
      <span>Haltung zu Datenschutz und Datennutzung (f10)</span>
      <span class="f10-arrow" aria-hidden="true">▾</span>
    </summary>
    <div class="f10-body">
      <BarChart items={charts.datenschutzhaltung.items} note={charts.datenschutzhaltung.note}
        n={charts.datenschutzhaltung.n}
        labelGap={10}
        labelHeight={56}
        color="var(--story-accent-vertrauen)" />
    </div>
  </details>
<!-- 
  <ChartBlock title="Maßnahmen und Akzeptanz" code="f8">
    <BarChart
      items={charts.akzeptanzmaßnahmen.items.map(item => ({
        label: item.label,
        percent: item.distribution.find(d => d.answer === '1')?.percent ?? 0,
        count: item.distribution.find(d => d.answer === '1')?.count ?? 0
      }))}
      n={charts.akzeptanzmaßnahmen.n}
      note="Anteil: Erhöht Zustimmung"
      color="var(--story-accent-vertrauen)"
    />
  </ChartBlock> -->
</Section>

<style>
  h2 {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    font-weight: 900;
    line-height: 1.15;
    margin: 0 0 0.75rem;
  }

  .intro {
    font-size: 0.9375rem;
    color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  hr {
    border: none;
    border-top: 1px solid color-mix(in srgb, var(--story-on-bg) 10%, transparent);
    margin: 1.25rem 0;
  }

  .trust-donut-block {
    margin-top: 0.85rem;
  }

  .f10-accordion {
    border: 1px solid color-mix(in srgb, var(--story-accent-vertrauen) 30%, transparent);
    border-radius: 1.25rem;
    overflow: hidden;
    background: var(--story-surface);
  }

  .f10-summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.9rem 1rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: color-mix(in srgb, var(--story-on-bg) 55%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--story-on-bg) 12%, transparent);
  }

  .f10-summary::-webkit-details-marker {
    display: none;
  }

  .f10-arrow {
    display: inline-block;
    transition: transform 160ms ease;
    color: var(--story-accent-vertrauen);
    font-size: 0.95rem;
    line-height: 1;
  }

  .f10-accordion[open] .f10-arrow {
    transform: rotate(180deg);
  }

  .f10-body {
    padding: 0.55rem 1rem 0.9rem;
  }
</style>
<script lang="ts">
  import { onMount } from 'svelte'
  import Section from '$story/Story.Section.svelte'
  import ChartBlock from '$story/Story.ChartBlock.svelte'
  import PersonaCard from '$story/Story.PersonaCard.svelte'
  import BarChart from "$components/figure/Figure.BarChart.svelte"
  import Donut from "$components/figure/Figure.Donut.svelte"
  import { PERSONAS } from '$data/personas.js'
  import { storyFilter } from '$runes/storyFilter.svelte.js'

  const FILTER_LABELS: Record<string, string> = {
    s1: 'Geschlecht',
    s2neu: 'Alter',
    s6: 'Tätigkeit'
  }

  const FILTER_VALUE_LABELS: Record<string, Record<string, string>> = {
    s1: {
      '1': 'männlich',
      '2': 'weiblich'
    },
    s2neu: {
      '1': '16-19',
      '2': '20-29',
      '3': '30-39',
      '4': '40-49',
      '5': '50-59',
      '6': '60-69',
      '7': '70 und älter'
    },
    s6: {
      '1': 'Berufstätig in Vollzeit',
      '2': 'Berufstätig in Teilzeit',
      '3': 'Auszubildende/r',
      '4': 'Arbeitslos',
      '5': 'Rentner, Pensionär',
      '6': 'Schüler',
      '7': 'Fachschüler',
      '8': 'Student',
      '9': 'Hausfrau/-mann / Elternzeit',
      '10': 'Bundesfreiwilligendienst / FSJ / FÖJ'
    }
  }

  function formatFilter(key: string, value: string) {
    const label = FILTER_LABELS[key] ?? key
    const displayValue = FILTER_VALUE_LABELS[key]?.[value] ?? value
    return `${label}: ${displayValue}`
  }

  function personaPalette(color: string) {
    return [
      color,
      `color-mix(in srgb, ${color} 82%, black 18%)`,
      `color-mix(in srgb, ${color} 66%, black 34%)`,
      `color-mix(in srgb, ${color} 52%, black 48%)`,
    ]
  }

  function respondentText(count: number, name: string) {
    const noun = count === 1 ? 'Person' : 'Personen'
    return `${count} ${noun} aus den Umfragedaten entsprechen den Filtereinstellungen von Persona ${name}.`
  }

  let charts = $derived(storyFilter.charts)
  let n = $derived(storyFilter.n)
  let activeId = $derived(storyFilter.selectedPersonaId)

  const activePersona = $derived(activeId ? PERSONAS.find(p => p.id === activeId) ?? null : null)

  onMount(() => {
    storyFilter.clearFilters()
  })
</script>

<svelte:head>
	<title>PERSONAS Datenstory Sensoren</title>
</svelte:head>

<Section accent="var(--story-accent-perspektive)" eyebrow="4 · PERSONAS ERKUNDEN" next="/story/perspektive" btnLabel="Weiter: Persönliche Filter">
  <h2>Personas erkunden</h2>
  <p class="intro">
    Wähle eine Persona und entdecke, wie unterschiedliche Gruppen
    Sensoren wahrnehmen.
  </p>

  <!-- persona grid -->
  <div class="persona-grid">
    {#each PERSONAS as p (p.id)}
      <PersonaCard
        persona={p}
        selected={activeId === p.id}
        onclick={() => storyFilter.selectPersona(p.id, p.filters)}
      />
    {/each}
  </div>

  {#if activePersona}
    <div class="quote-block" style="border-color:{activePersona.color}">
      <p class="quote-text">{activePersona.summary}</p>
      <p class="quote-sub">{activePersona.subline}</p>
    </div>
  {:else}
    <div class="empty-state">
      <div class="empty-state-arrow">↑</div>
      <p class="empty-state-text">Wähle oben eine Persona, um die gefilterten Daten zu sehen.</p>
    </div>
  {/if}

  {#if activePersona && activeId}
    <div class="filter-info">
      <span class="filter-label">FILTER</span>
      {#each Object.entries(activePersona.filters) as [k, v] (k)}
        <span class="filter-tag">{formatFilter(k, String(v))}</span>
      {/each}
      <span class="filter-n">
        Anzahl der Befragten: {n}
        {#if n < 10}<span class="filter-n-warn"> · Kleines Sample</span>{/if}
      </span>
    </div>

    <div class="respondent-info">
      <span class="filter-label">ANZAHL DER BEFRAGTEN</span>
      <p class="respondent-text">{respondentText(n, activePersona.name)}</p>
    </div>

    <p class="results-label">ERGEBNISSE FÜR {activePersona.name.toUpperCase()}</p>

    <!-- code="f1" -->
    <ChartBlock title="Einstellung zu Sensoren allgemein">
      <BarChart items={charts.einstellungtechnik.items} n={charts.einstellungtechnik.n} color={activePersona.color} />
    </ChartBlock>

    <!-- code="f6A3" -->
    <ChartBlock title="Überwachungsgefühl">
      <Donut items={charts.befindlichkeit.items.find((i: { code: string; distribution: { answer: string; label: string; count: number; percent: number }[] }) => i.code === 'f6A3_1')?.distribution ?? []}
             n={charts.befindlichkeit.n}
             colors={personaPalette(activePersona.color)}
             size={330} />
    </ChartBlock>
<!-- 
    <ChartBlock title="Vertrauen in Betreiber" code="f11b">
      <BarChart items={charts.vertrauenbetreiber.items} n={charts.vertrauenbetreiber.n} color={activePersona.color} />
    </ChartBlock>
 -->
    <!-- code="f20" -->
    <ChartBlock title="Zustimmung Videoüberwachung nach Ort">
      <BarChart
        items={charts.kamerazustimmungort.items}
        n={charts.kamerazustimmungort.n}
        note="Anteil stimme uneingeschränkt zu"
        color={activePersona.color}
      />
    </ChartBlock>
  {/if}
</Section>

<style>
  h2 {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    font-weight: 900;
    line-height: 1.15;
    margin: 0 0 0.75rem;
    color: var(--story-on-bg);
  }

  :global(.section-eyebrow) {
    color: var(--story-on-bg);
  }

  :global(.section-next) {
    background: var(--story-surface);
    color: var(--story-on-bg);
  }

  .intro {
    font-size: 0.9375rem;
    color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .persona-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
    margin-bottom: 1rem;
  }

  .quote-block {
    border-left: 3px solid;
    padding: 0.75rem 1rem;
    background: var(--story-surface);
    border-radius: 0 0.5rem 0.5rem 0;
    margin-bottom: 1rem;
  }

  .quote-text {
    font-size: 1rem;
    font-weight: 600;
    color: var(--story-on-bg);
    margin: 0 0 0.25rem;
    line-height: 1.4;
  }

  .quote-sub {
    font-size: 0.8125rem;
    color: color-mix(in srgb, var(--story-on-bg) 45%, transparent);
    margin: 0;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 13rem;
    padding: 1.5rem;
    border-radius: 1.5rem;
    border: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 20%, transparent);
    background: color-mix(in srgb, var(--story-accent-perspektive) 4%, var(--story-surface));
    text-align: center;
    margin-bottom: 1rem;
  }

  .empty-state-arrow {
    font-size: 4rem;
    line-height: 1;
    color: color-mix(in srgb, var(--story-on-bg) 90%, transparent);
  }

  .empty-state-text {
    max-width: 18rem;
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
  }

  .filter-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .filter-label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: color-mix(in srgb, var(--story-on-bg) 35%, transparent);
  }

  .filter-tag {
    font-size: 0.75rem;
    background: var(--story-surface);
    color: var(--story-accent-perspektive);
    border: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 30%, transparent);
    border-radius: 999px;
    padding: 0.28rem 0.65rem;
  }

  .filter-n-warn {
    color: var(--story-accent-perspektive);
    font-style: italic;
  }

  .respondent-info {
    margin: -0.25rem 0 0.9rem;
  }

  .respondent-text {
    margin: 0.25rem 0 0;
    font-size: 0.8125rem;
    line-height: 1.45;
    color: color-mix(in srgb, var(--story-on-bg) 62%, transparent);
  }

  .results-label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: color-mix(in srgb, var(--story-on-bg) 35%, transparent);
    margin: 0 0 0.75rem;
  }
</style>
<script lang="ts">
    import Section from "$story/Story.Section.svelte";
    import ChartBlock from "$story/Story.ChartBlock.svelte";
    import PersonaCard from "$story/Story.PersonaCard.svelte";
    import Donut from "$components/figure/Figure.Donut.svelte";
    import Stat from "$components/figure/Figure.Stat.svelte";
    import charts from "$data/charts.json";

    import {PERSONAS} from "$data/personas";

    const barbara = PERSONAS.find(persona => persona.id === 'barbara')!
    const percentageSafety = charts.kamerabedeutung.items.find(item => item.answer === '1')?.percent ?? 0;
    const percentageBedenken = charts.kamerabedenken.percent

</script>

<svelte:head>
	<title>KAMERAS Datenstory Sensoren</title>
</svelte:head>

<!-- add structure for first persona setup -->

<Section accent="#9B7FD4" eyebrow="3 · FOKUS KAMERAS" next="/story/personas" btnLabel="Jetzt erkunden">
    <h2>Sicherheit oder Überwachung?</h2>
      <p class="intro">
        Kameras sind die bekanntesten und umstrittensten Sensoren. 
        Was denken Bürger:innen wirklich?
      </p>

      <hr />

    <PersonaCard persona={barbara} expanded />

    <div class="stat-row">
        <div class="stat-mini">
            <div class="stat-mini-number">{percentageBedenken}%</div>
            <div class="stat-mini-label">finden automatische KI-Ortsverfolgung bedenklich</div>
        </div>
    </div>

    <!-- oder title = {charts.sensortyp.title} -->
    <!-- code="f18" -->
    <ChartBlock title="Videoüberwachung: Sicherheit oder Eingriff?">
        <Donut items={charts.kamerabedeutung.items} n={charts.kamerabedeutung.n} colors={['#9B7FD4', '#7a5fb5', '#5e4490', '#432e6b', '#2c1d48']} />
    </ChartBlock>
<!-- 
    <ChartBlock title="Zustimmung nach Ort" code="f20">
        <BarChart items={charts.kamerazustimmungort.items} n={charts.kamerazustimmungort.n} color="#9B7FD4" />
    </ChartBlock> -->
    
     <div class="stat-row">
        <div class="stat-mini">
            <div class="stat-mini-number">{percentageSafety}%</div>
            <div class="stat-mini-label">sehen in mehr Videoüberwachung eher Sicherheit</div>
        </div>
    </div>

    <p class="followup-note">
        Obwohl viele der Befragten Videoüberwachung eher mit Sicherheit verbinden, geht etwa jede fünfte Person Orten mit Videoüberwachung aus dem Weg.
    </p>

    <!-- code="f19/f23" -->
    <ChartBlock title="Verhaltensanpassung">
        <Stat {...charts.verhaltensanpassung} color="#9B7FD4" />
    </ChartBlock>
</Section>

<style>
    h2 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1rem;
    }
    .intro {
        font-size: 1rem;
        color: color-mix(in srgb, var(--story-on-bg) 50%, transparent);
        line-height: 1.5;
        margin-bottom: 1rem;
    }
    hr{
        border: none;
        border-top: 1px solid color-mix(in srgb, var(--story-on-bg) 20%, transparent);
        margin: 1rem 0;
    }
    .stat-row {
        display: grid;
        gap: 0.8rem;
        margin-bottom: 1rem;
    }
    .stat-mini {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        background-color: var(--story-surface);
        border-radius: 0.5rem;
        text-align: center;
    }
    .stat-mini-number {
        font-size: clamp(2rem, 5vw, 2.6rem);
        font-weight: 700;
        line-height: 1;
        color: var(--story-accent-kameras);
        margin-bottom: 0.35rem;
    }

    .stat-mini-label {
        text-align: center;
    }

    .followup-note {
        margin: 0.35rem 0 1rem;
        text-align: left;
        font-size: 0.95rem;
        line-height: 1.55;
        color: color-mix(in srgb, var(--story-on-bg) 72%, transparent);
    }
</style>
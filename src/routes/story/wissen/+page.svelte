<script lang="ts">
    import Section from "$story/Story.Section.svelte";
    import StatBlock from "$story/Story.StatBlock.svelte";
    import ChartBlock from "$story/Story.ChartBlock.svelte";
    import PersonaCard from "$story/Story.PersonaCard.svelte";
    import BarChart from "$components/figure/Figure.BarChart.svelte";
    import charts from "$data/charts.json";

    import {PERSONAS} from "$data/personas";

    const nam = PERSONAS.find(persona => persona.id === 'nam')!
    const f2A1Item = charts.wahrnehmung.items.find(item => item.code === 'f2A1');
    const f2A2Item = charts.wahrnehmung.items.find(item => item.code === 'f2A2');
    const f2A1 = f2A1Item?.percent ?? 0;
    const f2A2 = f2A2Item?.percent ?? 0;
    const f2Answered = f2A1Item && f2A1Item.percent > 0
        ? Math.round((f2A1Item.count * 100) / f2A1Item.percent)
        : 0;
    let showSensorInfo = $state(false);
    let showSurveyInfo = $state(false);

</script>

<svelte:head>
	<title>WISSEN Datenstory Sensoren</title>
</svelte:head>

<!-- add structure for first persona setup -->

<Section accent="#2DD4BF" eyebrow="1 · WISSEN" next="/story/vertrauen">
    <h2>Was wissen Bürger:innen über Sensoren?</h2>
    <button
        class="sensor-info-toggle"
        onclick={() => (showSensorInfo = !showSensorInfo)}
        aria-expanded={showSensorInfo}
        type="button"
    >
        Was sind Sensoren?
    </button>
    {#if showSensorInfo}
        <div class="sensor-info-box">
            Ein Sensor ist ein Gerät, das Signale oder Reize, wie beispielsweise Temperatur, Druck oder Licht, empfängt und darauf reagiert.
        </div>
    {/if}
    <p class="intro">Bevor wir über Meinungen sprechen: Wie viel wissen die Befragten überhaupt über Sensoren in ihrer Stadt?</p>
    <button
        class="survey-info-toggle"
        onclick={() => (showSurveyInfo = !showSurveyInfo)}
        aria-expanded={showSurveyInfo}
        type="button"
    >
        Mehr zur Befragung
    </button>
    {#if showSurveyInfo}
        <div class="survey-info-box">
            Die repräsentative Bevölkerungsbefragung fand im November 2021 statt und richtete etwa 25 Fragen zum Thema Sensoren im öffentlichen Raum per Telefonumfrage an 1004 Befragte.
        </div>
    {/if}

      <hr />

    <PersonaCard persona={nam} expanded />

    <StatBlock
        stat={`${f2A1} %`}
        text={`der Befragten nehmen Sensoren im Alltag wahr, sogar ${f2A2} % können einen konkreten Standort benennen.`}
        source={`Quelle: ÖFIT 2021, f2${f2Answered ? ` · n = ${f2Answered}` : ''}`}
    />

    <!--   <p class="body-text">
        Viele Menschen nehmen Sensoren im Stadtbild wahr. Konkretes Wissen zu Standorten und Funktionen ist jedoch deutlich seltener.
    </p>

    <ChartBlock title="Wahrnehmung von Sensoren im öffentlichen Raum" code="f2">
        <BarChart items={charts.wahrnehmung.items} note = {charts.wahrnehmung.note} n={charts.wahrnehmung.n} color="var(--story-accent-wissen)" />
    </ChartBlock> -->

    <p class="body-text">
        Kameras sind der bekannteste Sensortyp. Weniger bekannt sind Umwelt- und Prozesssensoren, obwohl diese in vielen Kommunen bereits flächendeckend eingesetzt werden.
    </p>

    <ChartBlock title="Bekanntheitsgrad nach Sensortyp" code="f3">
        <BarChart items={charts.sensortypen.items} note = {charts.sensortypen.note} n={charts.sensortypen.n} color="var(--story-accent-wissen)" />
    </ChartBlock>
<!-- 
    <p class="body-text">
        Beim Verständnis der Funktionsweise zeigt sich ein gemischtes Bild: Grundprinzipien sind vielen bekannt, bei technischen Details bestehen Unsicherheiten.
    </p>

    <ChartBlock title="Wissen über Funktionsweise" code="f4">
        <BarChart items={charts.wissensensoren.items} note = {charts.wissensensoren.note} n={charts.wissensensoren.n} color="var(--story-accent-wissen)" />
    </ChartBlock> -->
</Section>

<style>
    h2 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 700;
        line-height: 1.2;
        color: var(--story-on-bg);
        margin-bottom: 0.45rem;
    }
    .sensor-info-toggle {
        align-self: flex-start;
        border: 1px solid var(--story-accent-wissen);
        background: transparent;
        color: var(--story-accent-wissen);
        border-radius: 0.35rem;
        padding: 0.22rem 0.5rem;
        font-size: 0.72rem;
        font-family: var(--font-mono);
        font-weight: 600;
        letter-spacing: 0.02em;
        cursor: pointer;
        margin-bottom: 0.3rem;
    }
    .sensor-info-box {
        border: 1px solid color-mix(in srgb, var(--story-accent-wissen) 40%, transparent);
        background: color-mix(in srgb, var(--story-accent-wissen) 12%, transparent);
        color: color-mix(in srgb, var(--story-on-bg) 85%, transparent);
        border-radius: 0.6rem;
        padding: 0.6rem 0.75rem;
        font-size: 0.82rem;
        line-height: 1.35;
        margin-bottom: 0.55rem;
    }
    .intro {
        font-size: 1rem;
        color: color-mix(in srgb, var(--color-gray-300) 50%, transparent);
        line-height: 1.5;
        margin-bottom: 0.3rem;
    }
    .survey-info-toggle {
        align-self: flex-start;
        border: 1px solid color-mix(in srgb, var(--story-on-bg) 38%, transparent);
        background: transparent;
        color: color-mix(in srgb, var(--story-on-bg) 75%, transparent);
        border-radius: 0.35rem;
        padding: 0.22rem 0.5rem;
        font-size: 0.72rem;
        font-family: var(--font-mono);
        font-weight: 600;
        letter-spacing: 0.02em;
        cursor: pointer;
        margin-bottom: 0.4rem;
    }
    .survey-info-box {
        border: 1px solid color-mix(in srgb, var(--story-on-bg) 25%, transparent);
        background: color-mix(in srgb, var(--story-on-bg) 8%, transparent);
        color: color-mix(in srgb, var(--story-on-bg) 85%, transparent);
        border-radius: 0.6rem;
        padding: 0.6rem 0.75rem;
        font-size: 0.82rem;
        line-height: 1.35;
        margin-bottom: 0.75rem;
    }
    hr{
        border: none;
        border-top: 1px solid color-mix(in srgb, var(--story-on-bg) 20%, transparent);
        margin: 1rem 0;
    }
    .body-text {
        font-size: 1rem;
        color: color-mix(in srgb, var(--story-on-bg) 70%, transparent);
        line-height: 1.5;
        margin-bottom: 1rem;
    }
</style>
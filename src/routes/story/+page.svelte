<script lang="ts">
    import { resolve } from '$app/paths';
    import Section from "$story/Story.Section.svelte";
    import charts from "$data/charts.json";

    const wahrnehmung = charts.wahrnehmung.items.find(item => item.code === 'f2A1')?.percent ?? 0;
    const überwachung = charts.überwachungsgefühl.percent;
    const vertrauenPublic = (charts.vertrauenbetreiber.items.find(i => i.answer === '3')?.percent ?? 0)
                          + (charts.vertrauenbetreiber.items.find(i => i.answer === '4')?.percent ?? 0);
    const infobedürfnis = charts.infobedürfnis.percent;
</script>

<svelte:head>
	<title>INTRO Datenstory Sensoren</title>
</svelte:head>

<Section accent="var(--story-accent-wissen)" next="/story/wissen" btnLabel="Story starten">
    <p class="kicker"> ÖFIT · FRAUNHOFER FOKUS · 2021</p>
    <span class="badge">Datenstory</span>
    <h1>Sensoren im öffentlichen Raum</h1>
    <p class="description">
        Was wissen Bürger:innen über Sensoren in ihrer Stadt?
        Wen stört eine Kamera und wen nicht?
        Eine Datenstory über Wahrnehmung, Vertrauen und Kontrolle.
    </p>

    <!--To Do Was sind Sensoren Annoation zum aufklappen -->


    <!--Statistiken-->

    <div class="stat-grid">
        <div class="stat-card">
            <div class="stat-card-number">{wahrnehmung}%</div>
            <div class="stat-card-label">nehmen Sensoren im Alltag wahr</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-number">{überwachung}%</div>
            <div class="stat-card-label">empfinden ein Überwachungsgefühl</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-number">{vertrauenPublic}%</div>
            <div class="stat-card-label">vertrauen eher öffentlichen Betreibern</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-number">{infobedürfnis}%</div>
            <div class="stat-card-label">wollen mehr Informationen über Sensoren</div>
        </div>
    </div>

    <!--To Do add color vars in css -->

    <div class="content-table">
        <p class="content-table-label">INHALT</p>
            <ul>
                <li>
                    <span class="dot" style="background: var(--story-accent-wissen)"></span>
                    <a href={resolve('/story/wissen')}><strong>Wissen</strong></a>
                    <span class="content-table-description content-table-description--right">Was kennen Bürger:innen?</span>
                </li>
                <li>
                    <span class="dot" style="background: var(--story-accent-vertrauen)"></span>
                    <a href={resolve('/story/vertrauen')}><strong>Vertrauen</strong></a>
                        <span class="content-table-description content-table-description--right">Wem wird vertraut?</span>
                </li>
                <li>
                    <span class="dot" style="background: var(--story-accent-kameras)"></span>
                    <a href={resolve('/story/kameras')}><strong>Fokus Kameras</strong></a>
                        <span class="content-table-description content-table-description--right">Sicherheit oder Kontrolle?</span>
                </li>
                <li>
                    <span class="dot" style="background: var(--story-accent-personas)"></span>
                    <a href={resolve('/story/personas')}><strong>Personas</strong></a>
                        <span class="content-table-description content-table-description--right">Vier Perspektiven erkunden</span>
                </li>
                <li>
                    <span class="dot" style="background: var(--story-accent-perspektive)"></span>
                    <a href={resolve('/story/perspektive')}><strong>Eigene Ansichten</strong></a>
                        <span class="content-table-description content-table-description--right">Eigene Gruppe auswählen</span>
                </li>
            </ul>
    </div>

    <style>
        .kicker {
            font-size: 0.7rem;
            color: var(--color-white);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(255, 255, 255, 0.4);
            margin-bottom: 0 0 0.7rem;
        }

        .badge {
            display: inline-block;
            background-color: var(--story-accent-wissen);
            color: var(--story-on-bg);
            padding: 0.2rem 0.6rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 1rem;
        }

        h1 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--story-on-bg);
            margin-bottom: 0 0 0.5rem;
        }

        .description {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 2rem;
        }
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .stat-card {
            background-color: var(--story-surface);
            padding: 1rem;
            border-radius: 0.75rem;
            text-align: center;
        }
        .stat-card-number {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--story-accent-wissen);
            line-height: 1;
            margin-bottom: 0.35rem;
        }
        .stat-card-label {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.2;   
            
        }
        .content-table {
            background-color: var(--story-surface);
            padding: 1rem;
            border-radius: 0.75rem;
        }
        .content-table-label {
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 0.5rem;
        }
        .content-table ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .content-table li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }

        .content-table a {
            color: var(--color-white);
            text-decoration: none;
        }

        .content-table a:hover {
            text-decoration: underline;
        }
        .dot {
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            display: inline-block;
        }
        .content-table-description {
            font-size: 0.8rem;
            color: var(--story-on-bg);
            margin-left: auto;
            text-align: right;
        }

    </style>

</Section>
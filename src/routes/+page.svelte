<script>
	import Meta from "$components/Meta.svelte";
	import Section from "$story/Story.Section.svelte";
	import copy from "$data/copy.json";
	import "$styles/app.css";

	const title = copy?.meta?.title ?? "Sensoren im öffentlichen Raum";
	const description = copy?.meta?.description ?? "Datenstory zu Sensoren im öffentlichen Raum";
	const url = "";
	const keywords = "";
	/** @type {string[]} */
	const preloadFont = [];
</script>

<Meta {title} {description} {url} {preloadFont} {keywords} />

<Section
	accent="var(--story-accent-wissen)"
	next="/story"
	btnLabel="Story starten"
>
	<span class="badge">Datenstory</span>
	<h1>Willkommen</h1>
	<p class="description">
		Vielen Dank, dass Sie sich die Zeit für die Teilnahme nehmen.
	</p>

	<div class="content-table intro-table">
		<p class="content-table-label">INFO</p>
		<ul>
			<li>
				<span class="content-table-description">Auf den folgenden Seiten haben Sie die Möglichkeit Ergebnisse einer Umfrage zu Sensoren im öffentlichen Raum zu entdecken.</span>
			</li>
			<li>
				<span class="content-table-description">Die Umfrage wurde vom Fraunhofer Kompetenzzentrum öffentliche IT (ÖFIT) durchgeführt.</span>
			</li>
			<li>
				<span class="content-table-description">Diese Anwendung wird im Rahmen einer Masterarbeit an der htw berlin entwickelt und derzeit getestet.</span>
			</li>
			
			<li>
				<span class="content-table-description">Am Ende würde ich mich sehr über Ihre Meinung in einem anonymen Fragebogen freuen. Damit helfen Sie mit die Anwendung zu verbessern.</span>
			</li>
			<br>
			<li>
				<span class="content-table-description outro">Viel Spaß beim Entdecken!</span>
			</li>
		</ul>
	</div>
</Section>

<style>
	:global(.section-content .kicker) {
		font-size: 0.7rem;
		font-family: var(--font-sans);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.4);
		margin: 0 0 0.7rem;
	}

	:global(.section-content .badge) {
		display: inline-block;
		background-color: var(--story-accent-wissen);
		color: var(--story-bg);
		padding: 0.2rem 0.6rem;
		border-radius: 0.25rem;
		font-size: 0.8rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 1rem;
	}

	:global(.section-content h1) {
		font-size: 2rem;
		font-weight: 700;
		color: var(--story-on-bg);
		margin: 0 0 0.5rem;
	}

	:global(.section-content .description) {
		font-size: 1rem;
		line-height: 1.5;
		margin-bottom: 1rem;
	}

	:global(.section-content .content-table) {
		background-color: var(--story-surface);
		padding: 1rem;
		border-radius: 0.75rem;
	}

	:global(.section-content .content-table-label) {
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 0.5rem;
	}

	:global(.section-content .content-table ul) {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	:global(.section-content .content-table li) {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		font-size: 0.9rem;
	}

	:global(.section-content .dot) {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		display: inline-block;
		background: var(--story-accent-wissen);
		margin-top: 0.22rem;
		flex-shrink: 0;
	}

	:global(.section-content .content-table-description) {
		font-size: 0.92rem;
		line-height: 1.45;
		color: var(--story-on-bg);
	}

	:global(.section-content .outro) {
		color: var(--story-accent-wissen);
		font-weight: 700;
	}

	:global(.section-next) {
		font-family: var(--font-sans);
		font-weight: 700;
	}
</style>

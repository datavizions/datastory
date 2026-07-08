<script lang="ts">
	import { resolve } from "$app/paths";
	import { onMount } from "svelte";
	import Section from "$story/Story.Section.svelte";
	import ChartBlock from "$story/Story.ChartBlock.svelte";
	import BarChart from "$components/figure/Figure.BarChart.svelte";
	import Donut from "$components/figure/Figure.Donut.svelte";
	import { storyFilter } from "$runes/storyFilter.svelte.js";

	type FilterOption = { value: string; label: string };
	type FilterGroup = { key: string; label: string; options: FilterOption[] };

	const groups: FilterGroup[] = [
		{
			key: "s1",
			label: "Geschlecht",
			options: [
				{ value: "1", label: "Männlich" },
				{ value: "2", label: "Weiblich" },
				{ value: "3", label: "k.A." },
			],
		},
		{
			key: "s2neu",
			label: "Altersgruppe",
			options: [
				{ value: "1", label: "16-19" },
				{ value: "2", label: "20-29" },
				{ value: "3", label: "30-39" },
				{ value: "4", label: "40-49" },
				{ value: "5", label: "50-59" },
				{ value: "6", label: "60-69" },
				{ value: "7", label: "70+" },
			],
		},
		{
			key: "s6",
			label: "Berufsstatus",
			options: [
				{ value: "1", label: "Vollzeit" },
				{ value: "2", label: "Teilzeit" },
				{ value: "8", label: "Student:in" },
				{ value: "6", label: "Schüler:in" },
				{ value: "5", label: "Rentner:in" },
				{ value: "4", label: "Arbeitslos" },
				{ value: "9", label: "Sonstiges" },
			],
		},
	];

	let charts = $derived(storyFilter.charts);
	let filters = $derived(storyFilter.filters);
	let n = $derived(storyFilter.n);
	let genderNoAnswer = $state(false);
	let showGenderInfo = $state(false);

	const selectedCount = $derived(
		Object.keys(filters).filter((k) => filters[k] != null).length + (genderNoAnswer ? 1 : 0)
	);

	const selectedSettings = $derived(
		groups
			.map((g) => {
				if (g.key === "s1" && genderNoAnswer) {
					return `${g.label}: k.A. (nicht gefiltert)`;
				}
				const val = filters[g.key];
				if (!val) return null;
				const option = g.options.find((o) => o.value === String(val));
				return option ? `${g.label}: ${option.label}` : null;
			})
			.filter(Boolean)
	);

	function toggle(key: string, value: string) {
		if (key === "s1" && value === "3") {
			genderNoAnswer = !genderNoAnswer;
			if (genderNoAnswer && storyFilter.filters.s1 != null) {
				storyFilter.toggleFilter("s1", String(storyFilter.filters.s1));
			}
			return;
		}

		if (key === "s1" && value !== "3") {
			genderNoAnswer = false;
		}

		storyFilter.toggleFilter(key, value);
	}

	function isOptionActive(groupKey: string, optionValue: string) {
		if (groupKey === "s1" && optionValue === "3") {
			return genderNoAnswer;
		}
		return String(filters[groupKey]) === optionValue;
	}

	function resetToFilters() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	onMount(() => {
		storyFilter.clearFilters();
	});
</script>

<svelte:head>
	<title>PERSPEKTIVE Datenstory Sensoren</title>
</svelte:head>

<Section accent="var(--story-accent-perspektive)" eyebrow="5 · EIGENE PERSPEKTIVE">
	<h2>Wie siehst du das?</h2>
	<p class="intro">
		Stelle deine gewünschten Eigenschaften ein und erfahre wie deine Gruppe
		in der Umfrage abschneidet.
	</p>

	<hr />

	<div class="counter">
		<span class="counter-value">{selectedCount}/{groups.length}</span>
		<span>Eigenschaften ausgewählt</span>
	</div>

	{#each groups as group (group.key)}
		<div class="group-block">
			<p class="group-label">{group.label}</p>
			{#if group.key === "s1"}
				<button
					type="button"
					class="gender-info-toggle"
					onclick={() => (showGenderInfo = !showGenderInfo)}
					aria-expanded={showGenderInfo}
				>
					Info zur Erhebung
				</button>
				{#if showGenderInfo}
                    <br>
					<div class="gender-info-box">
						In der ÖFIT-Befragung wurde Geschlecht nur als männlich oder weiblich
						erfasst. Andere Geschlechtsidentitäten wurden in dieser Umfrage nicht
						abgebildet.
					</div>
				{/if}
			{/if}
			<div class="pill-row">
				{#each group.options as option (option.value)}
					<button
						type="button"
						class="pill"
						class:pill-active={isOptionActive(group.key, option.value)}
						onclick={() => toggle(group.key, option.value)}
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>
	{/each}

	{#if selectedCount > 0}
		<div class="settings-box">
			<p class="settings-title">Deine Einstellungen</p>
			<div class="settings-tags">
				{#each selectedSettings as setting (setting)}
					<span class="settings-tag">{setting}</span>
				{/each}
			</div>
		</div>

		{#if n > 0}
			<p class="results-label">ERGEBNISSE FÜR DEINE GRUPPE</p>

			<!-- code="f1" -->
			<ChartBlock title="Einstellung zu Sensoren allgemein">
				<BarChart
					items={charts.einstellungtechnik.items}
					n={charts.einstellungtechnik.n}
					color="var(--story-accent-perspektive)"
				/>
			</ChartBlock>

			<!-- code="f6A3" -->
			<ChartBlock title="Überwachungsgefühl">
				<Donut
					items={charts.befindlichkeit.items.find((i: { code: string; distribution: { answer: string; label: string; count: number; percent: number }[] }) => i.code === 'f6A3_1')?.distribution ?? []}
					n={charts.befindlichkeit.n}
					colors={[
						"var(--story-accent-perspektive)",
						"#b6962a",
						"#7f6a31",
						"#4e4937",
						"#2f312f",
					]}
					size={330}
				/>
			</ChartBlock>
<!-- 
			<ChartBlock title="Vertrauen in Betreiber" code="f11b">
				<BarChart
					items={charts.vertrauenbetreiber.items}
					n={charts.vertrauenbetreiber.n}
					color="var(--story-accent-perspektive)"
				/>
			</ChartBlock> -->

			<!-- code="f20" -->
			<ChartBlock title="Zustimmung Videoüberwachung nach Ort">
				<BarChart
					items={charts.kamerazustimmungort.items}
					n={charts.kamerazustimmungort.n}
					color="var(--story-accent-perspektive)"
				/>
			</ChartBlock>

			<div class="hint-box">
				<p>
					<span class="hint-title">Hinweis:</span>
					Die Visualisierungen zeigen Daten für deine aktuelle Filtergruppe.
				</p>
			</div>
		{:else}
			<div class="empty-state">
				<p>
					<span class="hint-title">Keine passende Gruppe gefunden:</span>
					Für diese Filterkombination gibt es in der Stichprobe keine Schnittmenge.
					Bitte ändere mindestens ein Merkmal.
				</p>
			</div>
		{/if}

		<div class="actions">
			<button type="button" class="action-secondary" onclick={resetToFilters}>Einstellungen ändern</button>
			<a class="action-primary" href={resolve('/story/abschluss')}>Zum Abschluss</a>
		</div>
	{/if}
</Section>

<style>
	h2 {
		font-size: clamp(2.2rem, 8.5vw, 3.8rem);
		font-weight: 800;
		line-height: 1.08;
		margin: 0 0 0.8rem;
	}

	.intro {
		font-size: 1rem;
		color: color-mix(in srgb, var(--story-on-bg) 68%, transparent);
		line-height: 1.5;
		margin-bottom: 0.9rem;
	}

	hr {
		border: none;
		border-top: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 40%, transparent);
		margin: 0.9rem 0 1rem;
	}

	.counter {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0.8rem 1rem;
		border-radius: 1.05rem;
		background: color-mix(in srgb, var(--story-accent-perspektive) 9%, var(--story-surface));
		border: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 30%, transparent);
		margin-bottom: 0.9rem;
		font-family: var(--font-mono);
		color: color-mix(in srgb, var(--story-on-bg) 60%, transparent);
	}

	.counter-value {
		font-size: 2rem;
		font-weight: 800;
		line-height: 1;
		color: var(--story-accent-perspektive);
	}

	.group-block {
		margin-bottom: 1rem;
	}

	.group-label {
		margin: 0 0 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--story-on-bg) 62%, transparent);
	}

	.gender-info-toggle {
		align-self: flex-start;
		border: 1px solid color-mix(in srgb, var(--story-on-bg) 34%, transparent);
		background: transparent;
		color: color-mix(in srgb, var(--story-on-bg) 78%, transparent);
		border-radius: 0.35rem;
		padding: 0.22rem 0.5rem;
		font-size: 0.72rem;
		font-family: var(--font-mono);
		font-weight: 600;
		letter-spacing: 0.02em;
		cursor: pointer;
		margin: 0 0 0.45rem;
	}

	.gender-info-box {
		border: 1px solid color-mix(in srgb, var(--story-on-bg) 25%, transparent);
		background: color-mix(in srgb, var(--story-on-bg) 8%, transparent);
		color: color-mix(in srgb, var(--story-on-bg) 85%, transparent);
		border-radius: 0.6rem;
		padding: 0.6rem 0.75rem;
		font-size: 0.82rem;
		line-height: 1.35;
		margin-bottom: 0.55rem;
	}

	.pill-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.pill {
		appearance: none;
		border: 1px solid color-mix(in srgb, var(--story-on-bg) 14%, transparent);
		border-radius: 1rem;
		padding: 0.4rem 0.85rem;
		background: color-mix(in srgb, var(--story-on-bg) 9%, transparent);
		color: color-mix(in srgb, var(--story-on-bg) 66%, transparent);
		font-size: 0.92rem;
		font-weight: 700;
		line-height: 1.2;
		cursor: pointer;
	}

	.pill-active {
		background: var(--story-accent-perspektive);
		border-color: color-mix(in srgb, var(--story-accent-perspektive) 75%, transparent);
		color: color-mix(in srgb, var(--story-bg) 88%, black 12%);
	}

	.settings-box {
		margin-top: 0.35rem;
		padding: 0.95rem 1rem;
		border-left: 4px solid var(--story-accent-perspektive);
		border-radius: 0 1rem 1rem 0;
		background: color-mix(in srgb, var(--story-accent-perspektive) 7%, var(--story-surface));
		border-top: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 24%, transparent);
		border-right: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 24%, transparent);
		border-bottom: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 24%, transparent);
	}

	.settings-title {
		margin: 0 0 0.65rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--story-accent-perspektive);
	}

	.settings-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.settings-tag {
		padding: 0.35rem 0.65rem;
		border-radius: 0.55rem;
		background: color-mix(in srgb, var(--story-on-bg) 10%, transparent);
		font-size: 0.82rem;
		font-weight: 700;
		color: color-mix(in srgb, var(--story-on-bg) 90%, transparent);
	}

	.results-label {
		margin: 1.1rem 0 0.25rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
	}

	.hint-box {
		padding: 0.95rem 1rem;
		border-radius: 1rem;
		border: 1px solid color-mix(in srgb, var(--story-accent-perspektive) 20%, transparent);
		background: color-mix(in srgb, var(--story-accent-perspektive) 7%, var(--story-surface));
		color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
		line-height: 1.45;
	}

	.hint-box p {
		margin: 0;
	}

	.empty-state {
		padding: 0.95rem 1rem;
		border-radius: 1rem;
		border: 1px solid color-mix(in srgb, #c35b31 35%, transparent);
		background: color-mix(in srgb, #c35b31 10%, var(--story-surface));
		color: color-mix(in srgb, var(--story-on-bg) 70%, transparent);
		line-height: 1.45;
	}

	.empty-state p {
		margin: 0;
	}

	.hint-title {
		color: var(--story-accent-perspektive);
		font-weight: 800;
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-top: 0.35rem;
	}

	.action-secondary,
	.action-primary {
		display: block;
		width: 100%;
		box-sizing: border-box;
		text-align: center;
		padding: 1rem;
		border-radius: 0.95rem;
		font-size: 1rem;
		font-weight: 800;
		text-decoration: none;
	}

	.action-secondary {
		border: 1px solid color-mix(in srgb, var(--story-on-bg) 20%, transparent);
		background: var(--story-surface);
		color: color-mix(in srgb, var(--story-on-bg) 74%, transparent);
	}

	.action-primary {
		border: none;
		background: color-mix(in srgb, var(--story-accent-perspektive) 14%, var(--story-surface));
		color: var(--story-on-bg);
	}
</style>
<!--define what bars should show-->
<!-- setup + vertical setup-->

<script lang="ts">
    import {scaleLinear} from 'd3-scale'

    interface Item {
        label: string;
        percent: number;
        count: number;
        code?: string;
    }

    let {
        items = [],
        title = '',
        note = '',
        color = 'var(--color-primary)',
        n = 0,
        labelGap = 5,
        labelHeight = 38,
    }: {
        items: Item[];
        title?: string;
        note?: string;
        color?: string;
        n?: number;
        labelGap?: number;
        labelHeight?: number;
    } = $props();

    let width = $state(0);

    const barHeight = 20;
    const gap = 6;
    const percentageWidth = 50;
    const margin = {top: 2, right: 8, bottom: 2, left: 2};
    const rowHeight = $derived(barHeight + labelHeight + gap);

    const innerWidth = $derived(Math.max(width - percentageWidth - margin.left - margin.right, 0));
    const visibleItems = $derived(items.filter((item) => item.percent > 0));
    const svgHeight = $derived(visibleItems.length * rowHeight + margin.top + margin.bottom);

    const xScale = $derived(scaleLinear().domain([0, 100]).range([0, innerWidth]).clamp(true));

    const sorted = $derived(
        [...visibleItems]
            .sort((a, b) => b.percent - a.percent)
    );

    function cleanLabel(label: string): string {
        return String(label)
            .replace(/^[-–—]\s*/, '')
            .replace(/^\t+/, '')
            .trim();
    }

</script>

<div class="barchart" bind:clientWidth={width}>
    {#if title}
        <p class="bar-title">{title}</p>
    {/if}
    <svg width={width} height={svgHeight} aria-label={title}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
            {#each sorted as item, i }
             {@const y = i * rowHeight}
             {@const barW = xScale(item.percent)}
                 {@const tone = Math.max(40, 76 - i * 8)}

             <!-- label -->
                <!-- bar -->
                     <rect x={0} y={y} width={innerWidth} height={barHeight} fill="color-mix(in srgb, var(--story-surface, #122030) 72%, white)" rx="5"/>

                <!-- bar filling -->
                     <rect x={0} y={y} width={barW} height={barHeight} fill={`color-mix(in srgb, ${color} ${tone}%, transparent)`} rx="5"/>

                <!-- percentage label -->
                      <text x={innerWidth + 6} y={y + barHeight / 2 + 1} dominant-baseline="middle" class="bar-percentage">{item.percent}%</text>

                <foreignObject x="0" y={y + barHeight + labelGap} width={innerWidth} height={labelHeight}>
                <div class="bar-label">{cleanLabel(item.label)}</div>
                </foreignObject>
            {/each}
        </g>
    </svg>

    {#if note || n}
        <p class="bar-note">
            {#if n}n = {n} (Anzahl der Befragten){note ? ' · ' : ''}{/if}{note}
        </p>
    {/if}
</div>

<!--add styles for the bar chart here for now put later to a style sheet-->
<style>
	:global(:root) {
		--figure-text-color: var(--story-on-bg, var(--color-fg, #111111));
		--figure-muted-color: color-mix(in srgb, var(--story-on-bg, var(--color-fg, #111111)) 65%, transparent);
		--figure-soft-color: color-mix(in srgb, var(--story-on-bg, var(--color-fg, #111111)) 35%, transparent);
	}

    .barchart {
        width: 100%;
        font-family: var(--font-sans);
        font-size: 0.9rem;
    }

    .bar-title {
        font-family: var(--font-sans);
        font-size: 0.82rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        color: var(--figure-muted-color);
    }

    .bar-label {
        font-size: 0.76rem;
        line-height: 1.14;
        padding-top: 0;
        padding-right: 0.7rem;
        overflow: visible;
        white-space: normal;
        word-break: break-word;
        color: var(--figure-muted-color);
    }

    .bar-percentage {
        font-family: var(--font-sans);
        font-size: 0.8rem;
        fill: var(--figure-muted-color);
    }

    .bar-note {
        font-family: var(--font-sans);
        font-size: 0.78rem;
        margin-top: 0.75rem;
        color: var(--figure-soft-color);
        text-align: center;
    }

</style>

                


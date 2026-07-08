<script lang="ts">
    import {arc, pie, type PieArcDatum} from 'd3-shape'

    interface Item {
        answer: string;
        label: string;
        percent: number;
        count: number;
    }

    let {
        items = [],
        title = '',
        note = '',
        n = 0,
        colors = ['var(--color-primary)'],
        size = 320,
        inner = 0.5
        }: {
        items: Item[];
        title?: string;
        note?: string;
        n?: number;
        colors?: string[];
        size?: number;
        inner?: number;
    } = $props();

    let layoutWidth = $state(0);

    const chartSize = $derived(layoutWidth > 0 ? Math.min(size, layoutWidth) : size);

    const r = $derived(chartSize / 2);
    const innerR = $derived(r * inner);
    const labelR = $derived((innerR + r) / 2);
    const outerLabelR = $derived(r + 10);

    const pies = pie<Item>().value((d) => d.count).padAngle(0.01).sort(null);

    const visibleItems = $derived(items.filter(i => i.count > 0));

    const arcs = $derived(arc<PieArcDatum<Item>>().innerRadius(innerR).outerRadius(r).cornerRadius(5)
    );
    const labelArc = $derived(arc<PieArcDatum<Item>>().innerRadius(labelR).outerRadius(labelR));
    const outerLabelArc = $derived(arc<PieArcDatum<Item>>().innerRadius(outerLabelR).outerRadius(outerLabelR));

    const slices = $derived(pies(visibleItems));

</script>

<div class="donut">
    {#if title}
        <p class="donut-title">{title}</p>
    {/if}

    <div class="donut-layout" bind:clientWidth={layoutWidth}>
        <svg width={chartSize} height={chartSize} aria-label={title}>
            <g transform="translate({r}, {r})">
            {#each slices as slice, i (slice.data.answer)}
            <path class="donut-slice" d={arcs(slice)} fill={colors[i % colors.length]} stroke="var(--color-background)" stroke-width="1"></path>
            <title>{slice.data.label}: {slice.data.percent}% ({slice.data.count})</title>
            {@const inside = slice.data.percent >= 6}
            {@const centroid = inside ? labelArc.centroid(slice) : outerLabelArc.centroid(slice)}
            {#if slice.data.percent > 0}
                <text
                    x={inside ? centroid[0] : centroid[0] + (centroid[0] >= 0 ? 6 : -6)}
                    y={centroid[1]}
                    class="donut-slice-label"
                    class:donut-slice-label-outside={!inside}
                    text-anchor={inside ? "middle" : (centroid[0] >= 0 ? "start" : "end")}
                    dominant-baseline="middle"
                >
                    {slice.data.percent}%
                </text>
            {/if}
            {/each}
            </g>
        </svg>  

        <ul class="donut-legend">
            {#each visibleItems as item, i (item.answer)}
            <li class="donut-legend-item">
                <span class="donut-legend-swatch" style="background: {colors[i % colors.length]}"></span>
                <span class="donut-legend-label">{item.label}</span>
                <span class="donut-legend-percent">{item.percent}%</span>
            </li>
            {/each}
        </ul>
    </div>
    
    

    {#if note || n}
        <p class="donut-note">
            {#if n}Anzahl der Befragten: {n}{note ? ' · ' : ''}{/if}{note}
        </p>
    {/if}
</div>

<style>
    :global(:root) {
        --figure-text-color: var(--story-on-bg, var(--color-fg, #111111));
        --figure-muted-color: color-mix(in srgb, var(--story-on-bg, var(--color-fg, #111111)) 70%, transparent);
        --figure-strong-color: color-mix(in srgb, var(--story-on-bg, var(--color-fg, #111111)) 78%, transparent);
        --figure-soft-color: color-mix(in srgb, var(--story-on-bg, var(--color-fg, #111111)) 35%, transparent);
    }

    .donut {
        font-size: 0.8rem;
        line-height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .donut-title {
        font-weight: 600;
        margin-bottom: 0.5em;
    }

    /* legend far away is there another option instead of margin */
    .donut-legend {
       list-style: none;
       padding: 0;
       margin: 0;
       display: flex;
       flex-direction: column;
       gap: 0.6rem;
    }

    .donut-legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9em;
    }

    .donut-legend-label {
        flex:1;
        color: var(--figure-muted-color);
    }

    .donut-legend-percent {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9em;
        font-family: var(--font-mono);
        color: var(--figure-strong-color);
    }

    .donut-legend-swatch {
        display: inline-block;
        width: 1em;
        height: 1em;
        border-radius: 0.25em;
        flex-shrink: 0;
    }

    .donut-layout {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.55rem;
        width: 100%;
        max-width: 32rem;
        margin-inline: auto;
    }

    .donut-layout svg {
        flex-shrink: 0;
        display: block;
        margin-inline: auto;
    }

    .donut-legend {
        width: 100%;
    }

    .donut-slice {
        transition: opacity 180ms ease;
    }

    .donut-slice-label {
        fill: var(--color-white, #ffffff);
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 700;
        paint-order: stroke;
        stroke: rgba(0, 0, 0, 0.2);
        stroke-width: 1px;
        pointer-events: none;
    }

    .donut-slice-label-outside {
        fill: var(--figure-text-color);
        stroke: rgba(255, 255, 255, 0.45);
    }

    .donut-slice:hover {
        opacity: 1;
    }

    .donut-note {
        font-family: var(--font-sans);
        font-size: 0.78rem;
        margin-top: 0.9rem;
        color: var(--figure-soft-color);
        text-align: center;
    }

    @media (min-width: 720px) {
        .donut-layout {
            gap: 0.75rem;
        }
    }

</style>

                


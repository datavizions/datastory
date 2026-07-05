<script lang="ts">
    let {
        stat = '',
        text = '',
        source = '',
        statFont = 'var(--font-sans)',
    }: {
        stat?: string;
        text?: string;
        source?: string;
        statFont?: string;
    } = $props();
    
    const display = $derived(
        typeof stat === 'number' ? `${Math.round(stat)}%` : String(stat))
</script>

<div class="stat-block">
    <div class="stat-block-stat" style={`font-family: ${statFont};`}>{display}</div>
    {#if text}
        <div class="stat-block-text">{text}</div>
    {/if}
    {#if source}
        <div class="stat-block-source">{source}</div>
    {/if}
</div>

<style>
    .stat-block {
        border-left: 4px solid var(--accent);
        padding: 0.5rem 1rem;
        background-color: var(--story-surface);
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .stat-block-stat {
        font-size: 2.5em;
        font-weight: 700;
        line-height: 1;
        color: var(--accent);
        font-variant-numeric: tabular-nums;
    }

    .stat-block-text {
        font-size: 0.9em;
        font-weight: 600;
        line-height: 1.2;
        color: var(--story-on-bg);
        margin-bottom: 0.35rem;
    }

    .stat-block-source {
        font-size: 0.72rem;
        font-family: var(--font-mono);
        color: color-mix(in srgb, var(--story-on-bg) 55%, transparent);
        line-height: 1.2;
        margin: 0;
    }
</style>
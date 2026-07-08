<script lang="ts">
    import type { Snippet } from 'svelte'

    let {
        title = '',
        placeholder = false,
        children
    }: {
        title?: string;
        placeholder?: boolean;
        children?: Snippet; 
    } = $props();
</script>

<div class="chart-block">
    <div class="chart-block-header">
        <span class="chart-block-title">{title}</span>
    </div>
    <div class="chart-block-body">
        {#if children}
            {@render children()}
        {:else if placeholder}
            <div class="chart-block-placeholder">Chart Platzhalten</div>
        {/if}
    </div>
</div>

<style>
    .chart-block {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0;
        color: var(--story-on-bg);
        background-color: var(--story-surface);
        border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
        border-radius: 1.25rem;
        overflow: hidden;
    }

    .chart-block-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 0.8rem 1rem 0.5rem;
        border-bottom: 1px solid color-mix(in srgb, var(--story-on-bg) 12%, transparent);
    }

    .chart-block-title {
        font-family: var(--font-mono);
        font-size: 0.78rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: color-mix(in srgb, var(--story-on-bg) 55%, transparent);
    }

    .chart-block-badge {
        font-size: 0.68rem;
        font-weight: 600;
        background-color: color-mix(in srgb, var(--accent) 22%, transparent);
        color: var(--accent);
        flex-shrink: 0;
        white-space: nowrap;
        padding: 0.28rem 0.6rem;
        border-radius: 0.45rem;
    }

    .chart-block-body {
        padding: 0.55rem 1rem 0.9rem;
    }

    .chart-block-placeholder {
        font-size: 1em;
        font-weight: 400;
        font-family: var(--font-sans);
        padding: 1.5rem 0;
        color: color-mix(in srgb, var(--story-on-bg) 25%, transparent);
    }
</style>
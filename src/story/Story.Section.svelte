<script lang="ts">
    import { base } from '$app/paths'
    import type {Snippet} from 'svelte'

    let {
        accent = '#2DD4BF',
        next = '',
        btnLabel = 'Weiter',
        eyebrow = '',
        children,
    }: {
        accent?: string;
        next?: string;
        btnLabel?: string;
        eyebrow?: string;
        children?: Snippet;
    } = $props();

    const nextHref = $derived(next && next.startsWith('/') ? `${base}${next}` : next)
    
</script>

<div class="section" style="--accent: {accent}">
        {#if eyebrow}
            <p class="section-eyebrow">{eyebrow}</p>
        {/if}
    <div class="section-content">
        {@render children?.()}
    </div>

    {#if next}
    <div class="section-footer"> 
        <a href={nextHref} class="section-next">{btnLabel}</a>
    </div>
    {/if}
</div>

<style>
    .section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem 1rem;
        background: var(--story-bg);
        color: var(--story-on-bg);
    }

    .section-eyebrow {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--accent);
        text-transform: uppercase;
    }

    .section-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .section-footer {
        margin-top: 1rem;
    }

    .section-next {
        display: block;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
        padding: 1rem;
        background: var(--accent);
        color: var(--story-bg);
        text-decoration: none;
        border-radius: 0.75rem;
        font-weight: 700;
        font-size: 1rem;
    }
</style>
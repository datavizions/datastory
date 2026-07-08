
<script lang="ts">

    let {
        percent = 0,
        title = '',
        description = '',
        color = 'var(--color-primary)',
        n = 0,
    }: {
        percent?: number;
        title?: string;
        description?: string;
        color?: string;
        n?: number;
    } = $props();

    const display = $derived(`${Math.round(percent)}%`);

</script>

<div class="statistics" >
    <div class="stat-card-number" style="color: {color}">{display}</div>
    {#if title}
        <div class="stat-card-title">{title}</div>
    {/if}

    {#if description || n}
        <div class="stat-card-note">
            {description}{description && n ? ' · ' : ''}{#if n}Anzahl der Befragten: {n}{/if}
        </div>
    {/if}
</div>

<style>
    .statistics {
       display: flex;
       flex-direction: column;
       gap: 0.2rem;
    }

    .stat-card-title {
        font-size: 0.9em;
        font-weight: 600;
        color: var(--color-gray);
        margin-bottom: 0;
    }

    .stat-card-number {
        font-size: 2.5em;
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
    }

    .stat-card-note {
        font-family: var(--font-sans);
        font-size: 0.78rem;
        margin-top: 0.6em;
        color: var(--figure-soft-color, color-mix(in srgb, var(--story-on-bg, #111) 35%, transparent));
    }

</style>

                


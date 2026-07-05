
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

    {#if description}
         <div class="stat-card-description">
            {description}
        </div>
    {/if}
    {#if n}
        <div class="stat-card-note">
            (n = {n})
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

    .stat-card-description {
        font-size: 0.8em;
        color: var(--color-gray);
    }

    .stat-card-note {
        font-size: 0.7em;
        margin-top: 0.5em;
        color: var(--color-gray);
    }

</style>

                


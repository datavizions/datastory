<script lang="ts">
    /* eslint-disable svelte/no-unused-props */
    type Persona = {
        id: string;
        name: string;
        age: number;
        gender: string;
        job: string;
        tag: string;
        color: string;
        emoji: string;
        narrative: string;
        quote: string;
        quote2: string;
        scene: string;
        subline: string;
        filters: Record<string, string>;
    };

    type Props = {
        persona: Persona;
        selected?: boolean;
        compact?: boolean;
        expanded?: boolean;
        onclick?: (event: MouseEvent) => void;
    };

    let { 
        persona,
        selected = false,
        compact = false,
        expanded = false,
        onclick = () => {},
    }:Props = $props();

</script>

{#if expanded}
<article class="persona-story" style="--p:{persona.color}">
    <div class="persona-story-header">
        <div class="persona-story-avatar">{persona.emoji}</div>
        <div class="persona-story-info">
            <div class="persona-story-name">{persona.name}, {persona.age}</div>
            <div class="persona-story-role">{persona.job} • {persona.tag}</div>
        </div>
        <div class="persona-story-badge">Persona</div>
    </div>

    <div class="persona-story-scroll">
    <div class="persona-story-grid">
        <div class="persona-story-col">
            <p class="persona-story-scene">{persona.scene}</p>
            <p class="persona-story-text">{persona.narrative}</p>
            <span class="persona-story-step">1</span>
        </div>

        <div class="persona-story-col persona-story-col-quote1">
            <p class="persona-story-quote">» {persona.quote}</p>
            <span class="persona-story-step">2</span>
        </div>

        <div class="persona-story-col persona-story-col-quote2">
            <p class="persona-story-quote">… {persona.quote2}</p>
            <span class="persona-story-step">3</span>
        </div>
    </div>
    </div>
</article>
{:else}
<button onclick={onclick} class="persona-card" class:persona-selected={selected} class:persona-compact={compact} style="--p:{persona.color}" >
    <div class="persona-avatar">{persona.emoji}</div>
    <div class="persona-info">
        <div class="persona-card-name">{persona.name}, {persona.age}</div>
        <div class="persona-card-role">{persona.gender} • {persona.job}</div>
        <div class="persona-card-tag">{persona.tag}</div>
    </div>
    {#if !compact}
        <div class="persona-card-badge">Persona</div>
    {/if}
</button>
{/if}

<style>
    .persona-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.85rem;
        padding: 1.15rem 1rem 1rem;
        border-radius: 1.35rem;
        background-color: color-mix(in srgb, var(--p) 5%, var(--story-surface));
        color: var(--story-on-bg);
        border: 1px solid color-mix(in srgb, var(--p) 28%, transparent);
        cursor: pointer;
        text-align: left;
    }

    .persona-selected {
        border-color: var(--p);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--p) 35%, transparent);
    }

    .persona-avatar {
        font-size: 2.65rem;
        width: 5rem;
        height: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;    
        flex-shrink: 0;
        background-color: color-mix(in srgb, var(--p) 20%, transparent);
        border-radius: 50%;
        align-self: center;
    }

    .persona-info {
        flex: 1;
        width: 100%;
    }

    .persona-card-name {
        font-weight: 700;
        font-size: clamp(1.05rem, 2vw, 1.25rem);
        line-height: 1.15;
        color: var(--p);
        margin-bottom: 0.35rem;
    }

    .persona-card-role {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 600;
        color: color-mix(in srgb, var(--story-on-bg) 58%, transparent);
        margin-bottom: 0.7rem;
    }

    .persona-card-tag {
        display: inline-flex;
        align-items: center;
        min-height: 1.85rem;
        padding: 0.18rem 0.7rem;
        border-radius: 0.55rem;
        font-size: 0.72rem;
        font-weight: 700;
        background: color-mix(in srgb, var(--p) 14%, transparent);
        color: var(--p);
        font-family: var(--font-sans);
    }

    .persona-card-badge {
        margin-left: auto;
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        background-color: var(--p);
        color: var(--story-bg);
        font-size: 0.7rem;
        font-weight: 600;
        display: none;
    }

    .persona-compact .persona-info,
    .persona-compact .persona-card-badge {
        display: none;
    }

    .persona-compact {
        padding: 0.55rem;
        min-height: 0;
        border-radius: 999px;
        width: auto;
        gap: 0;
        align-items: center;
    }

    .persona-compact .persona-avatar {
        width: 2.6rem;
        height: 2.6rem;
        font-size: 1.65rem;
    }

    .persona-story {
        border: 1px solid color-mix(in srgb, var(--p) 35%, transparent);
        border-radius: 1.5rem;
        background: color-mix(in srgb, var(--p) 12%, var(--story-surface));
        color: var(--story-on-bg);
        overflow: hidden;
    }

    .persona-story-header {
        display: flex;
        align-items: center;
        gap: 0.9rem;
        padding: 1rem;
        border-bottom: 1px solid color-mix(in srgb, var(--p) 28%, transparent);
    }

    .persona-story-avatar {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        background: color-mix(in srgb, var(--p) 22%, transparent);
        flex-shrink: 0;
    }

    .persona-story-info {
        min-width: 0;
    }

    .persona-story-name {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1;
        color: var(--p);
        margin-bottom: 0.15rem;
    }

    .persona-story-role {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
    }

    .persona-story-badge {
        margin-left: auto;
        padding: 0.35rem 0.7rem;
        border-radius: 0.55rem;
        background: color-mix(in srgb, var(--p) 22%, transparent);
        color: var(--p);
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 700;
    }

    .persona-story-grid {
        display: grid;
        grid-template-columns: 1fr 1.25fr 1fr;
    }

    .persona-story-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .persona-story-col {
        position: relative;
        min-height: 10.5rem;
        padding: 0.9rem 0.9rem 1.6rem;
        border-right: 1px solid color-mix(in srgb, var(--p) 20%, transparent);
    }

    .persona-story-col:last-child {
        border-right: none;
    }

    .persona-story-scene {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: color-mix(in srgb, var(--story-on-bg) 55%, transparent);
        margin: 0 0 0.45rem;
    }

    .persona-story-text {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        line-height: 1.25;
        color: color-mix(in srgb, var(--story-on-bg) 70%, transparent);
        margin: 0;
    }

    .persona-story-col-quote1 .persona-story-quote {
        background: color-mix(in srgb, var(--p) 20%, transparent);
        border: 1px solid color-mix(in srgb, var(--p) 35%, transparent);
        border-radius: 1rem;
        padding: 0.7rem 0.75rem;
        color: color-mix(in srgb, var(--story-on-bg) 92%, transparent);
    }

    .persona-story-col-quote2 .persona-story-quote {
        background: color-mix(in srgb, #7a78af 26%, transparent);
        border: 1px dashed color-mix(in srgb, #9d9ae0 48%, transparent);
        border-radius: 1rem;
        padding: 0.7rem 0.75rem;
        color: color-mix(in srgb, var(--story-on-bg) 65%, transparent);
    }

    .persona-story-quote {
        margin: 0;
        font-size: 0.76rem;
        line-height: 1.25;
        font-weight: 700;
    }

    .persona-story-step {
        position: absolute;
        right: 0.65rem;
        bottom: 0.35rem;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: color-mix(in srgb, var(--story-on-bg) 35%, transparent);
    }

    @media (max-width: 640px) {
        .persona-story-header {
            gap: 0.7rem;
            padding: 0.8rem;
        }

        .persona-story-avatar {
            width: 3rem;
            height: 3rem;
            font-size: 1.6rem;
        }

        .persona-story-name {
            font-size: 1.5rem;
        }

        .persona-story-scroll {
            overflow-x: visible;
        }

        .persona-story-grid {
            min-width: 0;
            grid-template-columns: 1fr;
        }

        .persona-story-col {
            min-height: 0;
            padding: 0.75rem 0.75rem 1.45rem;
            border-right: none;
            border-bottom: 1px solid color-mix(in srgb, var(--p) 20%, transparent);
        }

        .persona-story-col:last-child {
            border-bottom: none;
        }

        .persona-story-quote {
            font-size: 0.74rem;
        }
    }
</style>
<script lang="ts">
  import { resolve } from '$app/paths'
    import Section from '$story/Story.Section.svelte'
</script>

<svelte:head>
	<title>ABSCHLUSS Datenstory Sensoren</title>
</svelte:head>

<Section accent="var(--story-accent-wissen)" eyebrow="ABSCHLUSS">
  <h2>Was bleibt?</h2>

  <div class="summary-card" style="border-color:var(--story-accent-wissen)">
    <p class="summary-card-topic" style="color:var(--story-accent-wissen)">Wissen</p>
    <p class="summary-card-text">
      Sensoren sind vielen nur als Kameras oder Umweltsensoren bekannt.
    </p>
  </div>

  <div class="summary-card" style="border-color:var(--story-accent-vertrauen)">
    <p class="summary-card-topic" style="color:var(--story-accent-vertrauen)">Vertrauen</p>
    <p class="summary-card-text">
      Öffentliche Betreiber bekommen mehr Vertrauen.
      Transparenz und Anonymisierung erhöhen die Akzeptanz deutlich.
    </p>
  </div>

  <div class="summary-card" style="border-color:var(--story-accent-kameras)">
    <p class="summary-card-topic" style="color:var(--story-accent-kameras)">Kameras</p>
    <p class="summary-card-text">
      Die Mehrheit sieht einen Sicherheitsgewinn, doch manche empfinden
      gleichzeitig ein Überwachungsgefühl.
    </p>
  </div>

  <div class="core-message">
    <p class="core-message-quote">
      Bürger:innen wollen nicht weniger Technologie.
      Sie wollen Transparenz, Kontrolle über ihre Datenund Mitsprache.
    </p>
  </div>

  <!-- maybe link to ÖFIT or maybe not because user needs to go to the questionnaire -->
  <div class="source-box">
    <p class="source-box-title">Datenquelle</p>
    <p class="source-box-text">
      ÖFIT 2021: Umfrage zur Wahrnehmung von IT-Sensoren im öffentlichen Raum.
      Fraunhofer FOKUS, Berlin.<br>
      Anzahl der Befragten 1.004 Personen ab 16 Jahren, Deutschland.
      Die Umfrage unterliegt der CC BY 4.0 Lizenz.
    </p>
    <div class="source-tags">
      <span class="source-tag">ÖFIT</span>
    </div>
  </div>

  <div class="source-box">
    <p class="source-box-title">Personas</p>
    <p class="source-box-text">
      Die dargestellten Personas orientieren sich teilweise an den demografischen Merkmalen der Befragten.<br>
      Die drei gewählten Merkmale sind Alter, Geschlecht und Tätigkeit. Alle weiteren Eigenschaften sind rein fiktiv und dienen zur Veranschaulichung der Umfragedaten.
    </p>
    <div class="source-tags">
    <!--  <span class="source-tag">PERSONAS</span>-->
    </div>
  </div>

  <!-- Navigation -->
  <div class="nav-links">
    <a href={resolve('/story/perspektive')} class="nav-link" style="color:var(--story-accent-perspektive);border-color:color-mix(in srgb, var(--story-accent-perspektive) 20%, transparent)">
      Eigene Perspektive erkunden
    </a>
    <a href={resolve('/story/personas')} class="nav-link" style="color:var(--story-accent-wissen);border-color:color-mix(in srgb, var(--story-accent-wissen) 20%, transparent)">
      Personas vergleichen
    </a>
    <a href={resolve('/story')} class="nav-link" style="color:color-mix(in srgb, var(--story-on-bg) 40%, transparent);border-color:color-mix(in srgb, var(--story-on-bg) 10%, transparent)">
      Zum Anfang
    </a>
     <a href="https://datavizions.limesurvey.net/176749?lang=de&newtest=Y" class="nav-link nav-link-questionnaire">
      Weiter zum Fragebogen
    </a>
  </div>
</Section>

<style>
  h2 {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    font-weight: 900;
    line-height: 1.15;
    margin: 0 0 1.25rem;
  }

  .summary-card {
    border-left: 3px solid;
    padding: 0.75rem 1rem;
    background: var(--story-surface);
    border-radius: 0 0.5rem 0.5rem 0;
    margin-bottom: 0.625rem;
  }

  .summary-card-topic {
    font-size: 0.8125rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  .summary-card-text {
    font-size: 0.875rem;
    color: color-mix(in srgb, var(--story-on-bg) 80%, transparent);
    line-height: 1.5;
    margin: 0;
  }

  .core-message {
    background: var(--story-surface);
    border-radius: 0.75rem;
    padding: 1.25rem;
    margin: 1.25rem 0;
  }

  .core-message-quote {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--story-on-bg);
    line-height: 1.5;
    margin: 0 0 0.5rem;
  }

  .source-box {
    background: var(--story-surface);
    border-radius: 0.75rem;
    padding: 1rem;
    margin-bottom: 1.25rem;
  }

  .source-box-title {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--story-on-bg);
    margin: 0 0 0.4rem;
  }

  .source-box-text {
    font-size: 0.8125rem;
	font-family: var(--font-mono);
    color: color-mix(in srgb, var(--story-on-bg) 45%, transparent);
    line-height: 1.6;
    margin: 0 0 0.75rem;
  }

  .source-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .source-tag {
    font-size: 0.75rem;
    font-family: var(--font-mono);
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    background: color-mix(in srgb, var(--story-accent-wissen) 15%, transparent);
    color: var(--story-accent-wissen);
    border: 1px solid color-mix(in srgb, var(--story-accent-wissen) 30%, transparent);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .nav-link {
    display: block;
    text-align: center;
    background: var(--story-surface);
    border: 1px solid;
    font-weight: 700;
    font-size: 0.9375rem;
    padding: 0.875rem;
    border-radius: 0.75rem;
    text-decoration: none;
    transition: opacity 0.15s;
  }

  .nav-link:hover {
    opacity: 0.8;
  }

  .nav-link-questionnaire {
    color: #ffffff;
    border-color: color-mix(in srgb, #ffffff 72%, transparent);
    background: color-mix(in srgb, var(--story-accent-wissen) 24%, var(--story-surface));
    animation: questionnaire-pulse 1.7s ease-in-out infinite;
  }

  @keyframes questionnaire-pulse {
    0%,
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 color-mix(in srgb, #ffffff 32%, transparent);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 0 0 10px color-mix(in srgb, #ffffff 0%, transparent);
    }
  }
</style>

export interface ShowcaseProject {
  slug: string;
  title: string;
  summary: string;
  status: string;
  technology: string[];
  outcome: string;
  screenshot: string;
  screenshotAlt: string;
  problem: string;
  constraints: string[];
  nonGoals: string[];
  architecture: string;
  architectureAlt: string;
  dataEngineering: string;
  modeling: string;
  deployment: string;
  operations: string;
  failureModes: string[];
  limitations: string[];
  nextDecisions: string[];
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: 'regional-parts-demand-forecast',
    title: 'Regional parts demand forecast',
    summary:
      'A synthetic-data case-study design for probabilistic service-parts forecasts across sparse regional series.',
    status: 'Example case study',
    technology: ['Python', 'Polars', 'LightGBM', 'DuckDB'],
    outcome:
      'Illustrative outcome placement: a planner-facing forecast with intervals, baselines and horizon-specific error reporting.',
    screenshot: '/showcase-assets/forecast-interface.svg',
    screenshotAlt:
      'Illustrative forecast interface showing historical demand, an interval forecast and a baseline comparison table',
    problem:
      'Service-parts demand is intermittent, affected by calendar and operating changes, and costly in both stockout and overstock directions. This example shows where a finished case study would connect evaluation choices to that decision.',
    constraints: [
      'Synthetic operational data only',
      'Sparse series with unequal history',
      'Decision horizons from one to eight weeks',
    ],
    nonGoals: [
      'No claim of production deployment',
      'No automatic purchasing decisions',
      'No invented business-impact estimate',
    ],
    architecture: '/showcase-assets/forecast-architecture.svg',
    architectureAlt:
      'Example architecture flowing from synthetic events through quality controls, feature snapshots, backtests and a static planning interface',
    dataEngineering:
      'This example section demonstrates where an actual project would document event contracts, completeness checks, late-arriving records, feature snapshots and lineage between every forecast and its source data.',
    modeling:
      'This example would compare seasonal-naive and moving-average baselines with a candidate global model using rolling-origin evaluation. A completed page would report error by horizon and series volume, interval coverage and bias.',
    deployment:
      'The layout reserves space for an immutable build, automated tests, scheduled materialization and a rollback path. No deployment is claimed for this example.',
    operations:
      'A finished page would state freshness checks, drift thresholds, access controls, compute schedule and measured cost. The preview intentionally contains no made-up figures.',
    failureModes: ['Regime shifts', 'New or retired parts', 'Demand censoring during stockouts'],
    limitations: ['Synthetic data', 'No operator study', 'No production traffic'],
    nextDecisions: [
      'Select interval objective',
      'Define intervention threshold',
      'Run planner review',
    ],
  },
  {
    slug: 'operations-drift-monitor',
    title: 'Operations drift monitor',
    summary:
      'An example monitoring system that separates schema, population and outcome drift for a public mobility dataset.',
    status: 'Example case study',
    technology: ['PySpark', 'Databricks', 'SQL', 'dbt'],
    outcome:
      'Illustrative outcome placement: a traceable drift review that points from a changed measure back to affected data slices.',
    screenshot: '/showcase-assets/drift-interface.svg',
    screenshotAlt:
      'Illustrative monitoring interface with schema, population and outcome drift lanes and review status',
    problem:
      'A single drift score rarely explains whether a source contract changed, the operating population moved or an outcome relationship degraded. This example presents those as separate evidence lanes.',
    constraints: ['Public data only', 'Daily batch availability', 'Backfillable revisions'],
    nonGoals: ['No automated incident closure', 'No personal data', 'No production claim'],
    architecture: '/showcase-assets/drift-architecture.svg',
    architectureAlt:
      'Example monitoring architecture with batch inputs, quality contracts, drift measures, slice analysis and review output',
    dataEngineering:
      'The example reserves room for schema contracts, versioned expectations, late-data reconciliation and a documented distinction between source corrections and genuine distribution change.',
    modeling:
      'A finished case study would compare simple population-stability and rate-change baselines before introducing richer detectors, then review alert precision by operating slice.',
    deployment:
      'The preview indicates scheduled batch checks and review artifacts but does not imply a running deployment.',
    operations:
      'A completed project would document alert ownership, suppression rules, audit history and bounded compute spend.',
    failureModes: [
      'Source revisions mistaken for drift',
      'Small-slice volatility',
      'Alert fatigue',
    ],
    limitations: ['Example content', 'No labeled incident history', 'No live alerting'],
    nextDecisions: ['Define review SLA', 'Choose slice minimums', 'Test suppression policy'],
  },
  {
    slug: 'maintenance-theme-mapper',
    title: 'Maintenance theme mapper',
    summary:
      'A future-state example for clustering and tracing themes in public FAA service-difficulty report text.',
    status: 'Example case study',
    technology: ['Python', 'Sentence transformers', 'DuckDB', 'Astro'],
    outcome:
      'Illustrative outcome placement: an auditable theme view that keeps source reports, model versions and uncertainty visible.',
    screenshot: '/showcase-assets/theme-interface.svg',
    screenshotAlt:
      'Illustrative maintenance theme explorer with a timeline, theme list and linked source-report panel',
    problem:
      'Free-text maintenance reports contain inconsistent vocabulary, sparse context and changing submission patterns. A useful theme system must surface evidence without presenting clusters as definitive diagnoses.',
    constraints: ['Public FAA reports only', 'No safety conclusion', 'Source language preserved'],
    nonGoals: ['No causal attribution', 'No aircraft-level risk score', 'No completed-work claim'],
    architecture: '/showcase-assets/theme-architecture.svg',
    architectureAlt:
      'Example text-analysis architecture from public reports through normalization, embeddings, time-aware themes and a source-linked review interface',
    dataEngineering:
      'The future-state layout shows where the finished project would document source retrieval, immutable raw records, normalization rules, deduplication and reproducible text snapshots.',
    modeling:
      'A completed project would compare keyword and frequency baselines with embedding-based themes, evaluate temporal stability and review false merges and splits with source text in view.',
    deployment:
      'This preview depicts a static review application and versioned data release; neither is represented as complete.',
    operations:
      'The final system would document update cadence, model-version traceability, content-security policy and measured build cost.',
    failureModes: ['Vocabulary drift', 'Merged unrelated themes', 'Changes in reporting volume'],
    limitations: [
      'Public narrative fields only',
      'Incomplete context',
      'No maintenance recommendation',
    ],
    nextDecisions: ['Select baseline taxonomy', 'Define review sampling', 'Publish data statement'],
  },
];

export const showcaseWriting = [
  {
    slug: 'forecast-evaluation-is-a-data-contract',
    title: 'Forecast evaluation is a data contract',
    description:
      'Why cutoff construction, data availability and revision handling belong in the evaluation design.',
    date: '2026-07-18',
    sections: [
      [
        'The cutoff is part of the model',
        'A backtest is credible only when every feature reflects what was knowable at the prediction cutoff. That makes data availability a first-class modeling constraint.',
      ],
      [
        'Revisions need a policy',
        'Operational tables are corrected after the fact. A durable evaluation states whether it reconstructs historical snapshots, accepts revised truth or reports both views.',
      ],
      [
        'Errors need operating context',
        'Aggregate error can hide predictable failures by horizon, series volume or regime. The useful report connects those slices to the decision that consumes the forecast.',
      ],
    ],
  },
  {
    slug: 'anomaly-alerts-need-an-owner',
    title: 'Anomaly alerts need an owner',
    description:
      'Detection quality is only one part of an alerting system; routing, suppression and feedback define the rest.',
    date: '2026-06-29',
    sections: [
      [
        'A score is not a workflow',
        'An alert needs a responsible reviewer, enough source context to make a decision and a documented disposition.',
      ],
      [
        'Suppression is product logic',
        'Cooldown windows, maintenance periods and known source changes should be versioned and observable rather than hidden in ad hoc filters.',
      ],
    ],
  },
  {
    slug: 'make-quality-controls-queryable',
    title: 'Make data-quality controls queryable',
    description:
      'Turning tests into durable evidence about freshness, completeness and contract changes.',
    date: '2026-05-12',
    sections: [
      [
        'Tests should leave evidence',
        'Pass or fail is useful in CI. In operation, teams also need the measure, threshold, affected slice and source version.',
      ],
      [
        'History changes decisions',
        'A queryable quality history distinguishes one-off incidents from recurring source behavior and makes threshold changes reviewable.',
      ],
    ],
  },
];

export const showcaseLab = [
  {
    title: 'Interval calibration explorer',
    status: 'Example app',
    technology: 'TypeScript + Observable Plot',
    description: 'Adjust forecast intervals and inspect empirical coverage across horizons.',
  },
  {
    title: 'Schema drift diff',
    status: 'Example utility',
    technology: 'Python + DuckDB',
    description: 'Compare field-level contracts and sample changes between data releases.',
  },
  {
    title: 'Theme stability map',
    status: 'Example experiment',
    technology: 'Python + WebGL',
    description: 'Inspect how text themes merge, split and move across time windows.',
  },
];

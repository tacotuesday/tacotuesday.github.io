export interface ArchiveProject {
  slug: string;
  title: string;
  year: number;
  label: string;
  dataNote: string;
  summary: string;
  problem: string;
  approach: string[];
  record: string;
  repository: string;
  images: { src: string; alt: string; caption: string }[];
}

export const archiveProjects: ArchiveProject[] = [
  {
    slug: 'building-an-aws-batch-pipeline',
    title: 'Building an AWS batch data pipeline',
    year: 2024,
    label: 'Earlier learning project · synthetic data',
    dataNote:
      'The exercise generated small pseudorandom customer and transaction tables. It does not represent a production system or client work.',
    summary:
      'A hands-on exercise connecting Aurora MySQL, Lambda, Step Functions, S3, Athena and QuickSight through CloudFormation.',
    problem:
      'The goal was to understand the mechanics of provisioning and orchestrating a small batch pipeline, including packaging, IAM permissions and service integration.',
    approach: [
      'Provisioned a small set of AWS resources using CloudFormation.',
      'Used Step Functions to orchestrate a Lambda export from MySQL to an S3 data lake.',
      'Defined Athena tables and connected the output to basic QuickSight sheets.',
      'Worked through dependency packaging and least-privilege IAM configuration issues.',
    ],
    record:
      'The exercise produced working screenshots of the Lambda, state-machine and reporting steps. No scale, reliability, cost or performance measurements were captured, so none are claimed here.',
    repository: 'https://github.com/tacotuesday/aws-batch-etl-demo',
    images: [
      {
        src: '/archive-assets/successful_lambda_test.png',
        alt: 'AWS Lambda console showing a successful test response for the batch pipeline exercise',
        caption: 'Lambda test from the learning exercise.',
      },
      {
        src: '/archive-assets/successful_step_function.png',
        alt: 'AWS Step Functions graph with completed states for the batch pipeline exercise',
        caption: 'Completed state-machine execution.',
      },
      {
        src: '/archive-assets/qs_sheet1.png',
        alt: 'Amazon QuickSight sheet displaying the small synthetic customer dataset',
        caption: 'Basic QuickSight output from synthetic data.',
      },
    ],
  },
  {
    slug: 'building-a-realtime-data-pipeline',
    title: 'Building a streaming pipeline with Kinesis and Redshift',
    year: 2024,
    label: 'Earlier learning project · generated event data',
    dataNote:
      'The Lambda function generated small random events for a service-integration exercise. This was not a production stream.',
    summary:
      'A tutorial-scale pipeline that sent generated events through Kinesis and exposed them in a Redshift materialized view.',
    problem:
      'The exercise explored how a stream, delivery path, generated events and a warehouse representation fit together across AWS services.',
    approach: [
      'Provisioned Kinesis resources and aligned the participating AWS regions.',
      'Generated small JSON events with a Python Lambda and tested the function locally.',
      'Created an external Redshift schema and materialized view over the stream.',
      'Recorded deployment-environment and schema-parsing lessons for later work.',
    ],
    record:
      'The stream and materialized view were demonstrated, but the exercise did not include workload testing, monitoring, QuickSight output or production deployment evidence.',
    repository: 'https://github.com/tacotuesday/aws-streaming-etl-demo',
    images: [
      {
        src: '/archive-assets/successful_lambda.png',
        alt: 'Terminal output from a successful local Lambda test sending generated stream events',
        caption: 'Local Lambda test used during the exercise.',
      },
      {
        src: '/archive-assets/redshift_materialized_view.png',
        alt: 'Redshift query editor displaying generated events in a materialized view',
        caption: 'Generated events visible in Redshift.',
      },
    ],
  },
  {
    slug: 'the-color-of-success',
    title: 'The color of success: an advertising test exercise',
    year: 2024,
    label: 'Earlier learning project · supplied exercise scenario',
    dataNote:
      'The original narrative described a client; that wording was inappropriate for a portfolio exercise and has been removed. No client relationship is claimed.',
    summary:
      'A statistical exercise comparing click-through rates across ad-text colors with multiple-comparison controls.',
    problem:
      'The exercise asked whether any of 30 text colors outperformed a blue reference while accounting for weekday effects and repeated statistical comparisons.',
    approach: [
      'Explored click-through-rate distributions and weekday effects.',
      'Used Q–Q plots and statistical tests to check assumptions.',
      'Compared the blue reference with other colors and applied a Bonferroni correction.',
      'Cross-checked the original t-test conclusion with a chi-square analysis.',
    ],
    record:
      'The original exercise reported ultramarine as the strongest observed color and statistically different from blue under the selected tests. The revamp did not independently rerun or verify that analysis, so it is retained only as an archived learning record.',
    repository: 'https://github.com/tacotuesday/assessing-ad-clicks',
    images: [
      {
        src: '/archive-assets/color_box_plot.png',
        alt: 'Box plots comparing click-through-rate distributions across advertising text colors',
        caption: 'Distribution comparison from the archived notebook.',
      },
      {
        src: '/archive-assets/qq_plots.png',
        alt: 'Grid of quantile plots used to inspect click-through-rate distribution assumptions',
        caption: 'Distribution diagnostics from the exercise.',
      },
      {
        src: '/archive-assets/chi-square-residuals.png',
        alt: 'Chi-square residual chart comparing observed advertising click outcomes by color',
        caption: 'Chi-square diagnostic from the archived analysis.',
      },
    ],
  },
  {
    slug: 'unlocking-customer-value',
    title: 'Customer segmentation for a fictional outdoor retailer',
    year: 2024,
    label: 'Earlier learning project · fictional company',
    dataNote:
      'Summit Outfitters is explicitly fictional. The exercise uses a portfolio dataset and does not describe a real retailer or a deployed marketing program.',
    summary:
      'A customer-analysis exercise exploring feature engineering, clustering alternatives and segment descriptions.',
    problem:
      'The exercise asked how a fictional retailer might identify high-value customers and examine retention, cross-sell and up-sell hypotheses.',
    approach: [
      'Cleaned the customer data and derived spending and engagement features.',
      'Compared DBSCAN, agglomerative clustering and Gaussian mixture models.',
      'Visualized selected segments across total spend, income, tenure and purchase frequency.',
      'Converted clusters into hypothetical marketing ideas rather than deployment claims.',
    ],
    record:
      'The notebook favored a Gaussian mixture model for the supplied dataset and produced exploratory segment descriptions. The work did not measure incremental business impact or deploy a model.',
    repository: 'https://github.com/tacotuesday/most-valuable-customers',
    images: [
      {
        src: '/archive-assets/scaled_df_pairplot.png',
        alt: 'Pair plot of scaled customer features used during exploratory segmentation analysis',
        caption: 'Exploratory relationships in the portfolio dataset.',
      },
      {
        src: '/archive-assets/cluster_quality_comparison.png',
        alt: 'Comparison chart for clustering approaches evaluated in the customer exercise',
        caption: 'Cluster-method comparison from the notebook.',
      },
      {
        src: '/archive-assets/gmm_clustering.png',
        alt: 'Scatter plot of customer clusters by total spend and annual income',
        caption: 'Gaussian mixture model segments in the exercise data.',
      },
    ],
  },
];

export const getArchiveProject = (slug: string) =>
  archiveProjects.find((project) => project.slug === slug);

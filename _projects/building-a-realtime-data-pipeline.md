---
title: "Building a Real-Time Data Pipeline with AWS Kinesis and Redshift: Lessons Learned"
description: I built a streaming data pipeline using AWS Kinesis and Redshift in this project. This was part of a series of projects to enhance my skills in creating robust data pipelines for analytics and reporting. Although this was my first experience with AWS Kinesis, I successfully created a data streaming pipeline and gained valuable insights into advanced deployment and data transformation techniques.
date: 2024-07-04 15:01:35 +0300
label: "streaming pipelines"
image: '/images/old_pipelines.jpg'
page_cover:
---
 ## The Problem

After [building a batch pipeline](https://tacotuesday.github.io/projects/building-an-aws-batch-pipeline), I wanted to try a new approach: building a streaming data pipeline using AWS Kinesis and Redshift. This project aimed to create a data pipeline that connects server event streams with a data warehouse solution (Amazon Redshift) and transform the data for analytics dashboard creation. The data sources included S3, Kinesis, Python (through Lambda), and Redshift, with data stored in various formats such as JSON.

## Investigation

I tackled this project by breaking it down into several milestones:

### Milestone 1: Create an Amazon Kinesis Data Stream

I created the S3 bucket using CloudFormation templates developed in a previous project. I then deployed a Kinesis stack using a CloudFormation template. This straightforward step provided a solid foundation for the rest of the project.

**Key Learnings**:

- Managing ring deployment environments (e.g., `staging` vs `prd`) in CloudFormation stacks.
- It is crucial to align AWS regions for resource compatibility.

### Milestone 2: Create an Amazon Kinesis Delivery Stream

In this milestone, I developed a Python script for a Lambda function to generate random events and send them to the Kinesis stream. The Lambda function generated three pieces of data for each event: the event time, the event name, and the user ID. Testing the Lambda function locally using `python-lambda-local` was a significant learning experience.

**Key Learnings**:

- Generating and sending random events using Lambda.
- Testing Lambda functions locally with `python-lambda-local`.
- Handling JSON data within Lambda functions.

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/successful_lambda.png" loading="lazy" alt="Project">
  </div>
  <em>Testing the Lambda function locally.</em>
</div>

### Milestone 3: Provision an Amazon Redshift Cluster

Next, I created a Redshift cluster using the AWS web client and used the Redshift Query Editor to create an external schema for my Kinesis data. I ran the Lambda function to generate data and stream it to the Redshift cluster. Finally, I made a materialized view of the data in Redshift for further analysis in QuickSight.

**Key Learnings**:

- Creating external schemas and materialized views in Redshift.
- Parsing JSON strings to extract and analyze data.
- Importance of region alignment in AWS resource management.

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/redshift_materialized_view.png" loading="lazy" alt="Project">
  </div>
  <em>Redshift materialized view created!</em>
</div>

## Results

This project significantly enhanced my understanding of AWS Kinesis, Lambda, and Redshift and reinforced the importance of precise resource management and region alignment. While I did not create QuickSight visualizations for this project, I am confident in extending this pipeline for more complex data processing and analysis tasks in the future.

## Lessons Learned

- **Resource Management**: Managing ring deployment environments and aligning AWS regions are crucial for compatibility.
- **Data Handling**: Generating, sending, and handling JSON data with Lambda functions is essential for seamless data streaming.
- **Schema Creation**: Creating external schemas and materialized views in Redshift is vital for organizing and analyzing streaming data.

## Conclusion

This project provided valuable insights into building a streaming data pipeline with AWS Kinesis and Redshift. Data engineers can create robust pipelines for real-time analytics and reporting by understanding and applying these techniques.

For those interested in the technical details, the code for this project is available on my GitHub repository [here](https://github.com/tacotuesday/aws-streaming-etl-demo).

---

## About the Author

I conducted this analysis independently as part of my data science portfolio. Let's connect if you find this analysis interesting and want to discuss data science in retail or other industries! You can find me on LinkedIn at [https://www.linkedin.com/in/graftoncook](https://www.linkedin.com/in/graftoncook). Let's explore how data can drive your business forward!

---
layouts: post
title: "Building My First AWS Batch Data Pipeline: A Hands-On Journey with CloudFormation, Step Functions, and More"
description: I built my first batch pipeline using AWS, diving into CloudFormation, Step Functions, Lambda, S3, Aurora MySQL, Athena, and QuickSight. This project was a hands-on journey through AWS's ecosystem, from provisioning resources to creating batch processes and visualizing data. It was an eye-opening experience that laid the groundwork for future, more complex data projects.
date: 2024-02-08 15:01:35 +0300
image: '/images/nasa-unsplash.jpg'
tags: [workflow]
---

This was my first time building an AWS pipeline, and I focused on learning the fundamentals of setting up and managing a data pipeline. While the project was relatively simple, it provided invaluable hands-on experience with AWS CloudFormation, Aurora MySQL, Step Functions, Lambda, S3, Athena, and QuickSight. If you'd like to see the code, [check it out here](https://github.com/tacotuesday/aws-batch-etl-demo)!

### Provisioning Resources for the Pipeline using CloudFormation

To begin, I used infrastructure as code (IaC) in the form of AWS CloudFormation templates to create the necessary resources for the pipeline. This involved:

1. Provisioning a data lake S3 bucket.
2. Creating an Aurora MySQL instance.
3. Deploying a Step Function.

I concentrated on deploying these resources as a stack using CloudFormation, prioritizing getting the S3 bucket operational over optimizing for future scalability. This approach was crucial for grasping the basics of CloudFormation and IaC.

**Key Learnings**:

- Understanding how to orchestrate various AWS components like S3 buckets, Aurora MySQL, and Step Functions.
- Specifying details like `EngineVersion` is vital to avoid deployment issues.
- The critical role of step-by-step tutorials and documentation in working with complex systems like AWS.
- The value of IaC in effectively managing resources, emphasized through hands-on experience with AWS CloudFormation templates.

### Creating a Pipeline Connecting AWS MySQL with an S3 Data Lake

Next, I created a batch processing pipeline using a Step Function to orchestrate a Lambda function. The Lambda function exported data from the MySQL database to the S3 data lake. I updated the State Machine to an `ETL-StateMachine`, which executed a Python script to create two tables in MySQL with arbitrary data and then transferred the data to the S3 data lake bucket.

The script generated pseudorandom customer and transaction data into two tables: `users` and `transactions`, with a shared primary key `userid`. Although the data was minimal, it effectively demonstrated the process of creating and ETL-ing tables in RDS to S3.

**Key Learnings**:

- The challenge of packaging Python scripts for deployment, specifically organizing the directory to correctly reference the handler and dependencies.
- Simplifying the Python script was straightforward, but managing dependencies required careful attention.
- The importance of testing the Lambda function locally before deployment to identify and fix issues early.

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/successful_lambda_test.png" loading="lazy" alt="Project">
  </div>
  <em>Lambda function successfully deployed!</em>
</div>

### Adding Amazon Athena Tables and a QuickSight Report to Finish the Pipeline

In the final milestone, I defined Athena tables to provide a schema for the S3 data and connected them to QuickSight for visualization. Although the data was pseudorandom and insights were limited, this step significantly boosted my confidence in creating more significant data ingestion and transformation pipelines. The hands-on experience was truly invaluable.

**Key Learnings**:

- It is necessary to define IAM role permissions on a granular basis to ensure seamless deployment.
- The importance of integrating necessary IAM permissions into IaC, adhering to the principle of least privilege.
- By this stage, I had significantly reduced errors and could quickly identify and fix issues related to IAM permissions.

[Insert a screenshot of Step Function successfully running here] 
[Insert a screenshot of QuickSight visualization 1 here]
[Insert a screenshot of QuickSight visualization 2 here]

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/successful_step_function.png" loading="lazy" alt="Project">
    <img src="/images/qs_sheet1.png" loading="lazy" alt="Project">
    <img src="/images/qs_sheet2.png" loading="lazy" alt="Project">
  </div>
  <em>Successful step function and some very basic QuickSight visualizations</em>
</div>

### Reflection and Future Goals

This project taught me the fundamentals of setting up a data pipeline with AWS and the critical role of proper architecture and permissions management. The learning process involved deployment via IaC, managing permissions with IAM, and deploying and orchestrating Lambda functions using Step Functions, effectively creating a rudimentary batch-processing ETL pipeline. Due to the learning curve, I didn't delve deeply into best practices for pipeline design. Still, I am eager to develop deep expertise in this area by deploying progressively larger-scale pipelines to ingest higher volumes of data with more variety and velocity.

Moving forward, I aim to:
- Define more detailed architectural plans before building future pipelines.
- Explore event-driven architectures and more complex data processing scenarios.
- Enhance my understanding of IAM roles and permissions to streamline future deployments.
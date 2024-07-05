---
title: "Building a Real-Time Data Pipeline with AWS Kinesis and Redshift: Lessons Learned"
description: I built a real-time data pipeline using AWS Kinesis and Redshift, diving into CloudFormation, Lambda, S3, and Redshift. This hands-on project connected server event streams to a data warehouse, transforming data for analytics. It was an insightful journey that set the stage for advanced data streaming and analysis tasks.
date: 2024-07-04 15:01:35 +0300
label: Wireframes
image: '/images/project-1.jpg'
page_cover:
---
After [building a batch pipeline](https://tacotuesday.github.io/projects/building-an-aws-batch-pipeline), I wanted to try a new approach: building a streaming data pipeline using AWS Kinesis and Redshift. This was part of a series of projects designed to enhance my skills in creating robust data pipelines for analytics and reporting. Although this was my first experience with AWS Kinesis, I successfully created a data streaming pipeline and gained valuable insights into advanced deployment and data transformation techniques.

#### Project Overview

The goal of this project was to create a data pipeline that connects server event streams with a data warehouse solution (Amazon Redshift) and transform the data for analytics dashboard creation. The data sources included S3, Kinesis, Python (through Lambda), and Redshift, with data stored in various formats such as JSON.

#### Creating an Amazon Kinesis Data Stream

I started by creating the S3 bucket using CloudFormation templates developed in a previous project. I then deployed a Kinesis stack using a CloudFormation template. This step was straightforward and provided a solid foundation for the rest of the project.

**Key Learnings**:

- Managing ring deployment environments (e.g., `staging` vs `prd`) in CloudFormation stacks.
- Importance of aligning AWS regions for resource compatibility.

#### Creating an Amazon Kinesis Delivery Stream

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

#### Provisioning an Amazon Redshift Cluster

Next, I created a Redshift cluster using the AWS web client and used the Redshift Query Editor to create an external schema for my Kinesis data. I ran the Lambda function to generate data and stream it to the Redshift cluster. Finally, I created a materialized view of the data in Redshift for further analysis in QuickSight.

**Key Learnings**:

- Creating external schemas and materialized views in Redshift.
- Parsing JSON strings to extract and analyze data.
- Importance of region alignment in AWS resource management.

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/redshift_materialized_view.png" loading="lazy" alt="Project">
  </div>
  <em>Redshift materialized view created! </em>
</div>

#### Reflection and Future Goals

This project significantly enhanced my understanding of AWS Kinesis, Lambda, and Redshift, and reinforced the importance of precise resource management and region alignment. While I did not create QuickSight visualizations for this project, I am confident in my ability to extend this pipeline for more complex data processing and analysis tasks in the future.
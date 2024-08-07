---
title: "The Color of Success: Optimizing Ad Click-Through Rates"
description: In the world of digital advertising, every detail matters. Today, I'm diving into a fascinating case study that explores how something as simple as text color can significantly impact the success of online advertisements. Join me as I uncover insights that could revolutionize your advertising strategy.
date: 2024-07-05
label: "multivariate testing"
image: '/images/color_box_plot.png'
---
## The Problem

My client, a company running online advertisements, asked me: Is blue the best color for their ad text? They experimented to find out, randomly assigning 30 different text colors to 3000 ads each weekday for a month. My task was to analyze this data and determine which colors, if any, performed significantly better than blue.

## Investigation

I tackled this challenge using a data-driven approach, employing various statistical techniques to ensure robust and reliable results. Here's a glimpse into my process:

1. **Data Exploration and Cleaning**: I examined the dataset, checking for inconsistencies or missing values. I then calculated the average click-through rate for each color.
2. **Statistical Analysis**: To determine if the differences in click-through rates were statistically significant, I employed several statistical tests:
   - Shapiro-Wilk test for normality
   - Levene's test for equality of variances
   - Two-sample t-tests
   - Chi-square test

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/qq_plots.png" loading="lazy" alt="Project">
  </div>
  <em>Q-Q plots for top colors</em>
</div>

## Solution

My analysis revealed some surprising results:

1. **Blue is not the champion**: Contrary to the initial assumption, blue did not have the highest click-through rate.
2. **Ultramarine takes the crown**: Ultramarine emerged as the color with the highest click-through rate, followed by Sapphire, Aquamarine, and Teal.
3. **Statistically significant difference**: The difference in click-through rates between Ultramarine and Blue was statistically significant, even after applying the Bonferroni correction for multiple comparisons.


## Results

Blue does not have the highest click-through rate. The colors with higher click-through rates are Ultramarine, Sapphire, Aquamarine, and Teal. Practically and statistically, ultramarine has the highest click-through rate: not only against blue, but also against aquamarine, its closest competitor. Thus **the stakeholder should consider using ultramarine as the primary color for their ads if they want to maximize click-through rates and are constrained to only one color.** 

It is worth noting that the choice of analysis may have affected the statistical significance. For example, using a non-parametric test like permutation or Kruskal-Wallis against the entire dataset may have yielded different results with respect to statistical significance. It is important to remember that **ultramarine was also the color with the highest practical click-through rate by a significant margin in the dataset**, which is most likely reason enough to change to that color considering the low switching costs in this specific scenario. 

In situations like this, it is helpful to have an alternative approach to validate the results. I confirmed the t-test results by using a Bonferroni-corrected chi-square test, which showed that the color of the ad text significantly influenced the click-through rate.

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/chi-square-residuals.png" loading="lazy" alt="Project">
  </div>
  <em>Standardized Chi-square residuals</em>
</div>

## Lessons Learned

This case study offers several key takeaways:

1. **Assumptions can be misleading**: Initial assumptions about color preferences were proven wrong through data analysis.
2. **Importance of statistical rigor**: Using robust statistical methods is crucial to derive meaningful insights.
3. **Continuous testing is vital**: Regularly testing and monitoring ad performance can lead to significant improvements.


## Actionable Insights

Based on my findings, I recommend the following actions:

1. **Switch to Ultramarine**: To increase click-through rates, consider changing the ad text color to Ultramarine.
2. **Test with similar colors**: Experiment with other blue-based colors like Sapphire, Aquamarine, and Teal, which also showed promising results.
3. **Continuous monitoring**: Implement a system for monitoring ad performance continuously to detect shifts in color preferences over time.

## Conclusion

This case study demonstrates the power of data-driven decision-making in advertising. By questioning assumptions and rigorously analyzing data, I uncovered insights that could lead to significant improvements in ad performance. Remember, even the most minor details can make a big difference in digital advertising!

As I continue to explore the intricate world of digital advertising, I'm excited about the possibilities of data analysis. Stay tuned for more insights as I delve deeper into optimizing online advertising strategies!

---

## About the Author

I'm a data scientist passionate about uncovering insights that drive business decisions. Let's connect if you find this analysis interesting and want to discuss data science in advertising or other industries! You can find me on LinkedIn [here](https://www.linkedin.com/in/graftoncook). Let's explore how data can drive your business forward!

Check out my GitHub repository [here](https://github.com/tacotuesday/assessing-ad-clicks) to see the code used for this analysis.
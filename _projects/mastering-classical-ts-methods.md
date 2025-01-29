---
title: "Mastering Classical Time Series Methods for Real-World Forecasting Challenges"
description: While machine learning and deep learning methods are increasingly popular for time series, classical methods remain valuable. Let's look at a structured approach to analyzing time series using classical methods like moving average, ARIMA, and SARIMA. This project provides a foundation for mastering time series forecasting and understanding the nuances of classical methods.
date: 2025-01-26 09:52:00 +0300
label: "time series", "forecasting", "ARIMA", "SARIMA", "moving average"
image: '/images/old_pipelines.jpg'
page_cover:
---

## Introduction

While machine learning and deep learning methods are increasingly popular for time series, classical methods remain valuable for many forecasting tasks. The underlying principles and vocabulary of classical statistical methods are essential to understand to effectively implement more complex methods.

In this section of a larger project exploring different forecasting implementations, we'll explore a structured approach to analyzing time series using classical methods. We will discuss:

- Stationarity: what it is, why it's important and how to test for it
- Basic autoregressive (`AR(p)`) and and moving average (`MA(q)`) implementations
- ARIMA
- SARIMA
- `auto_arima`

By mastering these techniques, you'll gain a solid foundation in time series forecasting and understand the nuances of classical methods.

The autoregressive (AR) technique was invented in 1927 by Udny Yule, who regressed a variable on its own lagged values, meaning that the current value is driven by a linear combination of immediately preceding values.
In 1938, Norwegian mathematician Herman Ole Andreas Wold described the decomposition of stationary time-series. He observed that stationary time-series can be expressed as the sum of a deterministic component (autoregressive) and a stochastic component (noise). This decomposition is termed after him today, as Wold's decomposition.
This work was later, in 1951, generalized to multivariate time-series in a Ph.D. thesis ("Hypothesis Testing in Time-Series") by New Zealander Peter Whittle, with Wold as his advisor. Peter Whittle is also credited with the integration of the AR and MA models into one, as the autoregressive moving average (ARMA). This was another milestone in the history of time-series modeling, bringing together the work of Yule and Hooker.
Classical time-series modeling approaches were introduced by George Box and Gwilym Jenkins in 1970 in their book "Time-Series Analysis Forecasting and Control." Most importantly, they formalized the ARIMA and ARMAX models and described how to apply them to time-series forecasting.

## The Data

I have a previous notebook that discusses pulling the data from the Alpha Vantage API, cleaning it, and testing for stationarity. The data is not stationary and needed to be differenced, which is why the analysis workflows use different data depending on the step. We'll talk about the importance of using differenced data in the simple models and why we don't need to difference the data in the (S)ARIMA models.

## Testing for Stationarity

Stationarity is a property of a time series where its statistical characteristics are constant over time. In practice, this means checking that the mean and variance of the series are constant over time, and the covariance between two points depends only on the time lag between them. Why is this important?

1. Stationary processes are mathematically easier to handle.
2. Stationary time series are more predictable due to their consistent behavior, leading to more reliable forecasting.
3. Many models are built on the assumption that they're analyzing a stationary time series.

### How do you make sure that your time series is stationary?

The first option to determine stationarity is visual inspection of the time series. If the mean value of the time series differs significantly between different subsections, or there is an obvious trend or seasonality, or there are sudden changes in the variance of the series, you're most likely working with a non-stationary time series. A major caveat of this approach: don't assume stationarity simply because you don't see any of those indicators. Some aspects of stationarity, like changes in variance, can be difficult to visualize.

The second option is to use one or more statistical tests of stationarity. Here is a (non-exhaustive) list of useful tests:

- [Augmented Dickey-Fuller (ADF)](https://en.wikipedia.org/wiki/Augmented_Dickey%E2%80%93Fuller_test). One of, if not _the_ most common, test for stationarity. The null hypothesis ($H_0$) of this test is that the time series is **NOT** stationary.
- [Kwiatkowski-Phillips-Schmidt-Shin (KPSS)](https://www.statisticshowto.com/kpss-test/). Useful for testing both _level stationarity_, where a time series is stationary around a constant mean, and _trend stationarity_, where a series is stationary around a deterministic trend. Keep in mind that the null hypothesis for KPSS is that the time series **is stationary**.
- [Phillips-Perron](https://en.wikipedia.org/wiki/Phillips%E2%80%93Perron_test) is an extension of the ADF test that is more robust to autocorrelated and heteroscedastic (non-constant variability) residuals.
- Zivot-Andrews

Code Reference: test_stationarity_robust(timeseries)

```python
def test_stationarity_robust(timeseries: Union[pd.Series, np.ndarray]) -> None:
    ...
```

Key Points
• This custom function runs multiple stationarity tests: ADF, KPSS (both statsmodels and arch), Phillips-Perron, Zivot-Andrews, and a Variance Ratio test.
• Each test has a different null hypothesis (e.g., ADF’s null hypothesis is that a unit root exists, while KPSS’s null is that the data is stationary).
• In practice, these robust tests help ensure we correctly identify whether differencing or other transformations are needed.

Thought-Provoking Questions 1. Mixing multiple tests: What are the potential pitfalls of combining results from multiple stationarity tests with different null hypotheses? 2. Structural breaks: Zivot-Andrews tests for a single structural break. How might your conclusions change if there are multiple breaks in the series?

## Using ACF and PACF Plots to determine `p` and `q` values

We plot the autocorrelation function (ACF) and partial autocorrelation function (PACF) to decide on the order of MA (q) and AR (p) components.

Code Reference:

```python
plot_acf(merged_df["t_diff"], lags=30)
plot_pacf(t_diff, lags=30, ...)
```

Key Points
• ACF is useful to decide on MA terms; PACF helps identify AR terms.
• Observing persistent significant lags often hints at the presence of either seasonality, long memory, or imperfect differencing.

Thought-Provoking Questions 1. Multiple significant lags: If there are multiple spikes in the ACF/PACF, how do we systematically decide which ones to include in the model? 2. Partial autocorrelation: How does partial autocorrelation differ conceptually from ordinary autocorrelation, and why is it crucial for AR models?

## Simple Moving Average (MA) and Exponential Weighted Average (EWM)

### Rolling MA Forecast

Code Reference: rolling_ma_forecast(...)

```python
def rolling_ma_forecast(train, test, q):
    ...
```

    •	We used a rolling approach that refits an ARIMA(0,0,q) model at each test step to make a one-step-ahead forecast.
    •	For the MA(1) model, q = 1 was (somewhat) indicated by the ACF plot.

Key Points
• We first difference the series (t_diff, v_diff) because the original was non-stationary.
• After forecasting the differenced series, we invert the differencing by cumulatively summing the predictions to get back to the original scale.

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/successful_lambda.png" loading="lazy" alt="Project">
  </div>
  <em>Testing the Lambda function locally.</em>
</div>

### Exponential Weighted Averages (EWM)

EWM is a simpler smoothing method with exponentially decaying weights.

```python
merged_df["t_ewm_short"] = merged_df.close_t.ewm(span=6, adjust=False).mean()
```

    •	We tested short and long EWMs.
    •	The evaluation (root_mean_squared_error) reveals how well each smoothing window approximates the actual series.

Thought-Provoking Questions 1. Overfitting risk: How can a purely moving average–based approach overfit if the smoothing window is too short or too large? 2. Parameter selection: What strategies could automate the choice of the EWM span to avoid manual trial-and-error?

<div class="page__gallery__wrapper">
  <div class="page__gallery__images">
    <img src="/images/redshift_materialized_view.png" loading="lazy" alt="Project">
  </div>
  <em>Redshift materialized view created!</em>
</div>

## Autoregressive (AR) Models

Code References:
• select_lag(series, max_lag=20) for automatic lag selection by AIC.
• rolling_ar_forecast(train, test, lags) for rolling forecasts.

```python
optimal_lag_t = select_lag(t_diff_train, max_lag=20)
t_ar = AutoReg(t_diff_train, lags=optimal_lag_t).fit()
...
```

Key Points
• AutoReg from statsmodels automatically handles the specified number of lags.
• With select_lag(), we iterate over possible lags and pick the one with the lowest AIC.
• Rolling forecasts retrain on the growing “history” plus the new observation each step.

Thought-Provoking Questions 1. Comparing regularization: How might adding a regularization term (e.g., Lasso or Ridge) help an AR model with large potential lags? 2. Seasonality: AR models alone often struggle with strong seasonality. How do you handle this if the seasonality is not captured by differencing alone?

## ARIMA Modeling

Code References:
• optimize_ARIMA(endog, order_list, d) to systematically scan over (p, q).
• rolling_arima_forecast(train, test, (p,d,q)) to do rolling predictions.

```python
t_result_df = optimize_ARIMA(t_arima_train, order_list, d=1)
...
t_arima_rolling, t_arima_rmse = rolling_arima_forecast(t_arima_train, t_arima_test, (2,1,2))
```

Key Points
• ARIMA generalizes AR and MA by including differencing (the “I” part).
• We define a grid for p and q and use a single difference d=1 because the data was found to be non-stationary.
• Inspecting residual diagnostics (e.g., via model_fit.plot_diagnostics()) is crucial to confirm no autocorrelation remains.

Thought-Provoking Questions 1. Over-differencing: How might you detect and mitigate over-differencing (losing too much information by differencing)? 2. Performance: For longer time spans or more frequent data (e.g., intraday stock data), does ARIMA remain computationally feasible?

## Seasonal ARIMA (SARIMA) Modeling

Code Reference:
• optimize_SARIMA_parallelized(endog, order_list, d, D, s) scans seasonal components in parallel.
• rolling_sarima_forecast(train, test, (p,d,q,P,D,Q,s)) for out-of-sample rolling forecasts.

```python
t_SARIMA_model = SARIMAX(
    t_arima_train,
    order=(best_p, d, best_q),
    seasonal_order=(best_P, D, best_Q, s),
)
...
```

Key Points
• SARIMA extends ARIMA to account explicitly for seasonal differencing (D) and seasonal AR/MA terms (P and Q).
• We used period=7 for weekly seasonality, guided by domain knowledge and decomposition plots (STL).
• Checking Ljung-Box p-values on the residuals can flag leftover autocorrelation.

Thought-Provoking Questions 1. Periodicity: How do we reliably identify the correct seasonal period if it’s not a neat weekly or monthly pattern? 2. Multiple seasonalities: If a series has multiple seasonal patterns (e.g., daily and yearly cycles), how might a single seasonal SARIMA fail, and what’s the best approach?

## Automated Model Selection with auto_arima

Code Reference:

```python
auto_model_t = pm.auto_arima(
    t_arima_train, start_p=0, start_q=0, max_p=3, max_q=3, ...
)
```

    •	pmdarima (auto_arima) helps automate the search for optimal (p,d,q,P,D,Q,m) parameters.
    •	We used m=7 to indicate weekly seasonality; auto_arima can also test non-seasonal models if seasonal=False.

Key Points
• While this can be a quick fix, you still need domain knowledge to set reasonable bounds for the parameter search.
• The final orders might align with the manual search or produce a slight variation.

Thought-Provoking Questions 1. Final check: Even after auto_arima, how do you confirm the model is truly optimal and not stuck in a local minimum or ignoring potential exogenous factors? 2. Exogenous variables: auto_arima can handle exogenous regressors (via X parameter). How might sector-wide indicators or market volatility improve your forecasts?

## Model Evaluation and Results

Code Reference: evaluate_forecast(actual, predicted)

```python
t_ma_rmse, t_ma_mae, t_ma_mape = evaluate_forecast(t_eval, ma_predictions["t_inv_diff"])
...
print(f"AT&T ARIMA - RMSE: {t_arima_rmse:.4f}, MAE: {t_arima_mae:.4f}, MAPE: {t_arima_mape:.2f}%")
```

Key Points
• We use standard metrics: RMSE, MAE, MAPE.
• RMSE penalizes larger errors more heavily, while MAE is more robust to outliers.
• MAPE can be more interpretable but may be misleading if actual values are very close to zero.

Note to self: mention that baselines are important but not included here in the current form.

Thought-Provoking Questions 1. Choosing metrics: How do you decide which error metric is the most relevant for your specific application (e.g., finance, forecasting physical quantities, etc.)? 2. Confidence intervals: Beyond point forecasts, how might you generate and evaluate prediction intervals?

## Conclusion

By walking through an array of classical time series techniques—MA, EWM, AR, ARIMA, SARIMA, and auto_arima—we’ve seen that each approach comes with its own strengths, assumptions, and quirks. Whether using simple smoothing or advanced seasonal modeling, it’s crucial to:
• Validate stationarity and transform the data appropriately.
• Perform thorough residual checks to ensure the model has captured correlations.
• Continually revisit domain context—particularly for parameter bounding and handling structural breaks.

Next Steps
• Incorporate external regressors (a.k.a. exogenous features) for a “SARIMAX” approach.
• Consider more advanced models (e.g., Prophet, TBATS, or machine-learning methods) and compare performance.
• Explore deep-learning approaches for long and complex series.

Thanks for reading! If you have any thoughts on stationarity testing, handling multiple seasonalities, or bridging the gap between classical and modern time series modeling, feel free to reach out or comment on this post. If you're interested in the implementation details, the code for this project is available on my GitHub repository [here](https://github.com/tacotuesday/time-series-stock-forecasting).

---

## About the Author

I conducted this analysis independently as part of my data science portfolio. Let's connect if you find this analysis interesting and want to discuss data science in retail or other industries! You can find me on LinkedIn at [https://www.linkedin.com/in/graftoncook](https://www.linkedin.com/in/graftoncook). Let's explore how data can drive your business forward!

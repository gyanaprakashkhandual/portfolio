---
slug: occusearch-testing
title: OccuSearch Testing
type: Manual Testing, API Testing & Performance Testing
tags:
  - Manual Testing
  - API Testing
  - Performance Testing
  - Mobile App Testing
  - QA Engineering
technologies:
  - REST Assured
  - Java
  - TestNG
  - Grafana
  - Grafana k6
  - Manual Testing
  - Postman
  - JSON
  - ANZSCO API
  - Google Sheets
  - JIRA
status: Live
liveDemo: https://www.aussizzgroup.com/occusearch/
repository: https://github.com/gyanaprakashkhandual/occusearch-testing
contributors:
  - name: Gyana Prakash Khandual
    role: QA Engineer — Manual, API & Performance Testing
    github: https://github.com/gyanaprakashkhandual
    linkedin: https://www.linkedin.com/in/gyanaprakashkhandual/
    email: gyanaprakashkhandual@gmail.com
images:
  - https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/occusearch_testing_dashboard.png
  - https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/occusearch_manual_testing.png
  - https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/occusearch_rest_assured.png
  - https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/occusearch_grafana_performance.png
  - https://res.cloudinary.com/dzj6s9o9c/image/upload/v1700000000/occusearch_bug_reports.png
---

# OccuSearch Testing

Comprehensive quality assurance project for OccuSearch — an Australian PR migration assistant mobile app — covering manual functional testing, REST Assured API testing, and Grafana-based performance testing to ensure reliability of occupation search, points calculator, visa fees estimator, and EOI statistics features.

## Overview

OccuSearch is a mobile application developed by Aussizz Migration and Education Consultants PTY LTD, designed to help skilled professionals explore Australian PR migration pathways. The app provides ANZSCO occupation search, Australia PR points calculation, visa fees estimation, state nomination pathways, EOI statistics, CRICOS course discovery, and labour market insights. This testing project delivers a full QA strategy covering manual functional testing of all core app features, REST Assured-based API testing to validate backend service accuracy and reliability, and Grafana k6 performance testing to ensure the app scales under real-world user loads. The goal is to guarantee that skilled professionals receive accurate, reliable, and responsive information when making critical immigration decisions.

## Key Features

- Manual functional testing of ANZSCO occupation search workflows
- Manual validation of Australia PR points calculator logic and eligibility classifications
- Manual testing of visa fees estimator across individual and family scenarios
- Manual verification of EOI statistics data accuracy (submitted, lodged, held, invited)
- REST Assured API testing for occupation search, points calculator, and visa fees endpoints
- API response validation including status codes, response schemas, and data accuracy
- Performance testing using Grafana k6 for load, stress, and spike testing
- Grafana dashboards for real-time performance monitoring and trend analysis
- Bug reporting and defect lifecycle management using JIRA
- Test case documentation and traceability matrix using Google Sheets

## Features

- Manual Functional Testing of Core Mobile Workflows
- ANZSCO Occupation Search Validation
- PR Points Calculator Logic Testing
- Visa Fees Estimator Accuracy Testing
- EOI Statistics Data Verification
- REST Assured API Automation Testing
- API Schema and Response Validation
- Grafana k6 Load and Stress Testing
- Real-Time Performance Monitoring via Grafana Dashboards
- Defect Tracking and Bug Lifecycle Management

## What Makes It Stand Out

The standout aspect of this testing project is the combination of domain-specific manual testing for immigration-critical data accuracy and REST Assured API validation ensuring that ANZSCO occupation data, PR points calculations, and visa fee estimates are consistently accurate and contract-compliant. Paired with Grafana k6 performance testing that simulates concurrent user loads reflecting real migration season traffic spikes, this QA strategy ensures both correctness and scalability for an app where data accuracy directly impacts users' life decisions.

## Tech Stack

**API Testing:** REST Assured, Java, TestNG, Postman, ANZSCO API

**Performance Testing:** Grafana k6, Grafana

**Manual Testing & Tracking:** JIRA, Google Sheets

**Data:** JSON

## Development Timeline

**Phase 1** — Test planning, requirement analysis, and test case design for all app features

**Phase 2** — Manual functional testing of occupation search, points calculator, visa fees estimator, and EOI statistics

**Phase 3** — REST Assured API test suite development for all backend service endpoints

**Phase 4** — API response validation including schema checks, data accuracy, and edge case testing

**Phase 5** — Grafana k6 performance test script development for load, stress, and spike scenarios

**Execution** — Performance test execution, Grafana dashboard monitoring, defect reporting, and regression cycles

## Challenges

- Validating dynamic ANZSCO occupation data accuracy against frequently updated Australian Home Affairs immigration policies
- Testing complex PR points calculation logic across multiple eligibility classification tiers (high eligibility, conditions applied, not eligible)
- Simulating realistic concurrent user load patterns during peak migration seasons using Grafana k6
- Ensuring API response consistency across occupation search, state nomination, EOI statistics, and visa fees endpoints

## Lessons Learned

- Deepened expertise in REST Assured for Java-based API test automation and response schema validation
- Gained hands-on experience with Grafana k6 for performance scripting and Grafana dashboards for real-time monitoring
- Developed domain knowledge in Australian PR migration workflows, ANZSCO classifications, and visa types
- Improved skills in designing test cases for data-driven applications where accuracy is business-critical

## Future Plans

- Integrate REST Assured API tests into a CI/CD pipeline for continuous backend validation
- Expand performance testing to include soak testing and endurance scenarios for sustained user traffic
- Add mobile UI automation testing using Appium for Android and iOS platforms
- Implement contract testing between frontend and backend services using Pact
- Build automated ANZSCO data accuracy checks against official Home Affairs data feeds

## Contributors

**Gyana Prakash Khandual** — QA Engineer — Manual, API & Performance Testing

GitHub: https://github.com/gyanaprakashkhandual

LinkedIn: https://www.linkedin.com/in/gyanaprakashkhandual/

Email: gyanaprakashkhandual@gmail.com
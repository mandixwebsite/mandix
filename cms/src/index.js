'use strict';

const initialPosts = [
  {
    title: 'The Future of Strategic Consulting in a Post-Pandemic World',
    slug: 'future-strategic-consulting',
    excerpt:
      'How businesses are adapting their strategic frameworks to navigate uncertain times and build resilience for the future. The landscape of business has fundamentally shifted, and traditional advisory models are evolving rapidly to meet new demands.',
    content: `## Introduction

The pandemic fundamentally reshaped how businesses operate, plan, and seek guidance. Strategic consulting has had to evolve in kind — moving from boardroom presentations to virtual collaboration, and from annual planning cycles to agile, real-time advisory.

## Key Shifts in the Industry

**1. Remote-First Delivery**
Consultants now deliver value across distributed teams, leveraging video calls, collaborative documents, and asynchronous communication tools.

**2. Data-Driven Decision Making**
Access to real-time dashboards and analytics means clients expect faster, evidence-backed recommendations.

**3. Resilience as a Core Competency**
Companies are no longer just optimising for growth — they are building redundancy, supply chain flexibility, and scenario-planning capabilities into their core strategies.

## Looking Ahead

Firms that embrace technology-augmented consulting, combined with deep human expertise, will define the next decade of business advisory. The future belongs to advisors who can synthesise vast data sets into clear, actionable strategies.`,
    category: 'Strategy',
    author: 'Sarah Johnson',
    readTime: '5 min read',
    featured: true,
  },
  {
    title: 'Digital Transformation Success Stories',
    slug: 'digital-transformation-success',
    excerpt:
      'Case studies of companies that successfully navigated digital transformation challenges and emerged stronger. Learn from the real-world applications of AI, cloud computing, and automated workflows across standard enterprise models.',
    content: `## Why Digital Transformation Fails (and How to Succeed)

Studies show that over 70% of digital transformation initiatives fail to meet their original objectives. The reasons range from poor change management to inadequate technology selection.

## Success Story 1: Mid-Market Retailer

A regional retail chain with 40 stores implemented a unified e-commerce and inventory management system. Within 18 months, online revenue grew by 340% and stock-out incidents reduced by 62%.

**Key lesson:** Start with the customer journey, then select the technology — not the other way around.

## Success Story 2: Professional Services Firm

A 200-person accounting firm replaced legacy siloed systems with a cloud-based practice management platform. Time spent on administrative tasks dropped by 45%, freeing professionals to focus on client advisory work.

**Key lesson:** Employee adoption is as important as the technology itself.

## The Common Thread

All successful transformations share three traits: strong executive sponsorship, phased rollouts with measurable KPIs, and continuous feedback loops from end users.`,
    category: 'Technology',
    author: 'Michael Chen',
    readTime: '7 min read',
    featured: false,
  },
  {
    title: 'Financial Strategy for Uncertain Times',
    slug: 'financial-strategy-uncertain-times',
    excerpt:
      'How to manage company finances during market volatility and economic uncertainty. Proactive financial planning is no longer optional; it is a critical defensive measure for mid-market businesses.',
    content: `## Navigating Financial Uncertainty

Economic unpredictability — from interest rate fluctuations to geopolitical tensions — demands that businesses move beyond static annual budgets toward dynamic financial management.

## Key Strategies

### 1. Rolling Forecasts
Replace annual budgets with 12-month rolling forecasts updated quarterly. This allows rapid reallocation of resources as conditions change.

### 2. Liquidity Buffer
Maintain 3–6 months of operating expenses in accessible reserves. This is not idle capital — it is strategic optionality.

### 3. Scenario Planning
Develop three financial scenarios: base case, downside (−20% revenue), and severe downside (−40% revenue). Have pre-approved responses for each threshold.

### 4. Cost Structure Flexibility
Shift fixed costs to variable where possible. Consider outsourcing non-core functions to reduce overhead during contractions.

## The Bottom Line

Businesses that build financial resilience today are not being pessimistic — they are being strategic. Uncertainty is the new norm, and financial agility is a competitive advantage.`,
    category: 'Finance',
    author: 'Lisa Rodriguez',
    readTime: '6 min read',
    featured: false,
  },
  {
    title: 'Top Tax Planning Strategies for SMEs in 2024',
    slug: 'tax-planning-sme',
    excerpt:
      'Effective tax optimisation techniques that small and medium enterprises can implement to reduce their tax burden legally. Leveraging new incentives and restructuring entity schemas can open up substantial reinvestment capital.',
    content: `## Introduction to SME Tax Planning

For small and medium enterprises, tax is often the single largest controllable cost. Strategic tax planning — done legally and proactively — can free up significant capital for reinvestment and growth.

## Strategy 1: Optimal Business Structure

Sole traders, partnerships, and companies are taxed differently. Regularly review whether your current structure is still the most tax-efficient for your scale and activity.

## Strategy 2: Maximise Deductions

Ensure all legitimate business expenses are documented and claimed: home office costs, vehicle usage, professional subscriptions, training, and technology tools.

## Strategy 3: R&D Tax Credits

Many SMEs leave R&D tax relief unclaimed because they believe it only applies to technology companies. If your business is developing new products, processes, or software workflows, you may qualify.

## Strategy 4: Pension Contributions

Director pension contributions are a highly tax-efficient way to extract value from a company while reducing corporation tax liability.

## Strategy 5: Timing of Income and Expenditure

Where possible, time the receipt of income and the payment of expenses to optimise taxable profits across financial years.

## Working with a Tax Advisor

The complexity of tax legislation means that professional advice more than pays for itself. Engage a qualified advisor annually — not just at year end.`,
    category: 'Tax',
    author: 'David Patel',
    readTime: '8 min read',
    featured: false,
  },
  {
    title: 'Building a Resilient Business Model',
    slug: 'building-resilient-business',
    excerpt:
      'Key frameworks and tools for building businesses that can withstand disruption and adapt to change. Core competencies should pivot from rigid, localised structures to decentralised, agile operational models.',
    content: `## What Makes a Business Resilient?

Resilience is not about avoiding disruption — it is about the capacity to absorb shocks, adapt, and emerge stronger. In today's environment, this is a board-level priority.

## The Resilience Framework

### Diversification
Over-reliance on a single client, supplier, or market is the most common single point of failure. Aim for no client representing more than 20% of revenue.

### Operational Redundancy
Identify critical processes and ensure backup capabilities exist — whether that is a secondary supplier, a cross-trained team member, or a cloud backup system.

### Financial Buffers
As discussed in our financial strategy article, liquidity reserves are the ultimate resilience tool.

### Agile Decision-Making
Organisations that can decide and act quickly outperform those trapped in slow hierarchical processes. Establish clear decision rights at every level.

## Measuring Resilience

Track these indicators:
- Days of operating cash on hand
- Customer concentration ratio
- Supplier dependency score
- Employee cross-functional capability ratio

A resilient business is not built overnight — it is the result of consistent, intentional decisions made across every function of the organisation.`,
    category: 'Strategy',
    author: 'Emily Watson',
    readTime: '4 min read',
    featured: false,
  },
  {
    title: 'Understanding Corporate Governance Best Practices',
    slug: 'corporate-governance-best-practices',
    excerpt:
      'A guide to implementing effective corporate governance frameworks that protect stakeholder interests. Proper board oversight, transparent auditing, and robust compliance measures form the bedrock of sustainable corporate success.',
    content: `## Why Corporate Governance Matters

Good corporate governance is not just a compliance exercise — it is the foundation of stakeholder trust, sustainable growth, and long-term value creation.

## Core Pillars of Governance

### Board Composition
An effective board balances executive leadership with independent non-executive directors. Diversity of experience, background, and perspective strengthens decision-making quality.

### Transparency and Reporting
Regular, accurate, and accessible financial reporting builds confidence among investors, lenders, and partners. Consider adopting integrated reporting frameworks that include non-financial metrics.

### Internal Controls
Robust internal controls prevent fraud, error, and inefficiency. Implement segregation of duties, regular internal audits, and clear approval authorities.

### Ethical Culture
Governance policies are only as effective as the culture that surrounds them. A published code of conduct, whistleblowing policy, and visible leadership commitment are essential.

### Risk Management
The board should maintain an active risk register covering strategic, operational, financial, and reputational risks — with clear owners and mitigation plans for each.

## Getting Started

For SMEs, governance does not need to be complex. Start with a simple board structure, regular management accounts, and clear documented policies. Build sophistication as the business grows.`,
    category: 'Finance',
    author: 'James Okafor',
    readTime: '6 min read',
    featured: false,
  },
];

module.exports = {
  register() {},


  async bootstrap({ strapi }) {
    // ── 1. Set public permissions for blog-posts (find + findOne) ──────────────
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const existingPerms = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({ where: { role: publicRole.id, action: { $startsWith: 'api::blog-post' } } });

      if (existingPerms.length === 0) {
        const actions = [
          'api::blog-post.blog-post.find',
          'api::blog-post.blog-post.findOne',
        ];
        for (const action of actions) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: { action, role: publicRole.id },
          });
        }
        strapi.log.info('✅ Public permissions set for blog-posts');
      }
    }

    // ── 2. Seed initial blog posts if none exist ───────────────────────────────
    const existingCount = await strapi.query('api::blog-post.blog-post').count();

    if (existingCount === 0) {
      strapi.log.info('🌱 Seeding initial blog posts...');
      for (const post of initialPosts) {
        await strapi.entityService.create('api::blog-post.blog-post', {
          data: {
            ...post,
            publishedAt: new Date(),
          },
        });
      }
      strapi.log.info(`✅ Seeded ${initialPosts.length} blog posts`);
    }
  },
};


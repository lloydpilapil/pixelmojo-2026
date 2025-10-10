# PixelMojo Blog Creation Playbook

Complete guide for creating high-quality, SEO-optimized blog posts that follow our proven formula.

---

## Table of Contents

1. [Blog Structure Template](#blog-structure-template)
2. [Content Flow Pattern](#content-flow-pattern)
3. [Component Usage Guide](#component-usage-guide)
4. [Writing Style Standards](#writing-style-standards)
5. [SEO Requirements](#seo-requirements)
6. [Tables & Lists](#tables--lists)
7. [Workflow Process](#workflow-process)
8. [Quality Checklist](#quality-checklist)

---

## Blog Structure Template

Every blog post follows this exact structure:

### 1. Frontmatter (YAML - Top of File)

```yaml
---
title: 'Your Compelling Title Here (50-60 chars ideal)'
slug: your-blog-post-url-slug
date: 2025-01-15 # Publication date
createdDate: 2025-01-14 # Creation date
updatedDate: 2025-01-15 # Last update date
description: Your meta description here (150-160 characters max, compelling hook that makes users click)
tags: [
    primary-keyword,
    secondary-keyword,
    long-tail-keyword,
    related-topic-1,
    related-topic-2,
    # ... 30-40 tags total for comprehensive coverage
    location-keyword-philippines, # If relevant
  ]
featuredImage: /your-featured-image.webp
featured: false # Set to true for homepage feature
jsonLd:
  - '@context': 'https://schema.org'
    '@type': 'Article'
    headline: 'Your Article Headline'
    description: 'Your article description'
    image: 'https://pixelmojo.com/your-image.webp'
    datePublished: '2025-01-15'
    dateModified: '2025-01-15'
    author:
      '@type': 'Organization'
      name: 'Pixelmojo'
      url: 'https://pixelmojo.com'
    publisher:
      '@type': 'Organization'
      name: 'Pixelmojo'
      logo:
        '@type': 'ImageObject'
        url: 'https://pixelmojo.com/logo.png'
    mainEntityOfPage:
      '@type': 'WebPage'
      '@id': 'https://pixelmojo.com/blog/your-slug'
  - '@context': 'https://schema.org'
    '@type': 'FAQPage'
    mainEntity:
      - '@type': 'Question'
        name: 'Your first FAQ question?'
        acceptedAnswer:
          '@type': 'Answer'
          text: 'Comprehensive answer to the question...'
      # Add 7+ more FAQ items
---
```

### 2. Content Structure (MDX - After Frontmatter)

```mdx
<BlogPostImage
  src='/your-featured-image.webp'
  alt='Descriptive alt text for the image'
  aspectRatio='3/2'
/>

## Your Main H2 Headline: The Hook That Captures Attention

Opening paragraph that hooks the reader immediately. Address their pain point or curiosity.

<TLDR
  items={[
    'First key takeaway with specific data or insight',
    'Second key takeaway that promises value',
    'Third key takeaway with unique angle',
    'Fourth key takeaway with actionable insight',
    'Fifth key takeaway that differentiates from competitors',
    'Sixth key takeaway that drives urgency or FOMO',
  ]}
  keyTakeaway='The single most important insight readers should remember. Make it compelling and data-backed.'
/>

## Section 2: Your First Major Point

Content here...

### Subsection With H3 For Deeper Dive

More detailed content...

<BlogQuote
  quote='A powerful, memorable quote that reinforces your main argument or provides social proof'
  author='Source or Context'
/>

## Section 3: Data & Comparison

<BlogTable
  data={{
    headers: ['Metric', 'Traditional Approach', 'Our Approach', 'Improvement'],
    rows: [
      ['Timeline', '12 weeks', '3 weeks', '75% faster'],
      ['Cost', '$150,000', '$45,000', '70% savings'],
      // More comparison rows
    ],
  }}
/>

## Section 4: Case Studies or Examples

Real-world examples with specific numbers...

## Section 5: Implementation or How-To

Actionable steps readers can take...

<BlogFAQ
  title='[Topic]: Questions Readers Actually Ask'
  faqs={[
    {
      id: 'unique-question-id-slug',
      question: 'Specific question in natural language?',
      answer:
        'Comprehensive 2-3 paragraph answer that fully addresses the question and provides value. Include data, examples, and next steps where relevant.',
    },
    // 7+ more FAQs for optimal SEO
  ]}
/>

## Conclusion: The Action Step

Summary of key points and compelling call-to-action.

**Ready to [achieve desired outcome]?** Our team specializes in [service description].

- [**Service Name 1**](/services/service-slug-1) — Brief description
- [**Service Name 2**](/services/service-slug-2) — Brief description
- [**Contact Us**](/contact-us) — Start your transformation today
```

---

## Content Flow Pattern

### Opening Hook Formula (First 2-3 Paragraphs)

1. **Pain Point or Curiosity** → Address reader's problem immediately
2. **Bold Statement** → Challenge conventional wisdom or present data
3. **Promise** → What they'll learn or gain from reading

**Example:**

> "Look at the image above. Five specialists, endless meetings, and someone asking 'What is this for?' That's $150,000 of confusion. While traditional agencies coordinate five people, AI-native agencies deploy one expert who does it all—faster, cheaper, better."

### TLDR Placement (Always After Opening)

- **6 bullet points** minimum (can have more for complex topics)
- Each bullet = **1 specific, data-backed insight**
- **KeyTakeaway** = Single memorable sentence with data
- Place **immediately after opening hook**, before main content

### Section Structure

**H2 Sections (6-10 per post):**

- Major topic divisions
- Start with compelling headlines
- 300-500 words per section

**H3 Subsections (2-4 per H2):**

- Deeper dives into H2 topics
- 150-300 words per subsection
- Use for: examples, data, case studies

### Quote Placement Strategy

**Use BlogQuote for:**

- Counterintuitive insights
- Data revelations
- Behavioral psychology hooks
- Social proof or expert validation

**Placement:** 1 quote per 500-700 words of content

### Table Placement

**Use BlogTable for:**

- Comparison matrices (us vs. competitors)
- Before/after data
- Feature comparisons
- Pricing breakdowns

**Placement:** Mid-article after establishing context

### FAQ Placement (Always at End)

- **Minimum 8 FAQs** for optimal SEO
- Target featured snippets
- Answer questions people actually search
- Use natural language in questions
- Provide comprehensive answers (2-3 paragraphs each)

---

## Component Usage Guide

### BlogPostImage

```mdx
<BlogPostImage
  src='/path-to-image.webp'
  alt='Descriptive alt text (important for SEO and accessibility)'
  aspectRatio='3/2'  # Standard ratio for featured images
/>
```

**When to use:**

- First thing in every blog post (required)
- For major section breaks (optional)
- For case study visuals (optional)

**Image requirements:**

- Format: `.webp` (optimized for web)
- Location: `/public/` directory
- Naming: `blog-slug-name.webp` or `blog-slug-section-name.webp`
- Alt text: Descriptive, keyword-rich, natural language

### TLDR

```mdx
<TLDR
  items={[
    'Bullet point 1: Specific insight with data',
    'Bullet point 2: Unique angle or counterintuitive fact',
    'Bullet point 3: Reader benefit or transformation',
    'Bullet point 4: Social proof or case study teaser',
    'Bullet point 5: Technical or process insight',
    'Bullet point 6: Urgency or FOMO driver',
  ]}
  keyTakeaway='The ONE thing readers must remember. Make it data-backed and memorable: "Data from 512 projects shows 70% faster delivery at 50% lower cost."'
/>
```

**Guidelines:**

- Place after opening hook, before main content
- 6+ items (no maximum)
- Each item = complete sentence
- KeyTakeaway = single powerful sentence with data
- Focus on WHAT readers gain, not just what article covers

### BlogQuote

```mdx
<BlogQuote
  quote='Your powerful quote here. Should be memorable, controversial, or insight-packed. Not fluff.'
  author='Context or Attribution'
/>
```

**When to use:**

- Highlight counterintuitive insights
- Break up long text sections
- Add authority or social proof
- Emphasize key behavioral psychology points

**Guidelines:**

- 1-2 sentences max
- Meaningful content (not generic inspiration)
- Author field = context or source (e.g., "The Data-Driven Reality" or "Harvard Business Review Study")

### BlogTable

```mdx
<BlogTable
  data={{
    headers: ['Feature', 'Traditional', 'AI-Native', 'Advantage'],
    rows: [
      ['Timeline', '12 weeks', '3 weeks', '75% faster'],
      ['Cost', '$150k', '$45k', '70% savings'],
      ['Revisions', '4-5 rounds', '1-2 rounds', '60% reduction'],
    ],
  }}
/>
```

**When to use:**

- Comparison matrices
- Before/after data
- Pricing breakdowns
- Feature comparisons
- Timeline comparisons
- ROI calculations

**Guidelines:**

- 3-5 columns ideal (max 6 for mobile)
- Clear, concise cell content
- Use data and specific numbers
- Headers = clear labels

### BlogFAQ

```mdx
<BlogFAQ
  title='[Topic]: Questions [Audience] Actually Ask'
  faqs={[
    {
      id: 'unique-kebab-case-id',
      question: 'What exactly is [topic] and how does it work?',
      answer:
        'Comprehensive answer in 2-3 paragraphs. Include: (1) Direct answer, (2) Context/examples, (3) Next steps or implications. Be thorough—this targets featured snippets.',
    },
    // 7+ more FAQs
  ]}
/>
```

**When to use:**

- End of every blog post (required)
- Minimum 8 FAQs for SEO

**Question types to include:**

1. **Definition question** ("What is...")
2. **Comparison question** ("How is X different from Y...")
3. **Cost/pricing question** ("How much does...")
4. **Implementation question** ("How do I...")
5. **Timeline question** ("How long does...")
6. **Technical question** (specific to topic)
7. **Decision-making question** ("Should I..." or "When should I...")
8. **Process question** ("Can you walk me through...")

**Answer guidelines:**

- 150-250 words per answer
- 2-3 paragraphs
- Include data where possible
- Reference case studies or examples
- End with actionable insight

---

## Writing Style Standards

### Word Count Targets

- **Minimum:** 3,000 words
- **Optimal:** 3,500-5,000 words
- **Maximum:** No limit (but keep it valuable, not fluffy)

**Why?** Long-form content ranks better and positions us as authorities.

### Tone & Voice

**Our Voice:**

- **Authoritative but conversational** (expert friend, not stuffy professor)
- **Data-driven** (cite numbers, not opinions)
- **Direct and bold** (challenge conventional wisdom)
- **Action-oriented** (tell readers what to DO)

**Avoid:**

- Corporate jargon without explanation
- Passive voice (use active: "AI reduces costs" not "costs are reduced by AI")
- Fluff and filler content
- Generic statements without data

### Data-Driven Approach

**Always include:**

- Specific numbers and percentages
- Date ranges for data (e.g., "2023-2025 data")
- Sample sizes where relevant (e.g., "N=512 projects")
- Sources or methodology notes

**Example:**

> ❌ "AI-native agencies are much faster"
> ✅ "Data from 512 projects (2023-2025) shows AI-native agencies deliver 40-70% faster"

### Behavioral Psychology Hooks

**Incorporate these frameworks:**

1. **Loss Aversion** → "While you wait 12 weeks, you're hemorrhaging $10k/day in opportunity cost"
2. **Social Proof** → "Top 5% of agencies have already made this shift"
3. **Sunk Cost Fallacy** → "You've invested in traditional agencies for years, but that doesn't make them right"
4. **FOMO** → "Early adopters captured massive market share in 2024-2025"
5. **Anchoring** → "Traditional agencies quote $200k, then 'discount' to $150k. You're still overpaying."

### Case Study Format

**Every case study must include:**

```markdown
**Case Study: [Client Type or Industry]**

- **Context:** Brief background and challenge
- **Intervention:** What we did (specific actions, tools, timeline)
- **Timeline Delta:** Our time vs. traditional estimate
- **KPI Delta:**
  - Cost: $X vs. $Y quoted (Z% savings)
  - Timeline: W weeks vs. Q weeks (R% faster)
  - Results: Specific business outcomes with numbers
```

### Internal Linking Strategy

**Link to:**

- Related blog posts (2-3 per article)
- Service pages (in conclusion CTA)
- Case studies (when relevant)

**Format:**

```mdx
[descriptive anchor text](/blogs/related-post-slug)
[**Service Name**](/services/service-slug)
```

**Placement:**

- Naturally within content flow
- As CTAs in conclusion
- In FAQ answers where relevant

---

## SEO Requirements

### Tags Strategy

**Include 30-40 tags covering:**

1. **Primary keyword** (1-2 tags)
   - Main topic of article

2. **Secondary keywords** (3-5 tags)
   - Related concepts

3. **Long-tail keywords** (10-15 tags)
   - Specific phrases people search
   - Question-based keywords

4. **Topic variations** (5-8 tags)
   - Different ways to describe the topic

5. **Location keywords** (2-3 tags if relevant)
   - philippines, manila, southeast-asia

6. **Industry keywords** (5-8 tags)
   - e-commerce, saas, b2b, etc.

**Tag naming convention:**

- All lowercase
- Hyphens for spaces (kebab-case)
- No special characters
- Descriptive and searchable

### JSON-LD Schema (Required)

**Article Schema:**

```yaml
- '@context': 'https://schema.org'
  '@type': 'Article'
  headline: 'Your headline (max 110 chars)'
  description: 'Your description (max 160 chars)'
  image: 'https://pixelmojo.com/your-image.webp'
  datePublished: '2025-01-15'
  dateModified: '2025-01-15'
  author:
    '@type': 'Organization'
    name: 'Pixelmojo'
    url: 'https://pixelmojo.com'
  publisher:
    '@type': 'Organization'
    name: 'Pixelmojo'
    logo:
      '@type': 'ImageObject'
      url: 'https://pixelmojo.com/logo.png'
  mainEntityOfPage:
    '@type': 'WebPage'
    '@id': 'https://pixelmojo.com/blog/your-slug'
```

**FAQPage Schema:**

```yaml
- '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity:
    - '@type': 'Question'
      name: 'Your question text?'
      acceptedAnswer:
        '@type': 'Answer'
        text: 'Your complete answer text here...'
```

### Meta Description Formula

**Format (150-160 chars):**

```
[Hook with data] → [What they'll learn] → [Unique benefit/CTA]
```

**Example:**

> "Data from 512 projects shows AI-native agencies deliver 70% faster at 50% lower cost. Learn the framework transforming creative work and when to make the switch."

**Requirements:**

- Include primary keyword
- Include specific data point
- Create urgency or curiosity
- Under 160 characters
- Compelling action verb

### Featured Snippet Optimization

**Target featured snippets with:**

1. **Definition answers** in FAQ
   - Start with: "X is..."
   - 40-60 words

2. **List answers** in FAQ
   - Numbered or bulleted
   - 3-8 items

3. **Table data** with BlogTable
   - Comparison matrices
   - "X vs Y" format

4. **How-to steps** in content
   - Clear numbered steps
   - Action-oriented

---

## Tables & Lists

### Tables

**DON'T use markdown tables:**

```markdown
| Column 1 | Column 2 |
| -------- | -------- |
| Data 1   | Data 2   |
```

**DO use BlogTable component:**

```mdx
<BlogTable
  data={{
    headers: ['Column 1', 'Column 2'],
    rows: [
      ['Data 1', 'Data 2'],
      ['Data 3', 'Data 4'],
    ],
  }}
/>
```

**Why?** BlogTable automatically:

- Constrains to content width (65% with 25% left margin)
- Scrolls on mobile
- Applies consistent styling
- Stays within the blog layout wrapper

### Lists & Checkboxes

**DON'T use box symbols:**

```markdown
□ Item one
□ Item two
```

**DO use standard markdown:**

```markdown
- Item one
- Item two
```

Or for ordered lists:

```markdown
1. First item
2. Second item
```

**Why?** The □ symbol doesn't render as an interactive checkbox - it's just an ugly character.

### List Best Practices

**Use bullet lists for:**

- Features or benefits
- Multiple options
- Non-sequential items

**Use numbered lists for:**

- Step-by-step processes
- Ranked items
- Sequential workflows

**Formatting:**

- Keep list items parallel in structure
- Start each item with capital letter
- End with period if complete sentence
- No period if fragment

---

## Workflow Process

### 1. Research Phase

**Before writing:**

- [ ] Identify target keyword and search intent
- [ ] Analyze top 5 ranking articles for that keyword
- [ ] Identify content gaps (what they're missing)
- [ ] Gather data, case studies, statistics
- [ ] Note internal linking opportunities

**Tools:**

- Google Search Console (what people search)
- Competitor analysis
- Keyword research tools
- Internal analytics

### 2. Outline Creation

**Create detailed outline with:**

- Working title and slug
- H2 section headlines (6-10)
- H3 subsections under each H2
- Key data points to include
- Components to use (TLDR, Tables, Quotes, FAQ)
- Internal links to add
- Case studies to feature

### 3. Drafting

**Write in this order:**

1. **Frontmatter** → Set up metadata first
2. **TLDR** → Define key takeaways before writing
3. **FAQ** → Know what questions you're answering
4. **Body content** → Fill in between TLDR and FAQ
5. **Opening hook** → Write last (when you know full story)
6. **Conclusion CTA** → Strong close with service links

**Writing tips:**

- Write for skimmers (use bold, subheads, short paragraphs)
- Include data in every major section
- Add examples and case studies
- Break up long sections with components

### 4. Component Integration

**As you write, add:**

- [ ] BlogPostImage at top
- [ ] TLDR after opening
- [ ] BlogQuote every 500-700 words
- [ ] BlogTable for comparison data
- [ ] BlogFAQ at end (8+ questions)

### 5. Review & Optimization

**Content review:**

- [ ] Read aloud (does it flow?)
- [ ] Check all data is cited
- [ ] Verify internal links work
- [ ] Ensure CTAs are compelling
- [ ] Confirm word count (3000+ words)

**SEO review:**

- [ ] Primary keyword in: title, first paragraph, H2s, conclusion
- [ ] 30-40 relevant tags added
- [ ] Meta description compelling and under 160 chars
- [ ] JSON-LD schema complete
- [ ] FAQ targets featured snippets

**Technical review:**

- [ ] All images use BlogPostImage component
- [ ] All tables use BlogTable component
- [ ] No □ checkbox symbols
- [ ] No HTML entities (`&lt;` → `<`)
- [ ] Internal links use correct paths

### 6. Validation & Build

**Run checks:**

```bash
# Validate blog content
npm run validate:blog

# Build contentlayer
npm run contentlayer

# Type check
npm run type-check
```

**Fix any errors before committing.**

### 7. Git Commit

**Commit message format:**

```bash
git add content/your-blog-slug.mdx
git commit -m "feat(blog): add [topic] guide

- [Brief description of what the blog covers]
- [Key value proposition]
- [Any special components or features]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Quality Checklist

### Pre-Publishing Checklist

**Content Quality:**

- [ ] 3,000+ words (ideally 3,500-5,000)
- [ ] Data-backed claims with specific numbers
- [ ] At least 2 case studies or examples
- [ ] Behavioral psychology hooks included
- [ ] Conversational but authoritative tone
- [ ] No fluff or filler content
- [ ] Clear value proposition throughout

**Structure:**

- [ ] Frontmatter complete (all required fields)
- [ ] Featured image at top (BlogPostImage)
- [ ] TLDR with 6+ items + keyTakeaway
- [ ] 6-10 H2 sections with compelling headlines
- [ ] 2-4 H3 subsections per H2
- [ ] BlogQuote every 500-700 words
- [ ] BlogTable for comparison data
- [ ] BlogFAQ at end with 8+ questions
- [ ] Strong conclusion with CTA

**SEO:**

- [ ] 30-40 relevant tags
- [ ] Primary keyword in title, first para, H2s, conclusion
- [ ] Meta description under 160 chars, compelling
- [ ] JSON-LD Article schema complete
- [ ] JSON-LD FAQPage schema complete
- [ ] Alt text on all images
- [ ] Internal links to 2-3 related posts
- [ ] Service links in conclusion CTA

**Components:**

- [ ] BlogPostImage (required at top)
- [ ] TLDR (required after opening)
- [ ] BlogTable (if comparison data exists)
- [ ] BlogQuote (1-3 per article)
- [ ] BlogFAQ (required at end, 8+ FAQs)

**Technical:**

- [ ] No markdown tables (use BlogTable)
- [ ] No □ symbols (use `-` for bullets)
- [ ] No HTML entities
- [ ] Images in `/public/` directory
- [ ] Images are `.webp` format
- [ ] All internal links use correct paths

**Validation:**

- [ ] `npm run validate:blog` passes
- [ ] `npm run contentlayer` builds successfully
- [ ] `npm run type-check` passes
- [ ] No console errors in preview

**Final Review:**

- [ ] Read entire post aloud
- [ ] Check mobile preview
- [ ] Verify all links work
- [ ] Test on staging if available
- [ ] Get peer review if major post

---

## Quick Reference

### File Location

```
/content/your-blog-slug.mdx
```

### Image Location

```
/public/your-blog-slug.webp
```

### Validation Command

```bash
npm run validate:blog
```

### Build Command

```bash
npm run contentlayer
```

### Preview Locally

```bash
npm run dev
# Visit: http://localhost:3000/blogs/your-slug
```

---

## Need Help?

**For questions about:**

- Blog strategy → See successful examples in `/content/`
- Component usage → See this guide's Component section
- SEO optimization → See SEO Requirements section
- Technical issues → Run validation scripts

**Best practice:** Review existing top-performing blogs before writing:

- `ai-native-design-agency-vs-traditional-agency-complete-guide.mdx` (flagship)
- `growth-marketing-vs-traditional-marketing-the-complete-guide.mdx`
- `tools-you-didnt-know-your-agency-needed.mdx`

These follow our proven formula and can serve as templates.

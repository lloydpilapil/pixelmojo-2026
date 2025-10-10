# Blog Content Style Guide

## Tables

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

---

## Lists & Checkboxes

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

---

## Custom Components Available

### BlogTable

For data tables and comparison matrices.

### TLDR

For key takeaways at the top of posts.

### BlogQuote

For highlighted quotes.

### BlogFAQ

For FAQ sections with structured Q&A.

### BlogPostImage

For featured images with proper aspect ratios.

---

## Quick Checklist Before Publishing

- [ ] All tables use `<BlogTable>` component
- [ ] No □ checkbox symbols (use `-` for bullets)
- [ ] Images use `<BlogPostImage>` component
- [ ] No HTML entities like `&lt;` (use `<` directly)
- [ ] Run `npm run contentlayer` to check for errors

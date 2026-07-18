# Xiao Zhang — Academic Website

Source for [https://1npc.github.io](https://1npc.github.io), a personal research website covering Game AI, AI characters, semantic parsing, and neuro-symbolic AI.

## Editing the website

The short reference in [EDITING_GUIDE.md](EDITING_GUIDE.md) lists the files used for the homepage, publications, news, projects, blog posts, social links, and responsive styling.

The most frequently edited files are:

- `_pages/about.md` — homepage text and research-focus cards
- `_bibliography/papers.bib` — publications and homepage-selected papers
- `_news/*.md` — homepage news
- `_posts/*.md` — research notes and blog posts
- `_data/socials.yml` — email and social profiles
- `_config.yml` — site-wide metadata and deployment URL
- `xiao_zhang.jpg` — homepage hero image

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/`.

## Publishing

Push changes to `main`. The `Deploy site` GitHub Actions workflow builds the Jekyll site and publishes the generated website to the `gh-pages` branch.

The site is based on the [al-folio](https://github.com/alshedivat/al-folio) academic website theme.

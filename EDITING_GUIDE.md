# Website editing guide

This site is built with Jekyll and the al-folio theme. Most routine updates only require editing the files below.

| What you want to update | File to edit |
| --- | --- |
| Homepage biography, headline, research-focus cards, and featured-section switches | `_pages/about.md` |
| Publications and which papers appear on the homepage | `_bibliography/papers.bib` (`selected = {true}` controls homepage inclusion) |
| News items shown on the homepage | `_news/*.md` |
| Blog posts | `_posts/YYYY-MM-DD-title.md` |
| Projects page introduction | `_pages/projects.md` |
| Individual projects | `_projects/*.md` |
| Email and social links | `_data/socials.yml` |
| Name, site description, URL, navigation, theme features, and publication sorting | `_config.yml` |
| Homepage hero layout | `_layouts/about.liquid` |
| Homepage responsive styling | `_sass/_layout.scss` |
| Homepage hero image | `xiao_zhang.jpg` |

After editing, commit and push to the `main` branch. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the site and publishes the generated files to the `gh-pages` branch.

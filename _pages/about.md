---
layout: about
title: About
permalink: /

profile:
  align: right
  image: xiao_zhang.jpg
  image_root: true
  image_circular: false
  more_info: >
    <p><strong>Xiao Zhang</strong> &nbsp;章潇</p>
    <p>PhD candidate</p>
    <p>Computational Linguistics</p>
    <p>University of Groningen</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<div class="availability">
  <span class="availability-tag">Open to opportunities</span>
  <p>
    Finishing my PhD in 2026 and open to <strong>postdoc or industry research roles</strong>
    in large language models, including agents and game AI.
  </p>
  <div class="availability-links">
    <a href="mailto:{{ site.data.socials.email | encode_email }}">{{ site.data.socials.email }}</a>
    <a href="{{ '/cv/' | relative_url }}">CV</a>
  </div>
</div>

I work on meaning in machines: giving it a form they can act on, and finding out when they get it wrong. The work began in computational semantics, grew into the question of what large language models actually know, and has lately turned toward the characters that live in games.

## Research

<div class="research">
  <div class="research-card research-feature">
    <a class="research-figure" href="https://npcbank.org/blog-introducing-npcbank.html">
      <img src="{{ '/assets/img/npcbank/capabilities.webp' | relative_url }}" width="640" height="640" alt="The NPCBank capability map: what a character should preserve, and what should follow its state." loading="lazy">
    </a>
    <div class="research-body">
      <h3>NPCBank, the Non-Player Character Bank</h3>
      <p>Between a model that talks and a character that lives, the distance is still wide. I built NPCBank to measure it: every case states what a reply must change and what it must preserve, with the evidence for both open to inspection.</p>
      <div class="post-links">
        <a href="https://npcbank.org">npcbank.org &#8599;</a>
        <a href="https://npcbank.org/blog-introducing-npcbank.html">Read the introduction &#8599;</a>
      </div>
    </div>
  </div>
  <div class="research-card">
    <h3>What models know</h3>
    <p>Whether large language models can operate on knowledge rather than merely recognise it: ontologies, systematic coverage, retrieval, and reasoning that stays consistent.</p>
    <ul class="research-works">
      <li><a href="https://arxiv.org/abs/2505.11031">OntoURL</a> <span>Journal of Web Semantics</span></li>
      <li><a href="https://aclanthology.org/2026.findings-acl.548/">KnowledgeBerg</a> <span>Findings of ACL 2026</span></li>
      <li><a href="https://arxiv.org/abs/2503.02670">Reasoning consistency</a> <span>AACL-IJCNLP 2026</span></li>
    </ul>
  </div>
  <div class="research-card">
    <h3>Meaning made explicit</h3>
    <p>Neural parsing into Discourse Representation Structures, across languages and modalities, and the challenge sets that show where parsers fall over.</p>
    <ul class="research-works">
      <li><a href="https://aclanthology.org/2025.cl-1.7/">Taxonomical parsing</a> <span>Computational Linguistics 2025</span></li>
      <li><a href="https://aclanthology.org/2025.iwcs-main.5/">Retrieval-augmented parsing</a> <span>IWCS 2025</span></li>
      <li><a href="https://doi.org/10.1145/3746027.3755444">Tombstone inscriptions</a> <span>ACM Multimedia 2025</span></li>
    </ul>
  </div>
</div>

<!-- lists -->

## Education

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-when">2022 &ndash; now</div>
    <div class="timeline-what">
      <h3>PhD, Computational Linguistics &middot; <a href="https://www.rug.nl/">University of Groningen</a></h3>
      <p>Supervised by <a href="https://www.rug.nl/staff/johan.bos/?lang=en">Johan Bos</a> and <a href="https://www.rug.nl/staff/g.bouma/?lang=en">Gosse Bouma</a>.</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-when">2020 &ndash; 2022</div>
    <div class="timeline-what">
      <h3>MSc, Computer Science &middot; <a href="https://www.universiteitleiden.nl/en">Leiden University</a></h3>
      <p>Supervised by <a href="https://www.universiteitleiden.nl/en/staffmembers/suzan-verberne">Suzan Verberne</a>.</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-when">2016 &ndash; 2020</div>
    <div class="timeline-what">
      <h3>BEng, Information Engineering &middot; <a href="https://en.xjtu.edu.cn/">Xi'an Jiaotong University</a></h3>
    </div>
  </div>
</div>

## What I want to build

Characters that hold up: that remember what you did three hours ago, keep their personality when a player leans on it, and know what is true in a world that keeps moving. Getting there will take state-aware reasoning, inference light enough for a player's own machine, and memory that keeps both secrets and goals.

Longer term, I want structured world models and language models to stop being rival approaches. Games are where that will be settled, because players find every seam.

I am always glad to hear from people working on intelligent characters, player-facing agents, or neuro-symbolic language systems, in academia or industry.

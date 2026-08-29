---
layout: about
title: About
permalink: /
subtitle: PhD candidate in computational linguistics. I build benchmarks that test whether a system really knows what it is talking about — lately, game characters.

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
    Finishing my PhD in 2026 and looking for a <strong>postdoc or industry research role</strong>
    in game AI, AI characters, agents, or applied LLM research.
  </p>
  <div class="availability-links">
    <a href="mailto:{{ site.data.socials.email | encode_email }}">{{ site.data.socials.email }}</a>
    <a href="{{ '/cv/' | relative_url }}">CV</a>
  </div>
</div>

I work on meaning: getting it into a form a machine can act on, and finding out when the machine has it wrong. For most of my PhD that was semantic parsing — mapping sentences onto formal structures — and it has since turned into benchmarks for what large language models actually know.

Right now it is pointed at game characters. I built **[NPCBank](https://npcbank.org)** for a question the field mostly skips: ask the same NPC the same thing in a private room, after a betrayal, and in front of an enemy — does the voice stay theirs while the answer moves? Every case is inspectable: the prompt, the character's state, the evidence behind it, and the contract it is judged against.

## The path here

I started in information engineering at Xi'an Jiaotong University, which gave me the engineering and none of the linguistics. That gap sent me to Leiden for a master's with [Suzan Verberne](https://www.universiteitleiden.nl/en/staffmembers/suzan-verberne), on the seam between language processing and information retrieval. Since 2022 I have been in Groningen with [Johan Bos](https://www.rug.nl/staff/johan.bos/?lang=en) and [Gosse Bouma](https://www.rug.nl/staff/g.bouma/?lang=en): Discourse Representation Structures, neural parsers, and the challenge sets that show where they fall over.

Four years in, the question has drifted. Early on it was whether a parser gets a sentence right. Now it is whether a system knows anything you can hold it to, which is what the work on ontologies, retrieval augmentation, and reasoning consistency is really asking.

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-when">2022 &ndash; now</div>
    <div class="timeline-what">
      <h3>PhD, Computational Linguistics &middot; <a href="https://www.rug.nl/">University of Groningen</a></h3>
      <p>Computational semantics, neural parsing, and what large language models actually know.</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-when">2020 &ndash; 2022</div>
    <div class="timeline-what">
      <h3>MSc, Computer Science &middot; <a href="https://www.universiteitleiden.nl/en">Leiden University</a></h3>
      <p>Natural language processing and information retrieval.</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-when">2016 &ndash; 2020</div>
    <div class="timeline-what">
      <h3>BEng, Information Engineering &middot; <a href="https://en.xjtu.edu.cn/">Xi'an Jiaotong University</a></h3>
      <p>Signals, systems, and enough engineering to be dangerous with a GPU.</p>
    </div>
  </div>
</div>

## What I want to build

Characters that hold up.

Talking is the part that already works. What does not yet work is a character who remembers what you did three hours ago, keeps their personality when a player leans on it, and knows what is currently true in a world that keeps moving — without ever saying the thing a designer has to patch out afterwards.

NPCBank came out of not being able to measure any of that. It keeps what a character *is* apart from what is currently *true of them*, because collapsing the two is how a benchmark loses the ability to say why a model behaved differently. That is the same instinct as the parsing work: make the structure explicit enough that you can check it.

Longer term I want structured world models and language models to stop being rival approaches. Games are where that gets settled, because a player will find every seam.

I am always glad to hear from people working on intelligent characters, player-facing agents, or neuro-symbolic language systems, in academia or industry.

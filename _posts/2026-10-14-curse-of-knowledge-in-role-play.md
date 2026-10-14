---
layout: post
title: "The curse of knowledge in role-playing language models"
description: Language models that speak as game characters repeat what those characters could not have heard or understood, even when they can say exactly what the character perceives.
tags: role-play LLM game-AI
categories: research
thumbnail: assets/img/curse-of-knowledge/fig1-example.png
published: true
featured: false
toc:
  beginning: true
date: 2026-10-14 12:00:00 +02:00
---

{% include figure.liquid path="assets/img/curse-of-knowledge/fig1-example.png" width="520" alt="Two mechanics say in Spanish that a mirror is in the warehouse. Mara, who speaks only English, is asked what they talked about. In version A she says a mirror is in the warehouse, in version B a chair is in a church, and with a flag saying she did not understand, she says she did not catch a word." class="post-hero" %}

Mara speaks only English. Two mechanics standing next to her say, in Spanish, that the mirror is in the warehouse, and a friend asks her what they were talking about. She tells him: a mirror, in the warehouse.

The language model playing Mara read the Spanish and understood it. Mara could not have. Psychologists call the human version of this the curse of knowledge: once you know something, it is hard to reason as someone who does not. This post summarises [a new paper](https://arxiv.org/abs/2610.17327) on how often role-playing models fall into it, what decides whether they do, and what prevents it.

**The short version.** In 11 open-weight models, characters repeat speech they cannot understand or cannot hear in most replies, while the same models can say correctly what the character perceives. Five of six proprietary models rarely leak, but even in strong models, whether the boundary holds can depend on the input format. Prompting and thinking help a few models. What works reliably is giving the model only what the character could perceive.

## Why this matters

Games and agent simulations keep a world state: who is in the room, who can hear whom, which languages each character speaks. They pass that state to a language model, which speaks as one character at a time. The model therefore always sees more than the character it plays.

Whether it can hold that back decides whether a secret stays secret and whether a language barrier means anything. Deduction games, stealth games and simulations of how rumours spread are all built on the difference between what happened and what a character could know.

## Measuring a leak

A model can name the hidden fact by guessing, so each scene comes with a twin. Versions A and B differ only in the hidden object and place, and everything else stays the same, as in the figure above. A reply counts as using the target when it names its own version's fact, and as using the foil when it names the twin's. Net use is the difference in percentage points (pp): 100 when every reply names its own fact and none names the twin's, and 0 for a model that only guesses.

Two separate probes check the rest. A translation probe confirms that the model understands the hidden speech. A state probe shows the model the same character sheet and asks, out of character, whether the character could hear and understand it.

The studies cover 480 scenes, 11 open-weight models of up to 40B parameters, DeepSeek-V4-Pro, and six proprietary models.

## Knowing the rule, breaking it

Under the plainest statement of the boundary, open-weight characters use speech they cannot understand at **66.7 pp** and speech they cannot hear at **72.2 pp**. Every model is above 45 pp in both.

<figure class="post-figure">
  <img class="fig-light" src="{{ '/assets/img/curse-of-knowledge/boundary-light.svg' | relative_url }}" alt="Dot plot: the 11 open-weight models and DeepSeek-V4-Pro use speech the character cannot understand or hear at 66 to 78 pp; Claude Sonnet 5.5 reaches 26 pp, and the other five proprietary models stay at or below 9 pp." loading="lazy">
  <img class="fig-dark" src="{{ '/assets/img/curse-of-knowledge/boundary-dark.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy">
  <figcaption class="caption">Net use of speech the character cannot perceive, with 95% intervals. Open-weight models use it in most replies. Five of six proprietary models rarely do, while still using permitted content in about 99% of control replies.</figcaption>
</figure>

**They read the boundary correctly.** Ten of the 11 models answer the state probe correctly for 87–100% of scenes, and on exactly those scenes net use is 68.4 pp. Sometimes the gap is visible inside a single reply:

> "They're talking about some envelope, but I can't understand a word they're saying. Something about the parking lot, though."

**The question does not have to ask for it.** When the friend asks only whether the character caught what was said, net use is still 52.7 pp, and 50.1 pp when he asks what to do next.

**It is not only speech, and not only talk.** The same leak appears for actions the character cannot see (60.6 pp) and private messages it cannot read (72.0 pp). It persists through four further exchanges, and it steers behaviour: when the character chooses between two places to search, moving the hidden fact from one place to the other moves the choice by 49–63 pp.

**Scale does not fix it.** Within Qwen3.5, net use rises from 13.9 pp at 0.8B to 82.7 pp at 9B.

The proprietary models show that the boundary can be learned. GPT-6 Sol, Gemini 3.8 Flash and Grok 4.7 stay at or below 1 pp, Claude Opus 5.5 at or below 5.4 pp and Gemini 3.1 Pro at or below 9 pp. Claude Sonnet 5.5 is the exception, at 26 pp for speech it cannot understand, and falls to 3 pp with high reasoning effort. DeepSeek-V4-Pro behaves like the smaller open-weight models.

## The format decides

Gemma-4-31B leaks unheard speech at 51 pp in one study and almost never in the other. The two studies describe the scene differently, so I swapped the parts of the input one at a time to find out which difference mattered.

<figure class="post-figure">
  <img class="fig-light" src="{{ '/assets/img/curse-of-knowledge/format-light.svg' | relative_url }}" alt="Dumbbell chart: swapping a single part of the input raises Gemma-4-31B from 0 to 62 pp, Qwen3.8-27B from 9 to 68, and Falcon-H1-34B and Seed-OSS-36B to 100; swapping all four parts raises DeepSeek-V4-Pro to 67, Gemini 3.1 Pro to 21 and Claude Sonnet 5.5 to 13." loading="lazy">
  <img class="fig-dark" src="{{ '/assets/img/curse-of-knowledge/format-dark.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy">
  <figcaption class="caption">The same scenes and the same boundary. Only one part of the prompt changes, or for the last three models all four parts. For the open-weight models, use of permitted speech stays at 80–100% in every variant, so the swaps change only what they do with speech they should not use.</figcaption>
</figure>

For Gemma-4-31B, the layout of the scene state alone takes it from 0 to 62 pp, and to 96 pp on a fresh set of scenes. For Qwen3.8-27B it is the character sheet alone, from 9 to 68 pp. For Falcon-H1-34B and Seed-OSS-36B it is the wording of the question, which takes both to 100 pp. With all four parts swapped, Gemini 3.1 Pro goes from 0 to 21 pp and Claude Sonnet 5.5 from under 1 to 13 pp.

Nothing about what the character could hear has changed. The part that matters differs from model to model, which means a model that passes with one prompt format has told you very little about the next one.

## Not a role-play problem

A plausible explanation lies in what models have read. Fiction routinely renders foreign speech for the reader and reports what characters failed to notice, so continuing a scene from the full state is the familiar task. If that is right, writing the character's line as the scene's author should leak about as much as playing the character, and it does: 76 and 81 pp as the author, only 6 pp below role-play.

Thinking rarely helps. With thinking enabled, net use for speech the character cannot understand barely moves. For unheard speech it falls by 8.5 pp, almost all of it from a single model, Qwen3.8-27B, which drops from 73 to 18 pp. GLM-4.7-Flash gets worse on speech it cannot understand, from 63 to 89 pp. Its reasoning notes that two people are gossiping "in a language he doesn't understand", and the reply then says where the wallet is.

## What works

**Asking the model to filter itself is unreliable.** A list-first prompt asks the model to "list only what X can perceive and understand right now" and then answer from that list. It cuts net use by 64.7% on average, but only for models that write a clean list. Others put the hidden values straight into it. Self-filtering also throws away content the character is allowed to use: Qwen3.8-27B's filter returns only "Casey says something in Japanese" even when the character speaks Japanese.

**Filtering in the system works.** The system already knows what each character can access, so it can build the input from that. A character view keeps the events the character perceived and replaces each hidden one with what remains observable, such as "Alex appears to put something away." Net use falls from 60.7 pp to zero, use of permitted content does not change, and hidden facts no longer move search choices. Deleting the hidden event also stops the leak, but then the character mentions what it did see in only 32% of replies, against 100% under the view.

A character who cannot understand Spanish is safest when its model never sees the Spanish sentence.

## What I take away

1. **Reading a boundary is not keeping it.** Most models state correctly what the character perceives and then use what it does not.
2. **Vary the input format before trusting a result.** One layout, one character sheet or one question can move a model from 0 to over 60 pp.
3. **Report permitted use next to leakage.** A model that says nothing passes a leakage test trivially; self-filtering often looks like this.
4. **Decide access outside the model.** Give the generator what the character can perceive, not the whole scene and a rule about it.

The paper, with all numbers and the full set of models, is [on arXiv](https://arxiv.org/abs/2610.17327), and the scenes, prompts, scorer and analysis code are [on GitHub](https://github.com/1npc/curse-of-knowledge-roleplay). If you build characters on top of a shared world state and have found other ways to keep them from knowing too much, I would like to hear about them.

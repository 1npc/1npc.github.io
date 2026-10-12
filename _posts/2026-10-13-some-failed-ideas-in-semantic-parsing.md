---
layout: post
title: "Some failed ideas in semantic parsing"
description: Four ideas for DRS and AMR parsing that did not survive a matched baseline — RL post-training, a logic-verified reward, a translation-invariance reward, and DRS as a meaning checker for machine translation.
tags: semantic-parsing negative-results DRS AMR
categories: research
thumbnail: assets/img/semparse-failures/thumb.svg
published: true
featured: false
toc:
  beginning: true
date: 2026-10-13 12:00:00 +02:00
---

{% include figure.liquid path="assets/img/semparse-failures/thumb.svg" width="600" alt="A notebook page listing four ideas for semantic parsing, each crossed out, with red-pen verdicts: SFT did it better, Smatch already knew, pseudo-labels won, a coin flip." class="post-hero" %}

Papers report what worked. This post is about four things that did not, from a few days of experiments on parsing text into Discourse Representation Structures (DRS) and Abstract Meaning Representation (AMR). Each idea looked reasonable on paper, and each one fell apart once it was compared with the right baseline. I am writing them down because the reasons they failed are more useful than the ideas themselves.

**The short version.** Reinforcement learning did not beat supervised fine-tuning. A logic-verified reward was redundant with Smatch. A translation-invariance reward lost to plain pseudo-labelling. DRS did not work as a meaning checker for machine translation.

## Setup

Every experiment fine-tunes **Qwen3.5-0.8B-Base** with full fine-tuning and decodes greedily.

- **DRS:** Parallel Meaning Bank 5.1, English, in Sequence Box Notation (SBN). 9,057 gold training sentences, plus silver data, and 1,132 dev sentences.
- **AMR:** AMR 3.0, with 55,635 training graphs and 1,722 dev graphs.
- **Metric:** Smatch, and SBN-Smatch for DRS. Duplicate triples are removed before matching, so that repeating a triple cannot raise the score.

A caveat that applies to everything below: these are **dev-set numbers**, mostly from **one seed**, at **0.8B** scale. Confidence intervals are paired bootstraps over sentences, so they do not include seed variance. Read the numbers as evidence for a direction, not as final results.

## 1. RL post-training does not beat SFT

**The idea.** GRPO with a verifiable reward has become the standard way to post-train LLMs, and semantic parsing has a reward that is easy to verify: Smatch against the gold graph. So I tried GRPO with a sentence-level Smatch reward on top of a supervised parser. There is prior work on this for AMR, both [recent](https://aclanthology.org/2025.xllm-1.11/) and [older](https://aclanthology.org/P19-1451/).

**The comparison that matters.** GRPO generates samples and learns from them, so it gets more training than the SFT checkpoint it starts from. A fair comparison gives the baseline the same prompts and the same number of updates. I used two controls:

- **RFT:** fine-tune on the best of 8 samples.
- **Continued SFT:** keep training on the gold targets.

<figure class="post-figure">
  <img class="fig-light" src="{{ '/assets/img/semparse-failures/selection-light.svg' | relative_url }}" alt="Dot plot: with SFT selected by dev loss, all three post-training methods gain about half a point; with SFT selected by dev Smatch, none of them moves." loading="lazy">
  <img class="fig-dark" src="{{ '/assets/img/semparse-failures/selection-dark.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy">
  <figcaption class="caption">DRS dev SBN-Smatch. Starting from an SFT checkpoint picked by dev loss (orange), GRPO, RFT and continued SFT all gain about half a point. Picking the SFT checkpoint by dev Smatch (blue) gives a bigger gain for free, and after that none of the three moves.</figcaption>
</figure>

The first result looked like a success. GRPO improved its starting point by +0.53 Smatch, with a 95% interval of [0.27, 0.84]. RFT and continued SFT improved it just as much, though. And simply picking the SFT checkpoint by dev Smatch instead of dev loss gave **+1.1** on its own. The "RL gain" was a checkpoint-selection artefact: the starting model was under-trained, and any further training fixed it.

**Why RL has nothing to learn.** GRPO learns from the differences in reward between samples drawn for the same input. A well-trained parser on its own training sentences produces eight identical outputs most of the time.

<figure class="post-figure">
  <img class="fig-light" src="{{ '/assets/img/semparse-failures/starvation-light.svg' | relative_url }}" alt="Line chart: on a well-trained DRS parser, more than 90% of GRPO groups have zero reward variance throughout training; on an under-trained parser and on AMR the share is 20 to 45%." loading="lazy">
  <img class="fig-dark" src="{{ '/assets/img/semparse-failures/starvation-dark.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy">
  <figcaption class="caption">Share of GRPO groups where all 8 samples get the same reward, and so contribute no gradient (10-iteration moving average). On a well-trained DRS parser this is above 90% from the first step. The mean training reward there is 0.998.</figcaption>
</figure>

The headroom does exist, but it is on unseen sentences. On dev, with the earlier under-trained checkpoint, the best of 16 samples scored 97.1 against 93.9 for greedy decoding. RL on training sentences the model has already memorised cannot reach it.

**AMR looked like a win, until I split the gain.** AMR is harder, and its SFT model is far from saturated (training reward 0.88). Here GRPO did beat both controls, on two seeds: dev went from 81.5 to 82.3 and from 81.7 to 82.4. Then I recomputed the gain using only the sentences where _both_ systems produce a well-formed graph.

<figure class="post-figure">
  <img class="fig-light" src="{{ '/assets/img/semparse-failures/amr-validity-light.svg' | relative_url }}" alt="Confidence-interval plot: GRPO's AMR gain over the SFT start shrinks from +0.75 to +0.08 when restricted to sentences where both outputs are well-formed." loading="lazy">
  <img class="fig-dark" src="{{ '/assets/img/semparse-failures/amr-validity-dark.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy">
  <figcaption class="caption">AMR dev, paired differences with 95% intervals. Against its own starting point, GRPO's +0.75 becomes +0.08 (interval [−0.11, 0.26]) once malformed outputs are excluded. It fixed 28 malformed graphs and broke 10.</figcaption>
</figure>

Roughly 90% of the improvement is GRPO learning to emit balanced, parseable PENMAN. That is worth having, but a constrained decoder gives it for free.

**Is RL just starved of fresh data?** To test this, I held out 30% of the DRS gold data, trained SFT on the other 70%, and then post-trained on the held-out part.

<figure class="post-figure">
  <img class="fig-light" src="{{ '/assets/img/semparse-failures/data-efficiency-light.svg' | relative_url }}" alt="Bar chart: SFT turns the held-out 30% of gold data into +1.81 Smatch, GRPO into +0.96, and RFT into +0.67." loading="lazy">
  <img class="fig-dark" src="{{ '/assets/img/semparse-failures/data-efficiency-dark.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy">
  <figcaption class="caption">Each bar is the gain from the same extra 30% of gold data. SFT on all the data gains +1.81; GRPO on the extra 30% gains +0.96.</figcaption>
</figure>

Given fresh labelled data, SFT used it about twice as well as GRPO. The one RL-specific signal I saw was small. Trained on English only, GRPO transferred slightly better zero-shot to German, Italian and Dutch than RFT or SFT did: +0.3 to +0.7 points on the well-trained model. This fits the view that RL with verifiable rewards [sharpens what the model already does](https://arxiv.org/abs/2504.13837), and that GRPO [behaves much like filtered self-training](https://arxiv.org/abs/2505.13697).

## 2. A logic-verified reward is redundant with Smatch

**The idea.** Smatch counts overlapping triples. Dropping a negation therefore costs about as much as dropping an adjective, even though one flips the meaning and the other only weakens it. DRSs have a model-theoretic semantics, so I built a checker in three steps:

1. Translate SBN into first-order logic. A world argument handles modality and propositional attitudes.
2. Align the predicted and gold referents using Smatch's alignment.
3. Ask the z3 solver whether the prediction is **equivalent** to the gold, **entails** it, is **entailed** by it, or **contradicts** it.

The plan was to use this four-way relation as a reward.

**The checker works.**

| test on 1,132 dev sentences           | result                                    |
| ------------------------------------- | ----------------------------------------- |
| gold vs. gold                         | 1,132 / 1,132 equivalent (0.4 s in total) |
| NEGATION box turned into CONTINUATION | 162 / 166 contradictions                  |
| only a word sense changed             | equivalent once senses are aligned        |

**But there was nothing for it to fix.** Among the greedy outputs of the SFT parser, **none** contradicted the gold. Of the outputs with sentence Smatch ≥ 0.9, 13.8% were not logically equivalent, but almost all of these were role or attachment mistakes that Smatch already penalises. Across 16 samples per sentence, the sample with the best Smatch was logically equivalent **83.7%** of the time. Picking an equivalent sample whenever any of the 16 was equivalent would have reached only **85.2%**.

Selecting by Smatch already finds nearly every logically correct parse, so a logic reward has almost no extra signal to give. A sound verifier is only useful as a reward if the errors it catches actually happen. (Using theorem proving to _evaluate_ semantic parsers has been proposed [separately](https://arxiv.org/abs/2510.11225).)

## 3. A translation-invariance reward loses to pseudo-labelling

**The idea.** Meaning should not change under translation, and the Parallel Meaning Bank is built on exactly this: its English, German, Italian and Dutch documents share one DRS. Given parallel text, I could reward a German parse for agreeing with the parser's own parse of the English translation. That needs no German annotation at all.

I used about 155k German, 95k Italian and 28k Dutch sentences with English translations from the PMB (text only), and compared four arms that use the same information in different ways.

<figure class="post-figure">
  <img class="fig-light" src="{{ '/assets/img/semparse-failures/xl-same-information-light.svg' | relative_url }}" alt="Line chart over 150 iterations: SFT on the model's own English parses reaches 88.2, SFT on PMB copper annotations 85.8, and the two GRPO variants 83.3 and 81.6." loading="lazy">
  <img class="fig-dark" src="{{ '/assets/img/semparse-failures/xl-same-information-dark.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy">
  <figcaption class="caption">Mean SBN-Smatch on German, Italian and Dutch dev. GRPO and SFT that see the same information: SFT wins by about five points in both pairs. Training on the model's own English parses even beats the PMB's projected "copper" annotations.</figcaption>
</figure>

The simplest baseline (parse the English side, train on the result) was the best method, and it was not close. One caveat: the English translations of most German, Italian and Dutch dev documents are in the English training data. That inflates absolute cross-lingual numbers for every system, although the comparison between systems is still fair.

**A side observation.** Adding about 140k English silver sentences to SFT raised English dev from 92.5 to 95.0, but _lowered_ zero-shot German, Italian and Dutch from 79.2 to 72.8. More English-only data made the parser more English-specific.

## 4. DRS is not a usable meaning checker for MT

**The idea.** If DRSs are language-neutral, you can parse a source sentence and its translation and compare the two meanings directly. That should catch the errors MT metrics are known to miss, such as antonyms, numbers, named entities, gender and word sense. I tested this on the English–German part of [ACES](https://aclanthology.org/2022.wmt-1.44/). Each ACES item pairs a source with a correct and an incorrect translation, and a good metric should prefer the correct one. I fixed the categories and the decision rule before scoring.

The parser was not the problem. It scored 89.3 on PMB German dev, and 96.8% of the ACES sentences parsed into well-formed DRSs. The metric was.

<figure class="post-figure">
  <img class="fig-light" src="{{ '/assets/img/semparse-failures/aces-light.svg' | relative_url }}" alt="Dot plot of ACES tau per category: the DRS check is clearly positive only for sentence-level contradictions and near or below zero elsewhere." loading="lazy">
  <img class="fig-dark" src="{{ '/assets/img/semparse-failures/aces-dark.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy">
  <figcaption class="caption">Pairwise tau on ACES English↔German. Ties count as errors, as in ACES, so 0 is roughly chance. The DRS check works only for sentence-level contradictions (0.78). For one-word errors it is near or below chance. chrF is shown only as a surface-overlap reference; ACES is designed so that such metrics struggle.</figcaption>
</figure>

There were two problems.

- **Parser noise is larger than the error.** ACES changes one word in a sentence of about 11 words, and the parses of the good and bad translation differ by more than that word for unrelated reasons. Sometimes the difference disappears altogether: "married in 1842" and "married in 6842" received identical SBNs. On gender, the correct translation won 415 times, the incorrect one won 421 times, and 844 pairs tied.
- **The logic relation saturates.** Two independently produced parses in different languages are almost never logically equivalent once every word sense counts. So both translations come out as merely "compatible" with the source, and the solver cannot tell them apart.

Detecting cross-lingual divergence with AMR [has been studied more carefully](https://aclanthology.org/2024.cl-2.1/). What this experiment shows is narrower: finding one-word errors this way needs far more precise parses than current sentence-level parsers produce on this kind of text.

## What I take away

1. **Select SFT checkpoints by the task metric before trying anything clever.** Dev-loss selection left about a Smatch point on the table, and every method I tried happily "recovered" it.
2. **Check whether RL has a signal before tuning it.** The training reward and the share of zero-variance groups tell you in minutes whether GRPO can move.
3. **Separate validity gains from content gains.** With graph outputs, "fewer malformed outputs" can pass for better parsing.
4. **For a task with one canonical output, imitation is hard to beat.** Whenever SFT and RL had access to the same information, SFT won.
5. **A correct verifier is not automatically a useful reward or metric.** It has to target errors that actually happen, at a granularity the parser can resolve.

None of this says that RL or logic has no place in semantic parsing. It says that the obvious versions do not pay off on PMB- and AMR-style benchmarks with a well-trained small model. If you have seen these ideas work in a setting like this, I would like to know what was different.

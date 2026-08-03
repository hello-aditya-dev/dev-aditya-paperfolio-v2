'use client';

import { motion } from 'framer-motion';
import { FlagshipFeature } from '@/components/home/FlagshipStory';
import { Reveal, fadeUp } from '@/components/Reveal';
import { FLAGSHIP_PROJECTS } from '@/config/projects';

/**
 * Selected Work — homepage section.
 *
 * The two strongest flagship projects receive large editorial treatment,
 * each leading with the business complexity and the clarity created — not
 * with technology. Projects are sourced from the centralised data file, so
 * counts and ordering always reflect the canonical project list.
 */
export default function SelectedWork() {
  // Defensive fallback to the first two flagship projects if data changes.
  const flagships = FLAGSHIP_PROJECTS.slice(0, 2);
  const [first, second] = flagships.length >= 2 ? flagships : [flagships[0], flagships[0]];

  return (
    <>
      {/* Section intro */}
      <Reveal id="selected-work" className="pt-20 md:pt-24 pb-4 max-w-7xl mx-auto px-6 scroll-mt-[80px]">
        <motion.p
          variants={fadeUp}
          className="font-[family-name:var(--font-mono)] text-xs text-maroon uppercase tracking-widest mb-4"
        >
          Selected Work
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary max-w-3xl leading-[1.15]"
        >
          {FLAGSHIP_PROJECTS.length} flagship projects that prove range without losing focus.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-text-muted text-base md:text-lg max-w-2xl mt-5 leading-relaxed"
        >
          Corporate, commerce, SaaS, brand and professional services — each
          chosen because it demonstrates a different kind of judgement. Open
          any of them for the full case study.
        </motion.p>
      </Reveal>

      {/* Flagship features */}
      <FlagshipFeature project={first} index={1} />
      <FlagshipFeature project={second} index={2} />
    </>
  );
}

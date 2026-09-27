import React, { useEffect, useRef, useState } from "react";
import Styles from "./Skill.module.css";
import AnimatedSection from "../Animation/AnimatedSection";
import { fadeUp } from "../../Animations/Animations";
import { TbBrandJavascript } from "react-icons/tb";
import { GrReactjs } from "react-icons/gr";
import { TbBrandNextjs } from "react-icons/tb";
import { SiRedux } from "react-icons/si";
import { TbBrandTypescript } from "react-icons/tb";

const skills = [
  { name: "NextJs", percent: 70, icon: TbBrandNextjs },
  { name: "ReactJs", percent: 70, icon: GrReactjs },
  { name: "TypeScript", percent: 85, icon: TbBrandTypescript },
  { name: "JavaScript", percent: 75, icon: TbBrandJavascript },
  { name: "Redux", percent: 85, icon: SiRedux },
];

function SkillItem({ skill, index }) {
  const circleRef = useRef(null);
  const itemRef = useRef(null);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const el = itemRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const start = performance.now();
            const duration = 1400;
            const delay = index * 120;

            const animate = (time) => {
              const elapsed = time - start - delay;
              if (elapsed < 0) {
                requestAnimationFrame(animate);
                return;
              }
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setAnimatedPercent(Math.round(eased * skill.percent));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, index, skill.percent]);

  const offset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div
      className={Styles.skillItem}
      ref={itemRef}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className={Styles.ringWrap}>
        <svg className={Styles.ringSvg} viewBox="0 0 100 100">
          <circle className={Styles.ringTrack} cx="50" cy="50" r={radius} />
          <circle
            ref={circleRef}
            className={Styles.ringProgress}
            cx="50"
            cy="50"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className={Styles.ringIcon}>
          <span>{<skill.icon />}</span>
        </div>
      </div>
      <div className={Styles.skillPercent}>{animatedPercent}%</div>
      <div className={Styles.skillName}>{skill.name}</div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className={Styles.skillsSection}>
      <AnimatedSection variants={fadeUp}>
        <div className={Styles.skillsRow}>
          {skills.map((skill, i) => (
            <SkillItem skill={skill} index={i} key={skill.name} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}

import React, { useState } from "react";
import "./ProjectCard.css";

export default function ProjectCard({
  name,
  category,
  year,
  tags = [],
  image,
  href = "#",
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card ${hovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-card__media">
        <img src={image} alt={name} className="project-card__image" />
        <div className="project-card__gradient" />

        <span className="project-card__corner project-card__corner--tr" />
        <span className="project-card__corner project-card__corner--tl" />
        <span className="project-card__corner project-card__corner--br" />
        <span className="project-card__corner project-card__corner--bl" />

        {category && <span className="project-card__badge">{category}</span>}

        <div className="project-card__overlay">
          <a href={href} className="project-card__view-btn">
            مشاهده پروژه
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 5L8 12L15 19"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="project-card__footer">
        <div>
          <p className="project-card__name">{name}</p>
          {tags.length > 0 && (
            <p className="project-card__tags">{tags.join(" · ")}</p>
          )}
        </div>
        {year && (
          <span className="project-card__year" dir="ltr">
            {year}
          </span>
        )}
      </div>
    </div>
  );
}
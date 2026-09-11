import React, { useState } from "react";
import style from "./ProjectCard.module.css";
import classNames from "classnames";

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
      className={classNames(
        style["project-card"],
        hovered ? style["is-hovered"] : "",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={style["project-card__media"]}>
        <img src={image} alt={name} className={style["project-card__image"]} />
        <div className={style["project-card__gradient"]} />

        <span
          className={style["project-card__corner project-card__corner--tr"]}
        />
        <span
          className={style["project-card__corner project-card__corner--tl"]}
        />
        <span
          className={style["project-card__corner project-card__corner--br"]}
        />
        <span
          className={style["project-card__corner project-card__corner--bl"]}
        />

        {category && (
          <span className={style["project-card__badge"]}>{category}</span>
        )}

        <div className={style["project-card__overlay"]}>
          <a href={href} className={style["project-card__view-btn"]}>
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

      <div className={style["project-card__footer"]}>
        <div>
          <p className={style["project-card__name"]}>{name}</p>
          {tags.length > 0 && (
            <p className={style["project-card__tags"]}>{tags.join(" · ")}</p>
          )}
        </div>
        {year && (
          <span className={style["project-card__year"]} dir="ltr">
            {year}
          </span>
        )}
      </div>
    </div>
  );
}

"use client";

import { tariffs } from "@/data/content";
import { useState } from "react";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M3 10h13m-5-5 5 5-5 5" />
    </svg>
  );
}

export function TariffGrid() {
  const defaultIndex = Math.max(
    0,
    tariffs.findIndex((tariff) => tariff.featured),
  );
  const [selected, setSelected] = useState(defaultIndex);

  return (
    <div className="tariff-grid" role="listbox" aria-label="Тарифы">
      {tariffs.map((tariff, index) => {
        const isSelected = index === selected;

        return (
          <article
            className={`tariff${isSelected ? " is-selected" : ""}`}
            key={tariff.name}
            role="option"
            aria-selected={isSelected}
            tabIndex={0}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelected(index);
              }
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                setSelected((current) => (current + 1) % tariffs.length);
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                setSelected(
                  (current) => (current - 1 + tariffs.length) % tariffs.length,
                );
              }
            }}
          >
            <p className="tariff-eyebrow">{tariff.eyebrow}</p>
            <h3>{tariff.name}</h3>
            <p className="tariff-description">{tariff.description}</p>
            <div className="price">
              <strong>{tariff.price}</strong>
              <span>{tariff.unit}</span>
            </div>
            <ul>
              {tariff.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={(event) => event.stopPropagation()}
            >
              Запросить расчёт
              <ArrowIcon />
            </a>
          </article>
        );
      })}
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";

const FILTERS = [
  {
    name: "Normal",
    values: { brightness: 100, contrast: 100, saturate: 100, sepia: 0 },
  },
  {
    name: "Vintage",
    values: { brightness: 90, contrast: 110, saturate: 80, sepia: 40 },
  },
  {
    name: "Grayscale",
    values: { brightness: 100, contrast: 110, saturate: 0, sepia: 0 },
  },
  {
    name: "Green",
    values: { brightness: 105, contrast: 105, saturate: 150, sepia: 0 },
  },
  {
    name: "Warm",
    values: { brightness: 110, contrast: 100, saturate: 120, sepia: 20 },
  },
  {
    name: "Cool",
    values: { brightness: 100, contrast: 105, saturate: 90, sepia: 0 },
  },
  {
    name: "Faded",
    values: { brightness: 115, contrast: 85, saturate: 70, sepia: 10 },
  },
];

export default function FilterOptions({ setFilters }) {
  const [activeFilter, setActiveFilter] = useState("Normal");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const rowRef = useRef(null);

  const checkScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const row = rowRef.current;
    row?.addEventListener("scroll", checkScroll);
    return () => row?.removeEventListener("scroll", checkScroll);
  }, []);

  const handleSelect = (filter) => {
    setActiveFilter(filter.name);
    setFilters(filter.values);
  };

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 120, behavior: "smooth" });
  };

  return (
    <div className="filter-pills-wrapper">
      <button
        className="filter-arrow"
        onClick={() => scroll(-1)}
        style={{ visibility: canScrollLeft ? "visible" : "hidden" }}
      >
        ‹
      </button>

      <div className="filter-pills-row" ref={rowRef}>
        {FILTERS.map((filter) => (
          <button
            key={filter.name}
            className={`filter-pill ${activeFilter === filter.name ? "active" : ""}`}
            onClick={() => handleSelect(filter)}
          >
            {filter.name}
          </button>
        ))}
      </div>

      <button
        className="filter-arrow"
        onClick={() => scroll(1)}
        style={{ visibility: canScrollRight ? "visible" : "hidden" }}
      >
        ›
      </button>
    </div>
  );
}

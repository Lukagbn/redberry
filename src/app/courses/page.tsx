"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import layout from "@/app/layout.module.scss";
import Star from "@/components/Star/Star";
import CourseCards from "@/components/CourseCards/CourseCards";
import { useSearchParams, useRouter } from "next/navigation";

interface CardsApi {
  data: Course[];
  meta: CardsMeta;
}
export interface Course {
  id: number;
  title: string;
  description: string;
  basePrice: string;
  avgRating: number;
  reviewCount: number;
  durationWeeks: number;
  isFeatured: boolean;
  image: string;
  category: Category;
  instructor: Instructor;
  topic: Topic;
}
interface Category {
  id: number;
  name: string;
  icon: string;
}
interface Instructor {
  id: number;
  name: string;
  avatar: string;
}
interface Topic {
  id: number;
  name: string;
}
interface CardsMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

const FILTER_CATEGORY: Record<string, string>[] = [
  { text: "Development", img: "/icons/development.svg" },
  { text: "Design", img: "/icons/design.svg" },
  { text: "Business", img: "/icons/business.svg" },
  { text: "Data Science", img: "/icons/data.svg" },
  { text: "Marketing", img: "/icons/marketing.svg" },
];
const FILTER_TOPICS = [
  "React",
  "Typescript",
  "Phyton",
  "UX/UI",
  "Figma",
  "JavaScript",
  "Node.js",
  "Machine Learning",
  "Seo",
  "Analytics",
];
const FILTER_INSTRUCTOR: Record<string, string>[] = [
  { name: "Marilyn Mango", img: "/marilyn.webp" },
  { name: "Ryan Dorwart", img: "/ryan.webp" },
  { name: "Roger Calzoni", img: "/roger.webp" },
  { name: "Zain Philips", img: "/zain.webp" },
];

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const [cards, setCards] = useState<Course[] | null>(null);
  const [meta, setMeta] = useState<CardsMeta | null>(null);
  const [dropDown, setDropDown] = useState(false);
  async function fetchCards() {
    try {
      const res = await fetch(
        `https://api.redclass.redberryinternship.ge/api/courses?sort=${sort}&page=${page}`,
      );
      const result: CardsApi = await res.json();
      console.log("API Result:", result);
      setCards(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.log(error);
    }
  }
  function handleSort(value: string) {
    router.push(`?sort=${value}&page=1`);
  }
  useEffect(() => {
    fetchCards();
  }, [sort]);
  return (
    <section className={`${styles.section} ${layout.container}`}>
      <aside className={styles.aside}>
        <div className={styles.asideTitle}>
          <h2>Filters</h2>
          <span>Clear All Filters X</span>
        </div>
        <div className={styles.asideFilter}>
          <p>categories</p>
          <div className={styles.category}>
            {FILTER_CATEGORY.map((category, index) => (
              <span key={index}>
                <img src={category.img} alt={category.text} />
                {category.text}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.asideFilter}>
          <p>Topics</p>
          <div className={styles.topics}>
            {FILTER_TOPICS.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </div>
        <div className={styles.asideFilter}>
          <p>Instructor</p>
          <div className={styles.instructor}>
            {FILTER_INSTRUCTOR.map((lecturer, index) => (
              <span key={index}>
                <img src={lecturer.img} alt={lecturer.name} />
                {lecturer.name}
              </span>
            ))}
          </div>
        </div>
        <hr />
        <p className={styles.filetersActive}>0 Filters Active</p>
      </aside>
      <div className={styles.contentContainer}>
        <div className={styles.sort}>
          <p className={styles.totalPages}>
            Showing {cards?.length} out of {meta?.total}
          </p>
          <div
            className={styles.dropDown}
            onClick={() => setDropDown(!dropDown)}
          >
            <p>
              Sort By: <span>{sort}</span>
              <img src={"/icons/arrowDown.svg"} alt="arrow down" />
            </p>
            <ul style={dropDown ? { display: "block" } : { display: "none" }}>
              <li onClick={() => handleSort("newest")}>newest</li>
              <li onClick={() => handleSort("price_asc")}>price: ascending</li>
              <li onClick={() => handleSort("price_desc")}>
                price: descending
              </li>
              <li onClick={() => handleSort("popular")}>popular</li>
              <li onClick={() => handleSort("title_asc")}>title: A-Z</li>
            </ul>
          </div>
        </div>
        <CourseCards card={cards} />
      </div>
    </section>
  );
}

export default page;

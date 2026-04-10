"use client";
import React from "react";
import styles from "./CoursesContent.module.scss";
import layout from "@/app/layout.module.scss";
import CourseCards from "@/components/CoursesContent/CourseCards/CourseCards";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface CardsApi {
  data: Course[];
  meta: CardsMeta;
}
interface InstructorApi {
  data: Instructor[];
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

const FILTER_CATEGORY = [
  { text: "Development", img: "/icons/development.svg", id: "1" },
  { text: "Design", img: "/icons/design.svg", id: "2" },
  { text: "Business", img: "/icons/business.svg", id: "3" },
  { text: "Data Science", img: "/icons/data.svg", id: "4" },
  { text: "Marketing", img: "/icons/marketing.svg", id: "5" },
];
const FILTER_TOPICS = [
  { title: "React", id: "1" },
  { title: "Typescript", id: "2" },
  { title: "Phyton", id: "3" },
  { title: "UX/UI", id: "4" },
  { title: "Figma", id: "5" },
  { title: "JavaScript", id: "6" },
  { title: "Node.js", id: "7" },
  { title: "Machine Learning", id: "8" },
  { title: "Seo", id: "9" },
  { title: "Analytics", id: "10" },
];

export default function CoursesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort") || "newest";
  const page = Number(searchParams.get("page")) || 1;
  const selectedCategories = searchParams.getAll("categories[]");
  const selectedTopics = searchParams.getAll("topics[]");
  const selectedInstructors = searchParams.getAll("instructors[]");
  const activeFiltersCount =
    selectedCategories.length +
    selectedTopics.length +
    selectedInstructors.length;

  const [cards, setCards] = useState<Course[] | null>(null);
  const [meta, setMeta] = useState<CardsMeta | null>(null);
  const [dropDown, setDropDown] = useState(false);
  const [instructor, setInstructor] = useState<Instructor[] | null>(null);
  async function fetchCards() {
    try {
      const params = new URLSearchParams();
      params.set("sort", sort);
      params.set("page", String(page));
      selectedCategories.forEach((c) => params.append("categories[]", c));
      selectedTopics.forEach((t) => params.append("topics[]", t));
      selectedInstructors.forEach((I) => params.append("instructors[]", I));

      const res = await fetch(
        `https://api.redclass.redberryinternship.ge/api/courses?${params.toString()}`,
      );
      const result: CardsApi = await res.json();
      setCards(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchInstructors() {
    try {
      const res = await fetch(
        "https://api.redclass.redberryinternship.ge/api/instructors",
      );
      const result: InstructorApi = await res.json();
      setInstructor(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleSort(value: string) {
    router.push(`?sort=${value}&page=${page}`);
  }
  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const existing = params.getAll(key);

    if (existing.includes(value)) {
      params.delete(key);
      existing.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }
  useEffect(() => {
    fetchCards();
    fetchInstructors();
  }, [
    activeFiltersCount,
    sort,
    page,
    selectedCategories.join(","),
    selectedTopics.join(","),
    selectedInstructors.join(","),
  ]);

  return (
    <section className={`${styles.section} ${layout.container}`}>
      <aside className={styles.aside}>
        <div className={styles.asideTitle}>
          <h2>Filters</h2>
          <span onClick={() => router.push("/courses")}>
            Clear All Filters X
          </span>
        </div>
        <div className={styles.asideFilter}>
          <p>categories</p>
          <div className={styles.category}>
            {FILTER_CATEGORY.map((category, index) => (
              <span
                key={index}
                onClick={() => updateParams("categories[]", category.id)}
                className={
                  selectedCategories.includes(category.id)
                    ? `${styles.filterProp} ${styles.filterPropActive}`
                    : `${styles.filterProp}`
                }
              >
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
              <span
                key={topic.id}
                onClick={() => updateParams("topics[]", topic.id)}
                className={
                  selectedTopics.includes(topic.id)
                    ? `${styles.filterProp} ${styles.filterPropActive}`
                    : `${styles.filterProp}`
                }
              >
                {topic.title}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.asideFilter}>
          <p>Instructor</p>
          <div className={styles.instructor}>
            {instructor?.map((lecturer, index) => (
              <span
                key={index}
                onClick={() =>
                  updateParams("instructors[]", String(lecturer.id))
                }
                className={
                  selectedInstructors.includes(String(lecturer.id))
                    ? `${styles.filterProp} ${styles.filterPropActive}`
                    : `${styles.filterProp}`
                }
              >
                <img src={lecturer.avatar} alt={lecturer.name} />
                {lecturer.name}
              </span>
            ))}
          </div>
        </div>
        <hr />
        <p className={styles.filetersActive}>
          {activeFiltersCount} Filters Active
        </p>
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

"use client";
import CoursesContent from "@/components/CoursesContent/CoursesContent";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoursesContent />
    </Suspense>
  );
}

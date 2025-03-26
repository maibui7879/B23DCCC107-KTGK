import { useState } from "react";

export interface Course {
  id: string;
  name: string;
  learners: number;
  status: "Đang mở" | "Đã kết thúc" | "Tạm dừng";
  teacher: string;
}

export const useCourseModel = () => {
  const [Courses, setCourses] = useState<Course[]>(JSON.parse(localStorage.getItem("Courses") || "[]"));

  const saveCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem("Courses", JSON.stringify(newCourses));
  };

  return { Courses, setCourses: saveCourses };
};

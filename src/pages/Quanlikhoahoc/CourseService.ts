import { Course } from "./CourseModel";

export const getCourses = (): Course[] => JSON.parse(localStorage.getItem("Courses") || "[]");

export const saveCourses = (Courses: Course[]) => {
  localStorage.setItem("Courses", JSON.stringify(Courses));
};

import { Teacher } from "./TeacherModel";

export const getTeachers = (): Teacher[] => JSON.parse(localStorage.getItem("Teachers") || "[]");

export const saveTeachers = (Teachers: Teacher[]) => {
  localStorage.setItem("Teachers", JSON.stringify(Teachers));
};

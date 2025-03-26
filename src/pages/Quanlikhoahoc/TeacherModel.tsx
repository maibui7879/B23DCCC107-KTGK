import { useState } from "react";

export interface Teacher {
  id: string;
  name: string;
  age: number;
  sex: "Nam" | "Nữ" | "Why are you gay?";
  contact: string;
}

export const useTeacherModel = () => {
  const [Teachers, setTeachers] = useState<Teacher[]>(JSON.parse(localStorage.getItem("Teachers") || "[]"));

  const saveTeachers = (newTeachers: Teacher[]) => {
    setTeachers(newTeachers);
    localStorage.setItem("Teachers", JSON.stringify(newTeachers));
  };

  return { Teachers, setTeachers: saveTeachers };
};

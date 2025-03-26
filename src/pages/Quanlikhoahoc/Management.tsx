import { useState } from "react";
import { Button } from "antd";
import { ReadOutlined, TeamOutlined } from "@ant-design/icons";
import TeacherList from "./TeacherList";
import CourseList from "./CourseList";

const Management = () => {
  const [view, setView] = useState<"teachers" | "courses">("courses");

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "40px"}}>{view === "teachers" ? " Danh sách Giảng viên" : " Danh sách Khóa học"} </h1>
        <Button type="default" onClick={() => setView(view === "teachers" ? "courses" : "teachers")}>
          {view === "teachers" ? <ReadOutlined /> : <TeamOutlined />}
          {view === "teachers" ? " Xem danh sách khóa học" : " Xem danh sách giảng viên"}
        </Button>
      </div>
      {view === "teachers" ? <TeacherList /> : <CourseList />}
    </div>
  );
};

export default Management;

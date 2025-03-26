import { useState } from "react";
import { Button } from "antd";
import { ReadOutlined, TeamOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import TeacherList from "./TeacherList";
import CourseList from "./CourseList";

const Management = () => {
  const [view, setView] = useState<"teachers" | "courses">("courses");

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "40px" }}>
          {view === "teachers" ? " Danh sách Giảng viên" : " Danh sách Khóa học"}
        </h1>
        <Button type="default" onClick={() => setView(view === "teachers" ? "courses" : "teachers")}>
          {view === "teachers" ? <ReadOutlined /> : <TeamOutlined />}
          {view === "teachers" ? " Xem danh sách khóa học" : " Xem danh sách giảng viên"}
        </Button>
      </div>
      <motion.div
        key={view}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {view === "teachers" ? <TeacherList /> : <CourseList />}
      </motion.div>
    </div>
  );
};

export default Management;

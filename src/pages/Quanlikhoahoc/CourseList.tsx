import { useState } from "react";
import { Button, message } from "antd";
import CourseTable from "./CourseTable";
import CourseFormModal from "./CourseFormModal";
import { useCourseModel } from "./CourseModel";

const CourseList = () => {
  const { Courses, setCourses } = useCourseModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleSave = (Course) => {
    const updatedCourses = editingCourse
      ? Courses.map((r) => (r.id === Course.id ? Course : r))
      : [...Courses, Course];

    setCourses(updatedCourses);
    setModalVisible(false);
    message.success(editingCourse ? "Đã cập nhật khóa học!" : "Đã thêm khóa học!");
  };

  const handleDelete = (id) => {
    setCourses(Courses.filter((Course) => Course.id !== id));
    message.success("Đã xóa khóa học!");
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>Thêm khóa học</Button>
      <CourseTable Courses={Courses} onEdit={(Course) => { setEditingCourse(Course); setModalVisible(true); }} onDelete={handleDelete} />
      <CourseFormModal visible={modalVisible} onClose={() => { setModalVisible(false); setEditingCourse(null); }} onSave={handleSave} editingCourse={editingCourse} />
    </div>
  );
};

export default CourseList;

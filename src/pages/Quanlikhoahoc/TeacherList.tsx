import { useState } from "react";
import { Button, message } from "antd";
import TeacherTable from "./TeacherTable";
import TeacherFormModal from "./TeacherFormModal";
import { useTeacherModel } from "./TeacherModel";

const TeacherList = () => {
  const { Teachers, setTeachers } = useTeacherModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleSave = (Teacher) => {
    if (!editingTeacher && Teachers.some((r) => r.name === Teacher.name)) {
      message.error("Tên khóa học đã tồn tại!");
      return;
    }

    const updatedTeachers = editingTeacher
      ? Teachers.map((r) => (r.id === Teacher.id ? Teacher : r))
      : [...Teachers, Teacher];

    setTeachers(updatedTeachers);
    setModalVisible(false);
    message.success(editingTeacher ? "Đã cập nhật khóa học!" : "Đã thêm khóa học!");
  };

  const handleDelete = (id) => {
    setTeachers(Teachers.filter((Teacher) => Teacher.id !== id));
    message.success("Đã xóa khóa học!");
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>Thêm giảng viên</Button>
      <TeacherTable Teachers={Teachers} onEdit={(Teacher) => { setEditingTeacher(Teacher); setModalVisible(true); }} onDelete={handleDelete} />
      <TeacherFormModal visible={modalVisible} onClose={() => { setModalVisible(false); setEditingTeacher(null); }} onSave={handleSave} editingTeacher={editingTeacher} />
    </div>
  );
};

export default TeacherList;

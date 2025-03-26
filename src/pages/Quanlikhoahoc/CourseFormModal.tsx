import { useState, useEffect } from "react";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Course } from "./CourseModel";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
  editingCourse?: Course | null;
}

const CourseFormModal: React.FC<Props> = ({ visible, onClose, onSave, editingCourse }) => {
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const storedTeachers = JSON.parse(localStorage.getItem("Teachers") || "[]");
    setTeachers(storedTeachers);
  }, []);

  useEffect(() => {
    form.setFieldsValue(editingCourse || { name: "", learners: 0, status: "Đang mở", teacher: "" });
  }, [editingCourse, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const courseData = { ...values, id: editingCourse?.id || uuidv4() };
      onSave(courseData);
      onClose();
      form.resetFields();
    });
  };

  return (
    <Modal visible={visible} title={editingCourse ? "Sửa khóa học" : "Thêm khóa học"} onCancel={onClose} onOk={handleSubmit}>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Tên khóa học" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="learners" label="Số học viên">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="status" label="Trạng thái">
          <Select>
            <Select.Option value="Đang mở">Đang mở</Select.Option>
            <Select.Option value="Đã kết thúc">Đã kết thúc</Select.Option>
            <Select.Option value="Tạm dừng">Tạm dừng</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="teacher" label="Giảng viên" rules={[{ required: true, message: "Vui lòng chọn giảng viên" }]}>
          <Select>
            {teachers.map((t) => (
              <Select.Option key={t.id} value={t.name}>
                {t.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseFormModal;

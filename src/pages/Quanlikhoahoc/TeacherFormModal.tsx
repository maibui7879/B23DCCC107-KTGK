import { Modal, Form, Input, Select, InputNumber } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Teacher } from "./TeacherModel";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (teacher: Teacher) => void;
  editingTeacher?: Teacher;
}

const TeacherFormModal: React.FC<Props> = ({ visible, onClose, onSave, editingTeacher }) => {
  const [form] = Form.useForm();

  return (
    <Modal visible={visible} title={editingTeacher ? "Chỉnh sửa thông tin" : "Thêm giảng viên"} onCancel={onClose} onOk={() => form.submit()}>
      <Form form={form} layout="vertical" initialValues={editingTeacher} onFinish={(values) => onSave({ ...values, id: editingTeacher?.id || uuidv4() })}>
        <Form.Item name="name" label="Tên giảng viên" rules={[{ required: true, max: 50 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Tuổi" rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="sex" label="Giới tính" rules={[{ required: true }]}>
          <Select options={[{ value: "Nam" }, { value: "Nữ" }, { value: "Why are you gae?" }]} />
        </Form.Item>
        <Form.Item name="contact" label="Số điện thoại" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeacherFormModal;

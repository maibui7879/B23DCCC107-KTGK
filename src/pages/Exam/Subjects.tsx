import { Button, Form, Input, InputNumber, Table, Modal } from 'antd';
import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorageExam';

export interface Subject {
  id: string;
  code: string;
  name: string;
  credit: number;
  knowledgeArea: string;
}

const Subjects = () => {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', []);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const handleAddOrUpdateSubject = (values: Omit<Subject, 'id'>) => {
    if (editingSubject) {
      setSubjects(subjects.map(sub => sub.id === editingSubject.id ? { ...editingSubject, ...values } : sub));
    } else {
      const newSubject = { ...values, id: Date.now().toString() };
      setSubjects([...subjects, newSubject]);
    }
    form.resetFields();
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  return (
    <div>
      <h2>Quản Lý Môn học</h2>
      <Button type="primary" onClick={() => { setEditingSubject(null); setIsModalOpen(true); }}>Thêm môn học</Button>

      <Modal
        visible={isModalOpen}
        onCancel={() => { setIsModalOpen(false); setEditingSubject(null); }}
        footer={null}
        centered
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        style={{ zIndex: 1050 }}
        destroyOnClose
      >
        <h3 style={{ textAlign: 'center' }}>{editingSubject ? "Chỉnh Sửa Môn Học" : "Thêm Môn Học"}</h3>
        <Form 
          form={form} 
          onFinish={handleAddOrUpdateSubject} 
          layout="vertical" 
          initialValues={editingSubject || {}}
        >
          <b>Mã môn học:</b>
          <Form.Item name="code" rules={[{ required: true, message: 'Nhập mã môn học' }]}>
            <Input placeholder="Mã môn học" />
          </Form.Item>
          <b>Tên môn học:</b>
          <Form.Item name="name" rules={[{ required: true, message: 'Nhập tên môn học' }]}>
            <Input placeholder="Tên môn học" />
          </Form.Item>
          <b>Số tín chỉ:</b>
          <Form.Item name="credit" rules={[{ required: true, type: 'number', min: 1, max: 10, message: 'Nhập số tín chỉ từ 1-10' }]}>
            <InputNumber placeholder="Tín chỉ" min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>
          <b>Khối kiến thức:</b>
          <Form.Item name="knowledgeArea">
            <Input placeholder="Khối kiến thức" />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button type="primary" htmlType="submit">{editingSubject ? "Lưu" : "Thêm"}</Button>
          </div>
        </Form>
      </Modal>

      <Table
        dataSource={subjects}
        pagination={{ position: ["bottomCenter"] }}
        columns={[
          { title: 'ID', dataIndex: 'id', align: 'center' },
          { title: 'Mã môn', dataIndex: 'code', align: 'center' },
          { title: 'Tên môn', dataIndex: 'name', align: 'center' },
          { title: 'Tín chỉ', dataIndex: 'credit', align: 'center' },
          { title: 'Khối kiến thức', dataIndex: 'knowledgeArea', align: 'center' },
        ]}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            setEditingSubject(record);
            form.setFieldsValue(record);
            setIsModalOpen(true);
          },
        })}
      />
    </div>
  );
};

export default Subjects;

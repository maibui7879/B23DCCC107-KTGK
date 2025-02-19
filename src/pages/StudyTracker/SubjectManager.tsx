import React, { useState } from "react";
import { Button, Table, Modal, Input, Form } from "antd";
import { Subject, useLocalStorage } from "../../hooks/useLocalStorageStudy";

function SubjectManager() {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>("subjects", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingSubject(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    form.setFieldsValue(subject);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };    const handleSubmit = () => {
        form.validateFields().then((values) => {
        const newSubjects = editingSubject
            ? subjects.map((s) => (s.id === editingSubject.id ? { ...s, ...values } : s))
            : [...subjects, { id: Date.now().toString(), ...values }];

        setSubjects(newSubjects);
        setIsModalOpen(false);
        });
    };

  const handleGoToSubject = (id: string) => {
    window.location.href = `/quan-ly-mon-hoc/${id}`;
  };

  return (
    <>
      <Button type="primary" onClick={handleAdd}>Thêm Môn Học</Button>
      <Table
        dataSource={subjects}
        rowKey="id"
        columns={[
          {
            title: "Tên môn học",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
              <Button type="link" onClick={() => handleGoToSubject(record.id)}>
                {text}
              </Button>
            ),
          },
          {
            title: "Hành động",
            render: (_, record) => (
              <>
                <Button onClick={() => handleEdit(record)}>Sửa</Button>
                <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
              </>
            ),
          },
        ]}
      />
      <Modal
        title={editingSubject ? "Sửa Môn Học" : "Thêm Môn Học"}
        visible={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên môn học" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default SubjectManager;


import React, { useState } from "react";
import { Button, Table, Modal, Input, Form } from "antd";import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
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
  };    
  const handleSubmit = () => {
    form.validateFields().then((values) => {
     
      const isDuplicate = subjects.some(
        (s) => s.name.trim().toLowerCase() === values.name.trim().toLowerCase() && s.id !== editingSubject?.id
      );
  
      if (isDuplicate) {
        Modal.error({
          title: "Lỗi",
          content: "Tên môn học đã tồn tại!",
        });
        return; 
      }
  
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
      <h1>Quản lí môn học</h1>
      <Table
        dataSource={subjects}
        rowKey="id"
        pagination={{ position: ["bottomCenter"] }}
        onRow={(record) => ({
            onClick: () => handleGoToSubject(record.id) 
          })}
        columns={[
          {
            title: "STT",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (_, __, index) => index + 1,
          },
          {
            title: "Tên môn học",
            dataIndex: "name",
            key: "name",
            align: "center",
            render: (text, record) => (
              <Button type="link" onClick={() => handleGoToSubject(record.id)}>
                {text}
              </Button>
            ),
          },
          {
            title: "Hành động",
            key: "actions",
            align: "center",
            render: (_, record) => (
              <>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
                <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
              </>
            ),
          },
        ]}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>Thêm Môn Học</Button>
      </div>
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


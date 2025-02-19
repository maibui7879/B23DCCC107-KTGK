import React, { useState ,useEffect} from "react";import { useParams } from "react-router-dom";
import { Table, Button, Modal, Input, Form } from "antd";
import { StudySession, Subject, useLocalStorage } from "../../hooks/useLocalStorageStudy";


function StudyProgress() {
    const { id: subjectId } = useParams<{ id: string }>(); // Lấy subjectId từ URL
    const [subjects] = useLocalStorage<Subject[]>("subjects", []); // Lấy danh sách môn học từ localStorage
    const [sessions, setSessions] = useLocalStorage<StudySession[]>("studySessions", []);
    const [subjectName, setSubjectName] = useState<string>("");
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<StudySession | null>(null);
    const [form] = Form.useForm();
  
    // Tìm tên môn học theo subjectId trong localStorage
    useEffect(() => {
      const foundSubject = subjects.find((s) => s.id === subjectId);
      setSubjectName(foundSubject ? foundSubject.name : "Không tìm thấy môn học");
    }, [subjectId, subjects]);
  
    const handleAdd = () => {
      setEditingSession(null);
      form.resetFields();
      setIsModalOpen(true);
    };
  
    const handleDelete = (id: string) => {
      setSessions(sessions.filter((s) => s.id !== id));
    };
  
    const handleSubmit = () => {
      form.validateFields().then((values) => {
        const newSessions = editingSession
          ? sessions.map((s) => (s.id === editingSession.id ? { ...s, ...values } : s))
          : [...sessions, { id: Date.now().toString(), subjectId, ...values }];
  
        setSessions(newSessions);
        setIsModalOpen(false);
      });
    };
  
    return (
      <>
        <h2>Lịch học môn- {subjectName}</h2> {/* Hiển thị tên môn học từ localStorage */}
        <Button type="primary" onClick={handleAdd}>Thêm Lịch Học</Button>
        <Table
          dataSource={sessions.filter((s) => s.subjectId === subjectId)} // Lọc theo subjectId
          columns={[
            { title: "Ngày học", dataIndex: "date", key: "date" },
            { title: "Thời lượng (giờ)", dataIndex: "duration", key: "duration" },
            {
              title: "Hành động",
              render: (_, record) => (
                <>
                  <Button onClick={() => setEditingSession(record)}>Sửa</Button>
                  <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                </>
              ),
            },
          ]}
        />
        <Modal title="Lịch học môn"  visible={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)}>
          <Form form={form} layout="vertical">
            <Form.Item name="date" label="Ngày học" rules={[{ required: true }]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item name="duration" label="Thời lượng (giờ)" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
  
  export default StudyProgress;

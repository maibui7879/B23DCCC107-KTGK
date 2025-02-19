import React, { useState } from "react";
import { Button, Table, Modal, Input, Form, Select, Progress } from "antd";
import { useLocalStorage, Subject, StudyGoal } from "../../hooks/useLocalStorageStudy";

function StudyGoals() {
  const [goals, setGoals] = useLocalStorage<StudyGoal[]>("studyGoals", []);
  const [subjects] = useLocalStorage<Subject[]>("subjects", []); // Lấy danh sách môn học từ localStorage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingGoal(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (goal: StudyGoal) => {
    setEditingGoal(goal);
    form.setFieldsValue(goal);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { month, subjectId, targetHours } = values;
  
      const existingGoalIndex = goals.findIndex(
        (g) => g.month === month && g.subjectId === subjectId
      );
  
      let newGoals;
      if (existingGoalIndex !== -1) {
        newGoals = [...goals];
        newGoals[existingGoalIndex] = {
          ...newGoals[existingGoalIndex],
          targetHours,
        };
      } else {
        // Nếu không trùng, thêm mục tiêu mới
        newGoals = [
          ...goals,
          { id: Date.now().toString(), completedHours: 0, ...values },
        ];
      }
  
      setGoals(newGoals);
      setIsModalOpen(false);
    });
  };
  

  return (
    <>
      <Button type="primary" onClick={handleAdd}>Đặt Mục Tiêu Học Tập</Button>
      <Table
        dataSource={goals}
        columns={[
          { title: "Tháng", dataIndex: "month", key: "month" },
          { 
            title: "Môn học", 
            dataIndex: "subjectId", 
            key: "subjectId",
            render: (subjectId: string) => {
              const subject = subjects.find((s) => s.id === subjectId);
              return subject ? subject.name : "Không xác định";
            }
          },
          { title: "Mục tiêu (giờ)", dataIndex: "targetHours", key: "targetHours" },
          {
            title: "Tiến độ",
            render: (_, record) => (
              <Progress 
                percent={(record.completedHours / record.targetHours) * 100} 
                status={record.completedHours >= record.targetHours ? "success" : "active"} 
              />
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
      <Modal title={editingGoal ? "Sửa Mục Tiêu" : "Thêm Mục Tiêu"} visible={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="month" label="Tháng" rules={[{ required: true }]}>
            <Input type="month" />
          </Form.Item>
          <Form.Item name="subjectId" label="Môn học" rules={[{ required: true }]}>
            <Select 
              options={subjects.map((subject) => ({ label: subject.name, value: subject.id }))} 
            />
          </Form.Item>
          <Form.Item name="targetHours" label="Mục tiêu (giờ)" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default StudyGoals;

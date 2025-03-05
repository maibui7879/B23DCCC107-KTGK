import { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import { useLocalStorage } from '../../hooks/useLocalStorageExam';
import { Subject } from './Subjects';

export interface Question {
	id: string;
	subject: string;
	content: string;
	level: string;
}

const difficultyLevels = ['Dễ', 'Trung bình', 'Khó', 'Rất khó'];

const Questions = () => {
    const [questions, setQuestions] = useLocalStorage<Question[]>('questions', []);
    const [subjects] = useLocalStorage<Subject[]>('subjects', []);
    const [form] = Form.useForm();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(questions);
  
    useEffect(() => {
        const timeout = setTimeout(() => {
          const result = questions.filter(q => {
            const subjectName = subjects.find(sub => sub.id === q.subject)?.name || ''; 
            return subjectName.toLowerCase().includes(searchTerm.toLowerCase());
          });
          setFilteredQuestions(result);
        }, 300);
      
        return () => clearTimeout(timeout);
      }, [searchTerm, questions, subjects]);
      const handleAddQuestion = (values: Omit<Question, 'id'>) => {
        const newQuestion = { ...values, id: Date.now().toString() };
        setQuestions([...questions, newQuestion]);
        form.resetFields();
      };
    
    return (
      <div>
        <h2>Quản lý Câu hỏi</h2>
        
        <Input 
          placeholder="Tìm kiếm câu hỏi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16 }}
        />
  
        <Form form={form} onFinish={handleAddQuestion} layout="inline">
          <Form.Item name="subjectId" rules={[{ required: true, message: 'Chọn môn học' }]}>
            <Select placeholder="Môn học">
              {subjects.map(sub => <Select.Option key={sub.id} value={sub.id}>{sub.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="content" rules={[{ required: true, message: 'Nhập nội dung câu hỏi' }]}>
            <Input placeholder="Nội dung câu hỏi" />
          </Form.Item>
          <Form.Item name="level" rules={[{ required: true, message: 'Chọn mức độ khó' }]}>
            <Select placeholder="Mức độ khó">
              {difficultyLevels.map(level => <Select.Option key={level} value={level}>{level}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="content-subject" rules={[{ required: true, message: 'Kiến thức theo môn' }]}>
            <Input placeholder="Kiến thức theo môn" />
          </Form.Item>
          <Button type="primary" htmlType="submit">Thêm</Button>
        </Form>
  
        <Table
          dataSource={filteredQuestions}
          pagination={{ position: ["bottomCenter"] }}
          columns={[
            { title: 'Môn học', dataIndex: 'subjectId', render: id => subjects.find(sub => sub.id === id)?.name || '---' ,align: 'center',},
            { title: 'Nội dung', dataIndex: 'content' ,align: 'center',},
            { title: 'Kiến thức theo môn', dataIndex: 'content-subject',align: 'center', },
            { title: 'Độ khó', dataIndex: 'level',align: 'center', },
          ]}
          rowKey="id"
        />
      </div>
    );
  };
  
  export default Questions;
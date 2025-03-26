import { useState } from 'react';
import { Button, Form, Input, Select, Table, Modal } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useLocalStorage } from '../../hooks/useLocalStorageExam';
import { Subject } from './Subjects';

export interface Question {
	id: string;
	subjectId: string;
	subjectCode: string;
	content: string;
	level: string;
	contentSubject: string;
}

const difficultyLevels = ['Dễ', 'Trung bình', 'Khó', 'Rất khó'];

const Questions = () => {
    const [questions, setQuestions] = useLocalStorage<Question[]>('questions', []);
    const [subjects] = useLocalStorage<Subject[]>('subjects', []);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(questions);
    const [searchForm] = Form.useForm();

    const handleSearch = (values: { subjectId?: string; level?: string; contentSubject?: string }) => {
        const { subjectId, level, contentSubject } = values;
        const result = questions.filter(q => 
            (!subjectId || q.subjectId === subjectId) &&
            (!level || q.level === level) &&
            (!contentSubject || q.contentSubject.includes(contentSubject))
        );
        setFilteredQuestions(result);
    };

    const handleAddQuestion = (values: Omit<Question, 'id'>) => {
      const newQuestion = { ...values, id: Date.now().toString() };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions);
      form.resetFields();
      setIsModalVisible(false);
  };

    return (
      <div>
        <h2>Quản lý Câu hỏi</h2>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <Button type="primary" onClick={() => setIsModalVisible(true)} style={{marginRight:'10px'}}>Thêm câu hỏi</Button>
          
          <Button onClick={() => setShowFilters(prev => !prev)}>
            <FilterOutlined /> {showFilters ? '<' : '>'} Lọc câu hỏi
          </Button>
        </div>

        {showFilters && (
          <Form form={searchForm} onFinish={handleSearch} layout="inline" style={{ marginTop: 16 }}>
            <Form.Item name="subjectId">
              <Select placeholder="Môn học" allowClear>
                {subjects.map(sub => <Select.Option key={sub.id} value={sub.id}>{sub.name}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="level">
              <Select placeholder="Mức độ khó" allowClear>
                {difficultyLevels.map(level => <Select.Option key={level} value={level}>{level}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="contentSubject">
              <Input placeholder="Kiến thức theo môn" allowClear />
            </Form.Item>
            <Button type="primary" htmlType="submit">Tìm kiếm</Button>
          </Form>
        )}

        <Modal title="Thêm Câu Hỏi" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
          <Form form={form} onFinish={handleAddQuestion} layout="vertical">
            <b>Môn học:</b>
            <Form.Item name="subjectId" rules={[{ required: true, message: 'Chọn môn học' }]}> 
              <Select placeholder="Môn học">
                {subjects.map(sub => <Select.Option key={sub.id} value={sub.id}>{sub.name}</Select.Option>)}
              </Select>
            </Form.Item>
            <b>Mã câu hỏi:</b>
            <Form.Item name="subjectCode" rules={[{ required: true, message: 'Nhập mã môn' }]}> 
              <Input placeholder="Mã câu hỏi" />
            </Form.Item>
            <b>Nội dung câu hỏi:</b>
            <Form.Item name="content" rules={[{ required: true, message: 'Nhập nội dung câu hỏi' }]}> 
              <Input placeholder="Nội dung câu hỏi" />
            </Form.Item>
            <b>Mức độ khó:</b>
            <Form.Item name="level" rules={[{ required: true, message: 'Chọn mức độ khó' }]}> 
              <Select placeholder="Mức độ khó">
                {difficultyLevels.map(level => <Select.Option key={level} value={level}>{level}</Select.Option>)}
              </Select>
            </Form.Item>
            <b>Kiến thức theo môn:</b>
            <Form.Item name="contentSubject" rules={[{ required: true, message: 'Nhập kiến thức theo môn' }]}> 
              <Input placeholder="Kiến thức theo môn" />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">Thêm</Button>
            </div>
          </Form>
        </Modal>

        <Table
          dataSource={filteredQuestions}
          pagination={{ position: ["bottomCenter"] }}
          columns={[
            { title: 'Môn học', dataIndex: 'subjectId', render: id => subjects.find(sub => sub.id === id)?.name || '---', align: 'center' },
            { title: 'Mã câu hỏi', dataIndex: 'subjectCode', align: 'center' },
            { title: 'Nội dung', dataIndex: 'content', align: 'center' },
            { title: 'Kiến thức theo môn', dataIndex: 'contentSubject', align: 'center' },
            { title: 'Độ khó', dataIndex: 'level', align: 'center' },
          ]}
          rowKey="id"
        />
      </div>
    );
  };
  
  export default Questions;

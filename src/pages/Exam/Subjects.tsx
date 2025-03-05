
import { Button, Form, Input, InputNumber, Table } from 'antd';
import { useLocalStorage } from '../../hooks/useLocalStorageExam';

export interface Subject {
	id: string;
	name: string;
	credit: number;
	knowledgeArea: string;
}

const Subjects = () => {
    const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', []);
    const [form] = Form.useForm();
  
    const handleAddSubject = (values: Omit<Subject, 'id'>) => {
      const newSubject = { ...values, id: Date.now().toString() };
      setSubjects([...subjects, newSubject]);
      form.resetFields();
    };
  
    return (
      <div>
        <h2>Quản lý Môn học</h2>
        <Form form={form} onFinish={handleAddSubject} layout="inline">
        <Form.Item name="ID" rules={[{ required: true, message: 'Nhập mã môn' }]}>
            <Input placeholder="Mã môn học" />
          </Form.Item>
          <Form.Item name="name" rules={[{ required: true, message: 'Nhập tên môn học' }]}>
            <Input placeholder="Tên môn học" />
          </Form.Item>
          <Form.Item name="credit" rules={[{ required: true, type: 'number', min: 1, max: 10, message: 'Nhập số tín chỉ từ 1-10' }]}>
            <InputNumber placeholder="Tín chỉ" min={1} max={10} defaultValue={1}/>
          </Form.Item>
          <Form.Item name="knowledgeArea">
            <Input placeholder="Khối kiến thức" />
          </Form.Item>
          <Button type="primary" htmlType="submit">Thêm</Button>
        </Form>
  
        <Table
          dataSource={subjects}
          pagination={{ position: ["bottomCenter"] }}
          columns={[
            { title: 'Mã môn', dataIndex: 'ID' ,align: 'center',},
            { title: 'Tên môn', dataIndex: 'name' ,align: 'center',},
            { title: 'Tín chỉ', dataIndex: 'credit' ,align: 'center',},
            { title: 'Khối kiến thức', dataIndex: 'knowledgeArea' ,align: 'center',},
          ]}
          rowKey="id"
        />
      </div>
    );
  };
  
  export default Subjects;
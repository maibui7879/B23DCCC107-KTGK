import { Button, Select, Table } from 'antd';
import { useLocalStorage } from '../../hooks/useLocalStorageExam';
import { Subject } from './Subjects';
import { Question } from './Questions';

export interface Exam {
    id: string;
    subjectId: string;
    questions: Question[];
  }
const ExamComponent = () => {
    const [questions] = useLocalStorage<Question[]>('questions', []);
    const [subjects] = useLocalStorage<Subject[]>('subjects', []);
    const [exam, setExam] = useLocalStorage<Exam[]>('exams', []);
  
    const generateExam = (subjectId: string) => {
      const filteredQuestions = questions.filter(q => q.subject === subjectId);
      const selectedQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
      
      setExam([...exam, { id: Date.now().toString(), subjectId, questions: selectedQuestions }]);
    };
  
    return (
      <div>
        <h2>Tạo Đề Thi</h2>
        <Select placeholder="Chọn môn học" onChange={generateExam}>
          {subjects.map(sub => <Select.Option key={sub.id} value={sub.id}>{sub.name}</Select.Option>)}
        </Select>
  
        <Table
          dataSource={exam}
          columns={[
            { title: 'Môn học', dataIndex: 'subjectId', render: id => subjects.find(sub => sub.id === id)?.name || '---' },
            { title: 'Số câu hỏi', dataIndex: 'questions', render: qs => qs.length },
          ]}
          rowKey="id"
        />
      </div>
    );
  };
  
  export default ExamComponent;

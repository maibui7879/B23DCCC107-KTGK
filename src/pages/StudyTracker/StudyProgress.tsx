import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Modal, Input, Form } from 'antd';
import { StudySession, Subject, useLocalStorage } from '../../hooks/useLocalStorageStudy';

function StudyProgress() {
	const { id: subjectId } = useParams<{ id: string }>();
	const [subjects] = useLocalStorage<Subject[]>('subjects', []);
	const [sessions, setSessions] = useLocalStorage<StudySession[]>('studySessions', []);
	const [subjectName, setSubjectName] = useState<string>('');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingSession, setEditingSession] = useState<StudySession | null>(null);
	const [form] = Form.useForm();

	useEffect(() => {
		const foundSubject = subjects.find((s) => s.id === subjectId);
		setSubjectName(foundSubject ? foundSubject.name : 'Không tìm thấy môn học');
	}, [subjectId, subjects]);

	const handleAdd = () => {
		setEditingSession(null);
		form.resetFields();
		setIsModalOpen(true);
	};

	const handleEdit = (session: StudySession) => {
		setEditingSession(session);
		form.setFieldsValue(session);
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
      
	const handleGoToReturn = () => {
		window.location.href = `/quan-ly-mon-hoc`;
	};

	return (
		<>
			<Button onClick={handleGoToReturn}>⬅ Quay lại</Button>
			<h2>Lịch học môn: {subjectName}</h2>
			<Button type='primary' onClick={handleAdd}>
				Thêm Lịch Học
			</Button>
			<Table
				dataSource={sessions.filter((s) => s.subjectId === subjectId)}
				rowKey='id'
				columns={[
					{ title: 'Ngày học', dataIndex: 'date', key: 'date' },
					{ title: 'Thời lượng (giờ)', dataIndex: 'duration', key: 'duration' },
					{ title: 'Nội dung học', dataIndex: 'content', key: 'content' }, // Thêm nội dung học
					{ title: 'Ghi chú', dataIndex: 'note', key: 'note' }, // Thêm ghi chú
					{
						title: 'Hành động',
						key: 'actions',
						render: (_, record) => (
							<>
								<Button onClick={() => handleEdit(record)}>Sửa</Button>
								<Button danger onClick={() => handleDelete(record.id)}>
									Xóa
								</Button>
							</>
						),
					},
				]}
			/>
			<Modal
				title={editingSession ? 'Sửa Lịch Học' : 'Thêm Lịch Học'}
				visible={isModalOpen}
				onOk={handleSubmit}
				onCancel={() => setIsModalOpen(false)}
			>
				<Form form={form} layout='vertical'>
					<Form.Item name='date' label='Ngày học' rules={[{ required: true }]}>
						<Input type='date' />
					</Form.Item>
					<Form.Item name='duration' label='Thời lượng (giờ)' rules={[{ required: true }]}>
						<Input type='number' />
					</Form.Item>
					<Form.Item name='content' label='Nội dung học' rules={[{ required: true }]}>
						<Input.TextArea placeholder='Nhập nội dung buổi học...' />
					</Form.Item>
					<Form.Item name='note' label='Ghi chú'>
						<Input.TextArea placeholder='Nhập ghi chú (nếu có)...' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default StudyProgress;

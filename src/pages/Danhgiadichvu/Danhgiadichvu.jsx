import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Rate, message } from 'antd';

const Danhgiadichvu = () => {
    const [reviews, setReviews] = useState([
        { id: 1, customer: 'Nguyễn Văn A', service: 'Cắt tóc', employee: 'Thợ A', rating: 5, comment: 'Rất tốt!' },
        { id: 2, customer: 'Trần Thị B', service: 'Spa', employee: 'Thợ B', rating: 4, comment: 'Dịch vụ ổn.' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [form] = Form.useForm();

    // Mở modal đánh giá
    const showReviewModal = (record) => {
        setSelectedService(record);
        setIsModalOpen(true);
        form.setFieldsValue({ rating: 5, comment: '' });
    };

    // Xử lý đóng modal
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    // Lưu đánh giá mới
    const handleReview = (values) => {
        const newReview = {
            id: reviews.length + 1,
            customer: 'Bạn',
            service: selectedService.service,
            employee: selectedService.employee,
            rating: values.rating,
            comment: values.comment,
        };

        setReviews([...reviews, newReview]);
        message.success('Cảm ơn bạn đã đánh giá!');
        setIsModalOpen(false);
        form.resetFields();
    };

    const columns = [
        { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
        { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
        { title: 'Nhân viên', dataIndex: 'employee', key: 'employee' },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => <Rate disabled defaultValue={rating} />,
        },
        { title: 'Nhận xét', dataIndex: 'comment', key: 'comment' },
        {
            title: 'Hành động',
            render: (text, record) => (
                <Button type="primary" onClick={() => showReviewModal(record)}>Đánh giá</Button>
            ),
        },
    ];

    return (
        <div>
            <h2>Đánh giá dịch vụ</h2>
            <Table dataSource={reviews} columns={columns} rowKey="id" />

            <Modal title="Đánh giá dịch vụ" visible={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleReview}>
                    <Form.Item label="Đánh giá" name="rating" rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}>
                        <Rate />
                    </Form.Item>
                    <Form.Item label="Nhận xét" name="comment">
                        <Input.TextArea rows={3} placeholder="Nhập nhận xét của bạn" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Gửi đánh giá</Button>
                        <Button onClick={handleCancel} style={{ marginLeft: 8 }}>Hủy</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Danhgiadichvu;

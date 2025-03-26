import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, TimePicker, message } from 'antd';
import useLocalStorage from '../../hooks/useLocalStorage';
import dayjs from 'dayjs';

const { Option } = Select;
const format = "HH:mm";

const QuanlyNhanvien = () => {
    const [employees, setEmployees] = useLocalStorage('employees', []);
    const [services, setServices] = useLocalStorage('services', []);
    
    // Nhân viên
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [isEditEmployee, setIsEditEmployee] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employeeForm] = Form.useForm();

    // Dịch vụ
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isEditService, setIsEditService] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [serviceForm] = Form.useForm();
    // Danh sách ngày trong tuần
    const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];


    // Thêm/Sửa nhân viên
    const showEmployeeModal = (record = null) => {
        setIsEditEmployee(!!record);
        setSelectedEmployee(record);
        setIsEmployeeModalOpen(true);
        employeeForm.resetFields();
    
        if (record) {
            const workingHours = record.workSchedule
                ? Object.entries(record.workSchedule).map(([day, time]) => {
                    const timeParts = time.split('-');
                    if (timeParts.length !== 2) return null;
                    return {
                        day,
                        time: [dayjs(timeParts[0], format), dayjs(timeParts[1], format)]
                    };
                }).filter(item => item !== null)
                : [];
    
            employeeForm.setFieldsValue({
                ...record,
                workingHours
            });
        }
    };
    
    

    // Thêm/Sửa dịch vụ
    const showServiceModal = (record = null) => {
        setIsEditService(!!record);
        setSelectedService(record);
        setIsServiceModalOpen(true);
        serviceForm.resetFields();
        
        if (record) {
            serviceForm.setFieldsValue(record);
        }
    };

    // Đóng modal
    const handleCancel = () => {
        setIsEmployeeModalOpen(false);
        setIsServiceModalOpen(false);
    };

    // Lưu nhân viên
    const handleSaveEmployee = (values) => {
        const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
    
        const updatedEmployee = {
            id: isEditEmployee ? selectedEmployee.id : newId,
            name: values.name,
            position: values.position,
            maxCustomersPerDay: Number(values.maxCustomersPerDay),
            servedCustomers: isEditEmployee ? selectedEmployee.servedCustomers : 0,
            workSchedule: values.workingHours.reduce((acc, { day, time }) => {
                if (day && time?.length === 2) {
                    acc[day] = `${time[0].format(format)}-${time[1].format(format)}`;
                }
                return acc;
            }, {}),
        };
    
        if (isEditEmployee) {
            setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? updatedEmployee : emp));
            message.success('Cập nhật nhân viên thành công!');
        } else {
            setEmployees([...employees, updatedEmployee]);
            message.success('Thêm nhân viên thành công!');
        }
    
        setIsEmployeeModalOpen(false);
    };
    

    // Lưu dịch vụ
    const handleSaveService = (values) => {
        const newId = services.length > 0 ? Math.max(...services.map(srv => srv.id)) + 1 : 1;
    
        const updatedService = {
            id: isEditService ? selectedService.id : newId,
            name: values.name,
            price: Number(values.price),
            duration: Number(values.duration),
        };
    
        if (isEditService) {
            setServices(services.map(srv => srv.id === selectedService.id ? updatedService : srv));
            message.success('Cập nhật dịch vụ thành công!');
        } else {
            setServices([...services, updatedService]);
            message.success('Thêm dịch vụ thành công!');
        }
    
        setIsServiceModalOpen(false);
    };
    

    // Xóa nhân viên
    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
        message.success('Xóa nhân viên thành công!');
    };

    // Xóa dịch vụ
    const handleDeleteService = (id) => {
        setServices(services.filter(srv => srv.id !== id));
        message.success('Xóa dịch vụ thành công!');
    };


    
    // Bảng nhân viên
    const employeeColumns = [
        { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
        { title: 'Vị trí', dataIndex: 'position', key: 'position' },
        { title: 'Số khách/ngày', dataIndex: 'maxCustomersPerDay', key: 'maxCustomersPerDay' },
        { title: 'Khách đã phục vụ', dataIndex: 'servedCustomers', key: 'servedCustomers' }, // Thêm cột này
        {
            title: 'Lịch làm việc',
            dataIndex: 'workSchedule',
            key: 'workSchedule',
            render: (schedule) => schedule ? Object.entries(schedule).map(([day, time]) => (
                <div key={day}>{day}: {time}</div>
            )) : 'Chưa có lịch'
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    <Button onClick={() => showEmployeeModal(record)} style={{ marginRight: 8 }}>Sửa</Button>
                    <Button danger onClick={() => handleDeleteEmployee(record.id)}>Xóa</Button>
                </>
            ),
        },
    ];

    // Bảng dịch vụ
    const serviceColumns = [
        { title: 'Tên dịch vụ', dataIndex: 'name', key: 'name' },
        { title: 'Giá (VNĐ)', dataIndex: 'price', key: 'price' },
        { title: 'Thời gian (phút)', dataIndex: 'duration', key: 'duration' },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    <Button onClick={() => showServiceModal(record)} style={{ marginRight: 8 }}>Sửa</Button>
                    <Button danger onClick={() => handleDeleteService(record.id)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý nhân viên</h2>
            <Button type="primary" onClick={() => showEmployeeModal()} style={{ marginBottom: 16 }}>
                + Thêm nhân viên
            </Button>
            <Table  dataSource={employees.map(emp => ({ ...emp, key: emp.id }))} columns={employeeColumns} rowKey="id" />

            <h2>Quản lý dịch vụ</h2>
            <Button type="primary" onClick={() => showServiceModal()} style={{ marginBottom: 16 }}>
                + Thêm dịch vụ
            </Button>
            <Table dataSource={services} columns={serviceColumns} rowKey="id" />

            {/* Modal Nhân viên */}
            <Modal title={isEditEmployee ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"} visible={isEmployeeModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={employeeForm} layout="vertical" onFinish={handleSaveEmployee}>
                    <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="position" label="Vị trí công việc" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="maxCustomersPerDay" label="Số khách/ngày" rules={[{ required: true }]}>
                        <Input type="number" min={1} />
                    </Form.Item>
                    <Form.Item label="Lịch làm việc">
                    <Form.List name="workingHours">
    {(fields, { add, remove }) => (
        <>
            {fields.map((field) => (
                <div key={field.key} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                    <Form.Item {...field} name={[field.name, 'day']} noStyle>
                        <Select placeholder="Chọn ngày" style={{ width: '120px' }}>
                            {daysOfWeek.map((day) => (
                                <Option key={day} value={day}>{day}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item {...field} name={[field.name, 'time']} noStyle>
                        <TimePicker.RangePicker format={format} />
                    </Form.Item>

                    <Button onClick={() => remove(field.name)} danger>Xóa</Button>
                </div>
            ))}
            <Button type="dashed" onClick={() => add()} block>+ Thêm giờ làm việc</Button>
        </>
    )}
</Form.List>

                    </Form.Item>
                    <Button type="primary" htmlType="submit">{isEditEmployee ? "Cập nhật" : "Thêm mới"}</Button>
                </Form>
            </Modal>
            {/* Modal Dịch vụ */}
            <Modal title={isEditService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"} visible={isServiceModalOpen} onCancel={handleCancel} footer={null}>
                <Form form={serviceForm} layout="vertical" onFinish={handleSaveService}>
                    <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true }]}>
                        <Input type="number" min={0} />
                    </Form.Item>
                    <Form.Item name="duration" label="Thời gian (phút)" rules={[{ required: true }]}>
                        <Input type="number" min={1} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">{isEditService ? "Cập nhật" : "Thêm mới"}</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default QuanlyNhanvien;

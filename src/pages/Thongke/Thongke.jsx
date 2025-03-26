import React, { useState, useEffect } from 'react';
import { Table, Card, Statistic, Row, Col, Collapse } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { DollarCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Panel } = Collapse;

const Thongke = () => {
    const [appointments, setAppointments] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [dailyRevenue, setDailyRevenue] = useState([]);
    const [serviceRevenue, setServiceRevenue] = useState([]);
    const [employeeRevenue, setEmployeeRevenue] = useState([]);

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
        setTotalAppointments(storedAppointments.length);

        const confirmedAppointments = storedAppointments.filter(app => app.status === 'Xác nhận');

        const totalRev = confirmedAppointments.reduce((acc, item) => acc + (item.price ? item.price : 0), 0);
        setRevenue(totalRev);

        const dailyData = confirmedAppointments.reduce((acc, item) => {
            const date = dayjs(item.date).format('YYYY-MM-DD');
            acc[date] = (acc[date] || 0) + item.price;
            return acc;
        }, {});
        setDailyRevenue(Object.entries(dailyData).map(([date, value]) => ({ date, revenue: value })));

        const serviceData = confirmedAppointments.reduce((acc, item) => {
            acc[item.service] = (acc[item.service] || 0) + item.price;
            return acc;
        }, {});
        setServiceRevenue(Object.entries(serviceData).map(([service, value]) => ({ service, revenue: value })));

        const employeeData = confirmedAppointments.reduce((acc, item) => {
            acc[item.employee] = (acc[item.employee] || 0) + item.price;
            return acc;
        }, {});
        setEmployeeRevenue(Object.entries(employeeData).map(([employee, value]) => ({ employee, revenue: value })));
    }, []);

    const columns = [
        { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
        { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
        { title: 'Nhân viên', dataIndex: 'employee', key: 'employee' },
        { 
            title: 'Giá (VNĐ)', 
            dataIndex: 'price', 
            key: 'price', 
            render: (text) => (text !== undefined ? text.toLocaleString() : 'N/A') 
        },
        { title: 'Ngày', dataIndex: 'date', key: 'date' },
    ];

    return (
        <div>
            <h2>Thống kê doanh thu & lịch hẹn</h2>
            <Row gutter={16} justify="center" style={{ width: '100%' }}>
                <Col span={12}>
                    <Card>
                        <Statistic title="Tổng số lịch hẹn" value={totalAppointments} prefix={<CalendarOutlined />} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic title="Tổng doanh thu" value={revenue.toLocaleString()} prefix={<DollarCircleOutlined />} suffix="VNĐ" />
                    </Card>
                </Col>
            </Row>

            <Collapse style={{ marginTop: 20 }}>
                <Panel header="Doanh thu theo ngày" key="1">
                    <LineChart width={600} height={300} data={dailyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    </LineChart>
                </Panel>

                <Panel header="Doanh thu theo dịch vụ" key="2">
                    <BarChart width={600} height={300} data={serviceRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="service" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#82ca9d" />
                    </BarChart>
                </Panel>

                <Panel header="Doanh thu theo nhân viên" key="3">
                    <BarChart width={600} height={300} data={employeeRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="employee" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#ff7300" />
                    </BarChart>
                </Panel>

                <Panel header="Chi tiết doanh thu" key="4">
                    <Table dataSource={appointments} columns={columns} rowKey="id" />
                </Panel>
            </Collapse>
        </div>
    );
};

export default Thongke;

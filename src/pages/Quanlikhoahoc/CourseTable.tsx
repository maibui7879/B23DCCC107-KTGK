import { Table, Button, Popconfirm } from "antd";
import { Course } from "./CourseModel";

interface Props {
  Courses: Course[];
  onEdit: (Course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseTable: React.FC<Props> = ({ Courses, onEdit, onDelete }) => {
  const columns = [
    { title: "Mã khóa học", dataIndex: "id", key: "id", align: "center" },
    { title: "Tên khóa học", dataIndex: "name", key: "name", align: "center" },
    { title: "Số học viên", dataIndex: "learners", key: "learners", align: "center", sorter: (a, b) => a.learners - b.learners },
    { title: "Trạng thái", dataIndex: "status", key: "status", align: "center" },
    { title: "Giảng viên", dataIndex: "teacher", key: "teacher", align: "center" },
    {
      title: "Thao Tác",
      key: "action",
      align: "center",
      render: (_, Course: Course) => (
        <Popconfirm title="Xác nhận xóa?" onConfirm={() => onDelete(Course.id)}>
          <Button type="primary">Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={Courses}
      rowKey="id"
      pagination={{ position: ["bottomCenter"] }}
      style={{ textAlign: "center" }}
      onRow={(record) => ({
        onClick: (event) => {
          if (!(event.target as HTMLElement).closest("button")) {
            onEdit(record);
          }
        },
      })}
    />
  );
};

export default CourseTable;

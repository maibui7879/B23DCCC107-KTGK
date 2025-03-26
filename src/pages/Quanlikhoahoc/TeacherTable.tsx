import { Table, Button, Popconfirm } from "antd";
import { Teacher } from "./TeacherModel";

interface Props {
  Teachers: Teacher[];
  onEdit: (Teacher: Teacher) => void;
  onDelete: (id: string) => void;
}

const TeacherTable: React.FC<Props> = ({ Teachers, onEdit, onDelete }) => {
  const columns = [
    { title: "Mã giảng viên", dataIndex: "id", key: "id", align: "center" },
    { title: "Tên giảng viên", dataIndex: "name", key: "name", align: "center" },
    { title: "Tuổi", dataIndex: "age", key: "age", align: "center" },
    { title: "Giới tính", dataIndex: "sex", key: "sex", align: "center" },
    { title: "Số điện thoại", dataIndex: "contact", key: "contact", align: "center" },
    {
      title: "Thao Tác",
      key: "action",
      align: "center",
      render: (_, Teacher: Teacher) => (
        <Popconfirm title="Xác nhận xóa?" onConfirm={() => onDelete(Teacher.id)}>
          <Button type="primary">Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={Teachers}
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

export default TeacherTable;

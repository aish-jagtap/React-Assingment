import { Table } from "antd";
import React from "react";

const CategoryTable = (categoryData, ...props) => {
  return (
    <>
      <Table dataSource={categoryData.categoryData} pagination={false}>
        <Table.Column title="S.No" dataIndex={"id"} key={"id"} />

        <Table.Column
          title="Category Name"
          dataIndex={"category_name"}
          key={"category_name"}
        />

        <Table.Column title="Status" dataIndex={"status"} key={"status"} />

        <Table.Column
          title="Last Updated"
          dataIndex={"last_modified"}
          key={"last_modified"}
        />
      </Table>
    </>
  );
};

export default CategoryTable;

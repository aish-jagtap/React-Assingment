import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CategoryTable from "./categoryTbl";

const Dashboard = () => {
  const history = useHistory();
  const [userName, setuserName] = useState("");
  const [role, setRole] = useState("");
  const [resultData, setResultData] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    setuserName(localStorage.getItem("username"));
    setRole(localStorage.getItem("userRole"));

    if (userName == null && role == null) {
      history.push("/");
    }
  }, [userName, role]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/e9d0c712-3bd7-45af-8bec-0e3c7d89bd10")
      .then((response) => response.json())
      .then((json) => setResultData(json));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");

    history.push("/");
  };

  const handleCategoryData = (e, data) => {
    setCategoryId(e.target.value);
    if (e.target.value != null && e.target.value != undefined) {
      const tempData =
        resultData && resultData.filter((item) => item.id == e.target.value);
      setCategoryData(tempData);
    } else {
      setCategoryData([]);
    }
  };

  return (
    <div>
      <div className="dashboard-bg">
        <div className="row">
          <div className="col-lg-12 col-md-12 d-flex">
            <div className="col-lg-6 col-md-6">
              <div className="col-lg-6 col-md-6">
                <label className="font-white">User :</label>
                <span className="font-white">
                  {localStorage.getItem("username")}
                </span>
              </div>

              <div className="col-lg-6 col-md-6">
                <label className="font-white">Role:</label>
                <span className="font-white">
                  {localStorage.getItem("userRole")}
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 btn-position">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-25">
        <select
          value={categoryId}
          onChange={(e, data) => handleCategoryData(e, data)}
          className="select-sw"
        >
          <option>--Select Category--</option>
          {resultData &&
            resultData.map((item) => (
              <option value={item.id} key={item.id}>
                {item.category_name}
              </option>
            ))}
        </select>
      </div>
      <div className="table-sw">
        <CategoryTable categoryData={categoryData}></CategoryTable>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Table, Button, Select, Spin, Input, Space } from 'antd';
import { CiSearch } from 'react-icons/ci';

const { Option } = Select;

const pageSizeDropDown = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
];

const CustomTable = ({ title, columns, data, loading, filters, schoolId, setSchoolId, fetchSchoolTransactions }) => {
    const [paginationSize, setPaginationSize] = useState(10);
    const [enteredText, setEnteredText] = useState("");
    const [filterBy, setFilterBy] = useState("collect_id");
    const [dataSource, setDataSource] = useState(data);

    console.log("filters=", filters);

    const getRowClassName = (record, index) => {
        return index % 2 === 0 ? 'even-row custom-row' : 'odd-row custom-row'
    }

    const handlePagination = (selectedPage) => {
        setPaginationSize(selectedPage)
        // console.log(selectedPage)
    }

    useEffect(() => {
        let entersearch = enteredText.toLowerCase();
        const filteredData = data.filter(item => {
            switch (filterBy) {
                case "collect_id":
                    return item._id?.toLowerCase().includes(entersearch);

                case "school_id":
                    return item.school_id?.toLowerCase().includes(entersearch);

                case "student_name":
                    return item.student_info?.name?.toLowerCase().includes(entersearch);

                case "gateway_name":
                    return item.gateway_name?.toLowerCase().includes(entersearch);

                default:
                    return false;
            }
        });

        setDataSource(filteredData);
    }, [enteredText, data,]);

    useEffect(() => {
        if (title === "Transactions History" && filters.status !== "") {
            const filteredData = data.filter(item =>
                item.statuses?.status?.includes(filters.status.toLowerCase())
            );
            setDataSource(filteredData);
        } else {
            setDataSource(data);
        }
    }, [filters.status, data, title]);

    useEffect(() => {
        if (title === "Transactions History" && filters.selectedDate) {
            //const targetDate = filters.selectedDate?.format("YYYY-MM-DD");
            const targetDate = filters.selectedDate.format("YYYY-MM-DD");
            console.log(targetDate)
            const filteredData = data.filter(item => {
                const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
                return itemDate === targetDate;
            });
            setDataSource(filteredData);
        } else {
            setDataSource(data);
        }
    }, [filters.selectedDate, data, title]);


    const filterChange = (value) => {
        setFilterBy(value);
        setEnteredText("");
    }
    const fetchSchoolData = (value) => {
        //setSchoolId(value);
        fetchSchoolTransactions(schoolId);
    }

    //  console.log("datasource=",dataSource);
    // console.log(enteredText);

    return (
        <div id='customTable' className='d-flex flex-column align-items-start'>
            {title === "Transactions History" && (
                <div className='mb-5'>
                    <Space>
                        <Input
                            placeholder={`Search by ${filterBy.replace("_", " ")}`}
                            value={enteredText}
                            onChange={(e) => setEnteredText(e.target.value)}
                            style={{ width: 300 }}
                        />

                        <Select
                            value={filterBy}
                            onChange={(e) => filterChange(e)}
                            style={{ width: 150 }}
                        >
                            <Option value="collect_id">Collect ID</Option>
                            <Option value="school_id">School ID</Option>
                            <Option value="student_name">Student Name</Option>
                            <Option value="gateway_name">Gateway</Option>
                        </Select>
                    </Space>
                </div>)}

            {title === "Transactions School History" && (
                <div className='mb-5'>
                    <Space>
                        <Select
                            placeholder="Select school id"
                            value={filters.listSchoolIds.find((option) => option.value === schoolId)}
                            options={filters.listSchoolIds}
                            onChange={(value) => setSchoolId(value)}
                            style={{ width: 300 }}
                        />
                        <Button className="btn btn-primary btn-sm" onClick={fetchSchoolData}>Submit</Button>

                    </Space>
                </div>)}

            <div className="p-3 d-flex align-items-center flex-row justify-content-between" style={{ width: "100%" }}>
                <div className='d-flex flex-row'>
                    <div className="mx-1">
                        <strong>
                            <label className='my-2' >Rows per page : </label>
                        </strong>
                    </div>
                    <div className="mx-1" >
                        <Select
                            value={pageSizeDropDown.find((option) => option.value === paginationSize)}
                            options={pageSizeDropDown}
                            onChange={handlePagination}
                            placeholder="Select Page Size..."
                        />
                    </div>
                </div>
                {/* <div className='mx-1'>
                            <strong>
                                <label className='my-2' >Search : </label>
                            </strong>
                        </div>
                        <div className='mx-1'>
                            <input type="text" style={{ width: 280 }} value={enteredText} onChange={(e) => setEnteredText(e.target.value)} className="form-control" id="inputField2" placeholder={"Enter Student Name or Gateway"} />
                        </div> */}
                <div className="ms-md-auto mx-3">
                    <strong>Total Count : {dataSource?.length}</strong>
                </div>
            </div>

            <div style={{ width: "100%", }}>
                <div className="page-inner">
                    <Table
                        columns={columns}
                        pagination={{
                            pageSize: paginationSize,
                            showSizeChanger: false,
                        }}
                        dataSource={dataSource}
                        rowKey="collect_id"
                        scroll={{ x: 'max-content', }}
                        rowClassName={getRowClassName}
                        loading={{ indicator: <div><Spin /></div>, spinning: loading }}
                    />
                </div>
            </div>

        </div>
    );
}

export default CustomTable;
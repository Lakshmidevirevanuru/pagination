import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { allData } from "./data";
import { title } from "process";



const tableHeader={
    name:"name",
    Id:"id",
    Type:"type",
    status:"status"
}


const Table = () => {
    const countPerPage:number = 10;
    const [value, setValue] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [collection, setCollection] = React.useState(
      cloneDeep(allData.slice(0, countPerPage))
    );
    const searchData = React.useRef(
      throttle(val => {
        const query = val.toLowerCase();
        setCurrentPage(1);
        const data = cloneDeep(
          allData
            .filter(item => item.name.toLowerCase().indexOf(query) > -1)
            .slice(0, countPerPage)
        );
        setCollection(data);
      }, 400)
    );
  
    // const searchData=(data:any[],term:string)=>{
    //         return data.filter((item)=>{
    //             return(
    //                 item.name.toLowerCase().includes(term.toLowerCase()) ||
    //                 item.Id.string.includes(term)  ||
    //                 item.type.toLowerCase().includes(term.toLowerCase()) ||
    //                 item.status.toLowerCase().includes(term.toLowerCase())
    //             )
    //         })
    // }


    React.useEffect(() => {
      if (!value) {
        updatePage(1);
      } else {
        searchData.current(value);
      }
    }, [value]);
  
    const updatePage = (p: number) => {
      setCurrentPage(p);
      const to = countPerPage * p;
      const from = to - countPerPage;
      setCollection(cloneDeep(allData.slice(from, to)));
    };
  
    const tableRows = (rowData: { key: any; index: any; }) => {
      const { key, index } = rowData;
      const tableCell = Object.keys(tableHeader);
      const columnData = tableCell.map((keyD, i) => {
        return <td key={i}>{key[keyD]}</td>;
      });
  
      return <tr key={index}>{columnData}</tr>;
    };
  
    const tableData = () => {
      return collection.map((key, index) => tableRows({ key, index }));
    };
  
    const headRow = () => {
      return Object.values(tableHeader).map((title, index) => (
        <td key={index}>{title}</td>
      ));
    };
  
    return (
      <>
        <div className="search">
          <input
            placeholder="Search"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody className="trhover">{tableData()}</tbody>
        </table>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={allData.length}
        />
      </>
    );
  };
  export default Table;
  
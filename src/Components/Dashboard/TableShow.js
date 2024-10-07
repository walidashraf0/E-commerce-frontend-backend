import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./table.css";
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CATEGORY } from "../../Api/Api";
import TransformDate from "../../Helpers/TransformDate";

export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const showWhichData = search.length > 0 ? filteredData : props.data;
  TransformDate("2024-10-07T14:17:52.000000Z");

  // Front
  // const start = (props.page - 1) * props.limit;
  // const end = Number(props.limit) + Number(start);
  // const final = props.data.slice(start, end);

  // let paginateData = [];

  // if (props.data.length !== 0) {
  //   for (let i = (props.page - 1) * props.limit; i < props.page * props.limit; i++) {
  //     paginateData.push(props.data[i]);
  //   }
  // }

  // Header Show
  const headerShow = props.header.map((header, key) => (
    <th key={key} className="f-cairo" style={{ textAlign: "center" }}>
      {header.name}
    </th>
  ));

  //Front
  // const filteredData = props.data.filter((item) =>
  //   item[props.search].toLowerCase().includes(search.toLowerCase())
  // );
  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  // };

  // Body Data Show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td style={{ textAlign: "center" }}>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2} style={{ textAlign: "center" }}>
          {item2.key === "image" ? (
            <img width="50px" src={item[item2.key]} alt="Category-Image" />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
              {item[item2.key].map((img, key3) => (
                <img
                  className=""
                  key={key3}
                  width="50px"
                  src={img.image}
                  alt="Product-Image"
                />
              ))}
            </div>
          ) : item[item2.key] === "1995" ? (
            "Admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : item[item2.key] === "1992" ? (
            "Viewer"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name ? " (You)" : ""}
        </td>
      ))}
      <td style={{ textAlign: "center" }}>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              // color="blue"
              icon={faPenToSquare}
            />
          </Link>

          {currentUser.name !== item.name ? (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              fontSize={"19px"}
              color="red"
              icon={faTrash}
              cursor={"pointer"}
            />
          ) : (
            ""
          )}
        </div>
      </td>
    </tr>
  ));

  const getSearchData = async () => {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilteredData(res.data);
      // console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);


  return (
    <>
      <div className="col-3">
        <Form.Control
          type="search"
          aria-label="input Example"
          className="my-2"
          placeholder="Search "
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>
      <Table
        className="table-shadow rounded overflow-hidden text-white"
        striped
        bordered
        hover>
        <thead className="px-2">
          <tr>
            <th className=" f-cairo" style={{ textAlign: "center" }}>
              ID
            </th>
            {headerShow}
            <th className=" f-cairo" style={{ textAlign: "center" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={12}>Loading...</td>
            </tr>
          ) : searchLoading ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={12}>Searching...</td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>

      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default Select Example">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          itemsPerPage={props.limit}
          data={props.data}
          setPage={props.setPage}
          total={props.total}
        />
      </div>
    </>
  );
}

import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./table.css";
import PaginatedItems from "./Pagination/Pagination";

export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };

  let paginateData = [];

  if (props.data.length !== 0) {
    for (let i = (props.page - 1) * props.limit; i < props.page * props.limit; i++) {
      paginateData.push(props.data[i]);
    }
  }

  // Header Show
  const headerShow = props.header.map((header, key) => (
    <th key={key} className="f-cairo" style={{ textAlign: "center" }}>
      {header.name}
    </th>
  ));
  // Body Show
  const dataShow = paginateData.map((item, key) => (
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

  // handle Delete
  // const handleDelete = async (id) => {
  //   try {
  //     const res = await Axios.delete(`${props.delete}/${id}`);
  //     // setDeleted((prev) => !prev);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
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
          {props.data.length === 0 ? (
            <tr style={{ textAlign: "center" }}>
              <td colSpan={12}>Loading...</td>
            </tr>
          ) : (
            ""
          )}
          {dataShow}
        </tbody>
      </Table>

      <PaginatedItems itemsPerPage={props.limit} data={props.data} setPage={props.setPage} />

    </>
  );
}

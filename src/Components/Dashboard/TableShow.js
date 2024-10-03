import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: ""
  };
  // Header Show
  const headerShow = props.header.map((header, key) => (
    <th key={key}>{header.name}</th>
  ));
  // Body Show
  const dataShow = props.data.map((item, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img width="50px" src={item[item2.key]} alt="Category-Image" />
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
        <div className="d-flex justify-content-center align-items-center gap-3">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              color="blue"
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            {headerShow}
            <th>Action</th>
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
    </>
  );
}

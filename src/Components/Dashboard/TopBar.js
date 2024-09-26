import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;

  return (
    <>
      <div className="topbar d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-between gap-5">
          <h3>WEGO</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
      </div>
    </>
  );
}

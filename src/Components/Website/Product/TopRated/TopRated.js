import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function TopRated(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon key={key} color="gold" icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={faStar} />
  ));

  return (
    <>
      <NavLink to={`/product/${props.id}`} className="col-12 border d-flex align-items-start flex-wrap mb-2">
        <div
          className="col-md-4 col-12"
          style={{
            backgroundImage: `url(${props.img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "170px",
          }}></div>
        <div className="m-1 col-md-7 col-12 rounded p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <p className="text-truncate" style={{ color: "gray" }}>
              {props.title}
            </p>
            <p className="text-truncate text-black">{props.desc}</p>
          </div>

          <div className="d-flex align-items-center justify-content-between pt-4">
            <div>
              {showGoldStars}
              {showEmptyStars}
              <div className="d-flex align-items-center gap-3">
                <h5 className="m-0 text-primary">{props.discount}</h5>
                <h6
                  className="m-0"
                  style={{ color: "gray", textDecoration: "line-through" }}>
                  {props.price}$
                </h6>
              </div>
            </div>
            <div className="border p-2 rounded">
              <img
                src={require("../../../../Assets/cart.png")}
                alt="cart"
                width="20px"
              />
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
}

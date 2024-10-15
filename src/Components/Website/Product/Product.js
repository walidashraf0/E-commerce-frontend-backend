import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product(props) {
    const roundStars = Math.round(props.rating)
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, key) => (
    <FontAwesomeIcon key={key} color="gold" icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, key) => (
    <FontAwesomeIcon key={key} icon={faStar} />
  ));

  return (
    <>
      <div className="col-lg-3 col-md-6 col-12">
        <div className="m-1 border rounded p-3 h-100">
          <div className="border-bottom pd-3">
            <p className="text-truncate" style={{ color: "gray" }}>
              {props.title}
            </p>
            <p className="text-truncate">{props.desc} ...</p>
            <div className="px-5 py-4 position-relative">
              {props.discount ? (
                <p
                  className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    lineHeight: "50px",
                  }}>
                  {props.discount}%
                </p>
              ) : (
                ""
              )}
              <div
                className="w-100"
                style={{
                  backgroundImage: `url("${props.img})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  height: "170px",
                  width: "100%",
                }}></div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div>
              {showGoldStars}
              {showEmptyStars}
              <div className="d-flex align-items-center gap-3">
                <h5 className="m-0 text-primary">
                  {props.price - props.discount}$
                </h5>
                <h6
                  className="m-0"
                  style={{ color: "gray", textDecoration: "line-through" }}>
                  {props.price}$
                </h6>
              </div>
            </div>
            <div className="border p-2 rounded">
              <img
                src={require("../../../Assets/cart.png")}
                alt="cart"
                width="20px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

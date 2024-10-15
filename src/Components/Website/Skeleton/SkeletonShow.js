import Skeleton from "react-loading-skeleton";

export default function SkeletonShow(props) {
  const skeletonLength = Array.from({ length: props.length }).map((_, key) => (
    <div key={key} className={props.classes}>
      <Skeleton
        width={props.width}
        baseColor={props.baseColor}
        height={props.height}
      />
    </div>
  ));
  return skeletonLength;
}

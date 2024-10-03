import "./err403.css";


export default function Err403() {
  return (
    <>
      <div className="text-wrapper">
        <div className="title" data-content={404}>
            403 - ACCESS DENIED
        </div>
        <div className="subtitle">
            Oops, You don't have permission to access this page.
        </div>
      </div>
    </>
  );
}

import { useParams } from "react-router-dom";

function Placement() {
  let { placement } = useParams();
  return <h1>Địa điểm: {placement}</h1>;
}

export default Placement;
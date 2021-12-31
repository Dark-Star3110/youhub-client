import { useCheckAuth } from "../../hooks/useCheckAuth";

const Explore = () => {
  useCheckAuth();
  return (
    <div>
      <h1>Explore</h1>
    </div>
  );
};

export default Explore;

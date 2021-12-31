import { useCheckAuth } from "../../hooks/useCheckAuth";

const Subscriptions = () => {
  useCheckAuth();
  return (
    <div>
      <h1>Subscriptions</h1>
    </div>
  );
};

export default Subscriptions;

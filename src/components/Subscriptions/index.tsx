import { useLogin } from "../../contexts/UserContext";
import { useGetChanelQuery } from "../../generated/graphql";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import ChanelVideo from "../ChanelVideo";
import Spinner from "../Spinner";
import styles from "./Subscriptions.module.scss";

const Subscriptions = () => {
  useCheckAuth();
  const {
    state: { details },
  } = useLogin();

  const { data, loading } = useGetChanelQuery({
    variables: {
      userId: details?.id as string,
    },
  });

  if (loading)
    return (
      <h1>
        <Spinner />
      </h1>
    );

  if (!loading && !data?.user?.chanelsSubscribe)
    return <h1>Bạn chưa theo dõi bất kỳ người dùng nào</h1>;

  const sub_list = data?.user?.chanelsSubscribe;
  return (
    <div className={styles["subcritions"]}>
      {sub_list?.map((channel, index) => {
        return (
          <div key={index} className={styles["channel"]}>
            <div className={styles["channel__detail"]}>
              <img src={channel.image_url as string} alt="img" />
              <h2>{channel.lastName + " " + channel.firstName}</h2>
            </div>
            <div className={styles["layout"]}>
              <ChanelVideo userId={channel.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Subscriptions;

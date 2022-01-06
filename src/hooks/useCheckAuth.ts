import { useEffect } from "react";
import { useLogin } from "../contexts/UserContext";
import { useMeQuery, User } from "../generated/graphql";
import { useRouter } from "./useRouter";

export const useCheckAuth = () => {
  const { state: userState, setState: setUserState } = useLogin();
  const { data, loading } = useMeQuery({
    skip: userState.details ? true : false,
  });
  const router = useRouter();

  useEffect(() => {
    if (!userState.details && data?.me) {
      setUserState(function (preValues) {
        return {
          ...preValues,
          details: data.me as User,
        };
      });
    }
    if (
      !loading &&
      !userState.details &&
      router.pathname !== "/login" &&
      router.pathname !== "/" &&
      !window.localStorage.getItem("login") &&
      router.pathname !== "/forgot" &&
      !router.pathname.includes("/user") &&
      !router.pathname.includes("/change-password")
    )
      router.push("/login");

    if (!loading && userState.details && router.pathname === "/login")
      router.push("/");
  }, [data, loading, router, userState.details, setUserState]);

  return {
    data: userState.details,
    loading,
  };
};

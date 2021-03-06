import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePass from "./components/ChangePass";
import Contact from "./components/Contact";
import Create from "./components/Create";
import Donante from "./components/Donate";
import EditVideo from "./components/EditVideo";
import Explore from "./components/Explore";
import ExtraNav from "./components/ExtraNav";
import Forgot from "./components/Forgot";
import Home from "./components/Home";
import Library from "./components/Library";
import Login from "./components/Login";
import Me from "./components/Me";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import Subscriptions from "./components/Subscriptions";
import TopBar from "./components/TopBar";
import User from "./components/User";
import Watch from "./components/Watch";
import { ExtraNavContext } from "./contexts/ExtraNavContext";
import { NavContext } from "./contexts/NavContext";
import { useLogin } from "./contexts/UserContext";
import { useRefreshTokenMutation } from "./generated/graphql";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { useRouter } from "./hooks/useRouter";
import "./styles/App.scss";

function App() {
  const { loading } = useCheckAuth();
  // state
  const [display, setDisplay] = useState<string>("");

  // context
  const { action } = useContext(NavContext);
  const { Eaction, toggleExtraNav } = useContext(ExtraNavContext);
  const {
    state: { details },
    setState: setUserContext,
    socket,
  } = useLogin();

  // location
  const router = useRouter();

  // check authentication
  const [refreshTokenMutation] = useRefreshTokenMutation();

  const verifyUser = useCallback(async () => {
    const response = await refreshTokenMutation();
    const token = response.data?.refreshToken.token as string | undefined;
    if (!response.data?.refreshToken.token)
      window.localStorage.removeItem("login");
    setUserContext(function (preValues) {
      return {
        ...preValues,
        token,
      };
    });
    setTimeout(verifyUser, 14 * 60 * 1000);
  }, [setUserContext, refreshTokenMutation]);

  useLayoutEffect(() => {
    verifyUser(); /*  */
  }, [verifyUser]);

  // sync login
  const syncLogin = useCallback((event) => {
    if (event.key === "login") {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogin);
    return () => {
      window.removeEventListener("storage", syncLogin);
    };
  }, [syncLogin]);

  // sync logout
  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  // effect
  useEffect(() => {
    // console.log(router.location.pathname);
    if (
      router.location.pathname === "/login" ||
      router.location.pathname === "/forgot" ||
      router.location.pathname.includes("/change-password")
    ) {
      setDisplay("full");
    } else if (
      router.location.pathname.includes("/watch") ||
      router.location.pathname.includes("/me") ||
      router.location.pathname.includes("/library")
    ) {
      setDisplay("watch");
    } else {
      setDisplay("");
    }
  }, [router.location.pathname]);

  useEffect(() => {
    socket.emit("online", details?.id);
    return () => {
      socket.emit("offline", details?.id);
    };
  }, [socket, details?.id]);

  return (
    <div className="container">
      <ToastContainer />
      <div
        className={`over-layer ${Eaction}`}
        onClick={() => toggleExtraNav()}
      ></div>
      <ExtraNav />
      {display === "" && <Navbar />}
      <div className={`App ${action} ${display}`}>
        {(display === "" || display === "watch") && <TopBar type={display} />}
        <Routes>
          <Route path="/explore" element={<Explore />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/library/:slug" element={<Library />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/watch/:slug" element={<Watch />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/:slug" element={<User />} />
          <Route path="/edit/:slug" element={<EditVideo />} />
          <Route path="/me" element={<Me />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="/donate" element={<Donante />} />
          <Route
            path="/"
            element={
              loading ? (
                <h1>
                  <Spinner />
                </h1>
              ) : (
                <Home />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

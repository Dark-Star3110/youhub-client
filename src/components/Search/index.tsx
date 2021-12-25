import { useEffect } from "react";
import { useRouter } from "../../hooks/useRouter";

const Search = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.q);
  }, [router.query]);

  return (
    <div>
      <h1>Search</h1>
    </div>
  );
};

export default Search;

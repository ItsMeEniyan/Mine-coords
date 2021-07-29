import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useSaveQueryParamsToken = () => {
  let history = useHistory();
  // const router = useRouter();

  // const { jwtTok } = router.query
  // localStorage.setItem("jwtTok", jwtTok);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const jwtTok = query.get("jwtTok");
  if (jwtTok == null && localStorage.getItem("jwtTok") == null) {
    history.push("/");
  }
  if (jwtTok != null) {
    localStorage.setItem("jwtTok", jwtTok);
  }
};

export default useSaveQueryParamsToken;

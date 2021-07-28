import {
 useLocation
  } from "react-router-dom";


const useSaveQueryParamsToken = () => {
    // const router = useRouter();
    
    // const { jwtTok } = router.query
    // localStorage.setItem("jwtTok", jwtTok);
    function useQuery() {
           return new URLSearchParams(useLocation().search);
         }
      
         const query = useQuery();
         const jwtTok =query.get("jwtTok")
      
         localStorage.setItem("jwtTok", jwtTok);
        
}

export default useSaveQueryParamsToken;
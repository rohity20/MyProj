import { useState, useEffect } from "react";
import { useAuth } from "./auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:4000/api/v1/auth/user-auth");
      console.log("prot-res", res);
      if (res.status === 200) {
        setOk(true);
        navigate("/users")
      } else {
        setOk(false);
        navigate("/login");
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

}

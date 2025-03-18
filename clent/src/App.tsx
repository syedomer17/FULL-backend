import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID; // Replace with your GitHub OAuth client ID

const App = () => {
  const [rerender, setRerender] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null); // ✅ Initialize as null

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log("GitHub Code:", codeParam);

    if (codeParam && !localStorage.getItem("accessToken")) {
      async function getAccessToken() {
        try {
          const response = await axios.get(`http://localhost:5000/auth/getAccessToken?code=${codeParam}`);
          console.log("Token Response:", JSON.stringify(response.data));

          if (response.data.access_token) {
            localStorage.setItem("accessToken", response.data.access_token);
            console.log("Stored Token:", localStorage.getItem("accessToken"));

            // Remove the code from the URL to prevent reuse issues
            window.history.replaceState({}, document.title, window.location.pathname);
            setRerender((prev) => !prev);
          }
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
      getAccessToken();
    }
  }, [rerender]);

  async function getUserData() {
    try {
      const response = await axios.get("http://localhost:5000/auth/getUserData", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("User Data:", response.data);
      setUserData(response.data); // ✅ Store user data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  function loginWithGitHub(): void {
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`);
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    setUserData(null); // ✅ Clear user data on logout
    setRerender(!rerender);
    window.history.replaceState({}, document.title, window.location.pathname); // ✅ Remove GitHub code from URL
  }

  return (
    <div>
      <header>
        {localStorage.getItem("accessToken") ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={getUserData}>Get User Data</button>

            {/* ✅ Show user data when available */}
            {userData && (
              <>
                <h4>Hey there, {userData.login} 👋</h4>
                <img src={userData.avatar_url} alt="GitHub Avatar" width="100px" height="100px" />
                <br />
                <a href={userData.html_url} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                  Visit my GitHub Profile
                </a>
              </>
            )}
          </>
        ) : (
          <>
            <h3>User not logged in</h3>
            <button onClick={loginWithGitHub}>Login with GitHub</button>
          </>
        )}
      </header>
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";

function useGapi() {
  const [gapi, setGapi] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  async function handleGoogleAuth2() {
    const params = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "profile email https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.sleep.read",
      ux_mode: "redirect",
    };

    await window.gapi.auth2.init(params);
  }

  async function handleLoad() {
    if (!window.gapi) {
      return;
    }

    await window.gapi.load("auth2", handleGoogleAuth2);
    setGapi(window.gapi);
    setIsLoaded(true);
  }

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.addEventListener("load", handleLoad);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      document.body.removeChild(script);
    };
  }, []);

  return [gapi, isLoaded];
}

export { useGapi };

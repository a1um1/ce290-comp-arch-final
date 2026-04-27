import { useEffect, useState } from "react";

export type Route = "/main" | "/alu";

function currentRoute(): Route {
  const h = window.location.hash || "#/main";
  const path = h.startsWith("#") ? h.slice(1) : h;
  return (path as Route) || "/main";
}

export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(currentRoute());

  useEffect(() => {
    const handler = () => setRoute(currentRoute());
    if (!window.location.hash) {
      window.location.hash = "#/main";
    }
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (r: Route) => {
    const target = `#${r}`;
    if (window.location.hash !== target) {
      window.location.hash = target;
    }
  };

  return [route, navigate];
}

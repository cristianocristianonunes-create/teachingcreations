import { createContext, useContext } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

const PathPrefixContext = createContext("");

export const PathPrefixProvider = ({
  prefix,
  children,
}: {
  prefix: string;
  children: React.ReactNode;
}) => (
  <PathPrefixContext.Provider value={prefix}>
    {children}
  </PathPrefixContext.Provider>
);

export const usePathPrefix = () => useContext(PathPrefixContext);

/** A Link that automatically prepends the current path prefix */
export const PrefixedLink = ({ to, ...props }: LinkProps) => {
  const prefix = useContext(PathPrefixContext);
  const prefixedTo =
    typeof to === "string" && to.startsWith("/") ? `${prefix}${to}` : to;
  return <RouterLink to={prefixedTo} {...props} />;
};

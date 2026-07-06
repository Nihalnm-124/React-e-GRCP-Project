import RoleRoute from "./RoleRoute";

function UserRoute({
  children,
}) {

  return (

    <RoleRoute
      allowedRoles={[
        "Admin",
        "Manager",
        "User",
      ]}
    >

      {children}

    </RoleRoute>

  );

}

export default UserRoute;
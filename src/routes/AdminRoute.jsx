import RoleRoute from "./RoleRoute";

function AdminRoute({
  children,
}) {

  return (

    <RoleRoute
      allowedRoles={[
        "Admin",
      ]}
    >

      {children}

    </RoleRoute>

  );

}

export default AdminRoute;
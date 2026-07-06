import AuthLayout from "../../layouts/AuthLayout";
import LoginForm from "../../components/forms/LoginForm";

function Login() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
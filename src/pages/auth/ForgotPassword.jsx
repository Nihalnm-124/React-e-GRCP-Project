import AuthLayout from "../../layouts/AuthLayout";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <AuthLayout title="Forgot Password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default ForgotPassword;
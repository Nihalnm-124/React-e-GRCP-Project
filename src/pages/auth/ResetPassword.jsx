import AuthLayout from "../../layouts/AuthLayout";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

function ResetPassword() {
  return (
    <AuthLayout title="Reset Password">
      <ResetPasswordForm />
    </AuthLayout>
  );
}

export default ResetPassword;
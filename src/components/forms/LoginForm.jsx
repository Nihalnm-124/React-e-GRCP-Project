import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Link,
  Alert,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../utils/helpers/validationSchema";
import { login } from "../../services/authService";
import { loginSuccess } from "../../store/slices/authSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setApiError("");

      const user = await login(data);

      dispatch(loginSuccess(user));

      navigate("/dashboard");
    } catch (error) {
      setApiError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {apiError && (
          <Alert severity="error">
            {apiError}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Remember Me"
        />

        <Link
          component="button"
          type="button"
          underline="hover"
          onClick={() =>
            navigate("/forgot-password")
          }
        >
          Forgot Password?
        </Link>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging In..." : "LOGIN"}
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
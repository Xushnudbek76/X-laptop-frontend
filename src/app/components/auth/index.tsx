import { useState } from "react";
import {
  Box,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import type { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { MemberType } from "../../../lib/enums/member.enum";
import { toast } from "sonner";
import { useGlobals } from "../hooks/useGlobals";

const memberService = new MemberService();

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuthMember } = useGlobals();
  const [loginInput, setLoginInput] = useState<LoginInput>({
    memberNick: "",
    memberPassword: "",
  });

  const [signupInput, setSignupInput] = useState<MemberInput>({
    memberNick: "",
    memberPhone: "",
    memberPassword: "",
    memberType: MemberType.USER,
  });

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await memberService.login(loginInput);
      toast.success("Logged in successfully!");
      handleLoginClose();
      setAuthMember(result);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message ?? "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await memberService.signup(signupInput);
      toast.success("Signup successful! Welcome to X-Laptop.");
      handleSignupClose();
      setAuthMember(result);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message ?? "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 400, className: "auth-modal__backdrop" } }}
      >
        <Fade in={loginOpen}>
          <Box className="auth-modal__panel">
            <div className="auth-modal__header">
              <div>
                <div className="auth-modal__title">Welcome back</div>
                <div className="auth-modal__subtitle">Sign in to your account</div>
              </div>
              <IconButton onClick={handleLoginClose} className="auth-modal__close">
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>

            <div className="auth-modal__fields">
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={loginInput.memberNick}
                onChange={(e) => setLoginInput({ ...loginInput, memberNick: e.target.value })}
                className="auth-modal__field"
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={loginInput.memberPassword}
                onChange={(e) => setLoginInput({ ...loginInput, memberPassword: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="auth-modal__field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        className="auth-modal__visibility"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && <div className="auth-modal__error">{error}</div>}

              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={handleLogin}
                startIcon={
                  loading ? (
                    <CircularProgress size={16} className="auth-modal__submit-spinner" />
                  ) : (
                    <LoginIcon />
                  )
                }
                className="auth-modal__submit"
              >
                Sign In
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 400, className: "auth-modal__backdrop" } }}
      >
        <Fade in={signupOpen}>
          <Box className="auth-modal__panel">
            <div className="auth-modal__header">
              <div>
                <div className="auth-modal__title">Create account</div>
                <div className="auth-modal__subtitle">Join X-Laptop today</div>
              </div>
              <IconButton onClick={handleSignupClose} className="auth-modal__close">
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>

            <div className="auth-modal__fields">
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={signupInput.memberNick}
                onChange={(e) => setSignupInput({ ...signupInput, memberNick: e.target.value })}
                className="auth-modal__field"
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={signupInput.memberPhone}
                onChange={(e) => setSignupInput({ ...signupInput, memberPhone: e.target.value })}
                className="auth-modal__field"
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={signupInput.memberPassword}
                onChange={(e) => setSignupInput({ ...signupInput, memberPassword: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                className="auth-modal__field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        className="auth-modal__visibility"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && <div className="auth-modal__error">{error}</div>}

              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={handleSignup}
                startIcon={
                  loading ? (
                    <CircularProgress size={16} className="auth-modal__submit-spinner" />
                  ) : (
                    <PersonAddIcon />
                  )
                }
                className="auth-modal__submit"
              >
                Sign Up
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

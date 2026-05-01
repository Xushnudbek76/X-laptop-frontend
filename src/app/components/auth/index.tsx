import { useState } from "react";
import { Box, Modal, Fade, Backdrop, TextField, Button, IconButton, InputAdornment, CircularProgress } from "@mui/material";
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

const inputSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    color: "#e8eaf0",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(37,99,235,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#2563eb" },
  },
  "& .MuiInputLabel-root": { color: "#8892a4" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#3b82f6" },
};

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
  const {setAuthMember} = useGlobals();
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

  const modalBoxSx = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90vw", sm: 420 },
    bgcolor: "#1a1a2e",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    p: 4,
    outline: "none",
  };

  return (
    <>
      {/* ── Login Modal ── */}
      <Modal open={loginOpen} onClose={handleLoginClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 400 } }}>
        <Fade in={loginOpen}>
          <Box sx={modalBoxSx}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
              <Box>
                <Box sx={{ fontSize: 22, fontWeight: 700, color: "#e8eaf0" }}>Welcome back</Box>
                <Box sx={{ fontSize: 13, color: "#8892a4", mt: 0.5 }}>Sign in to your account</Box>
              </Box>
              <IconButton onClick={handleLoginClose} sx={{ color: "#8892a4", "&:hover": { color: "#e8eaf0" } }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Fields */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={loginInput.memberNick}
                onChange={(e) => setLoginInput({ ...loginInput, memberNick: e.target.value })}
                sx={inputSx}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={loginInput.memberPassword}
                onChange={(e) => setLoginInput({ ...loginInput, memberPassword: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#8892a4" }}>
                        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />

              {error && (
                <Box sx={{ fontSize: 13, color: "#f87171", bgcolor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "8px", px: 1.5, py: 1 }}>
                  {error}
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                startIcon={loading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <LoginIcon />}
                disabled={loading}
                onClick={handleLogin}
                sx={{
                  bgcolor: "#2563eb", borderRadius: "10px", py: 1.4,
                  fontWeight: 600, textTransform: "none", fontSize: 15, mt: 1,
                  "&:hover": { bgcolor: "#1d4ed8" },
                  "&.Mui-disabled": { bgcolor: "rgba(37,99,235,0.4)", color: "#8892a4" },
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* ── Signup Modal ── */}
      <Modal open={signupOpen} onClose={handleSignupClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 400 } }}>
        <Fade in={signupOpen}>
          <Box sx={modalBoxSx}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
              <Box>
                <Box sx={{ fontSize: 22, fontWeight: 700, color: "#e8eaf0" }}>Create account</Box>
                <Box sx={{ fontSize: 13, color: "#8892a4", mt: 0.5 }}>Join X-Laptop today</Box>
              </Box>
              <IconButton onClick={handleSignupClose} sx={{ color: "#8892a4", "&:hover": { color: "#e8eaf0" } }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Fields */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={signupInput.memberNick}
                onChange={(e) => setSignupInput({ ...signupInput, memberNick: e.target.value })}
                sx={inputSx}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={signupInput.memberPhone}
                onChange={(e) => setSignupInput({ ...signupInput, memberPhone: e.target.value })}
                sx={inputSx}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={signupInput.memberPassword}
                onChange={(e) => setSignupInput({ ...signupInput, memberPassword: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#8892a4" }}>
                        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />

              {error && (
                <Box sx={{ fontSize: 13, color: "#f87171", bgcolor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "8px", px: 1.5, py: 1 }}>
                  {error}
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                startIcon={loading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <PersonAddIcon />}
                disabled={loading}
                onClick={handleSignup}
                sx={{
                  bgcolor: "#2563eb", borderRadius: "10px", py: 1.4,
                  fontWeight: 600, textTransform: "none", fontSize: 15, mt: 1,
                  "&:hover": { bgcolor: "#1d4ed8" },
                  "&.Mui-disabled": { bgcolor: "rgba(37,99,235,0.4)", color: "#8892a4" },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
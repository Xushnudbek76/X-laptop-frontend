import { useState } from "react";
import {
  Box, Button, TextField, Typography, Avatar, CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "sonner";
import { useGlobals } from "../../components/hooks/useGlobals";
import type { MemberUpdateInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "rgba(255,255,255,0.04)", borderRadius: "10px", color: "#e8eaf0",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(37,99,235,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#2563eb" },
  },
  "& .MuiInputLabel-root": { color: "#8892a4" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#3b82f6" },
};

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>(
    authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick ?? "",
    memberPhone: authMember?.memberPhone ?? "",
    memberAddress: authMember?.memberAddress ?? "",
    memberDesc: authMember?.memberDesc ?? "",
    memberImage: authMember?.memberImage ?? "",
  });

  const handleImageViewer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG formats allowed.");
      return;
    }
    setMemberUpdateInput((prev) => ({ ...prev, memberImage: file as unknown as string }));
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      if (!authMember) { toast.error("Please login first."); return; }
      if (!memberUpdateInput.memberNick || !memberUpdateInput.memberPhone) {
        toast.error("Username and phone are required.");
        return;
      }
      setLoading(true);
      const memberService = new MemberService();
      console.log("Submitting update with input:", memberUpdateInput);
      const result = await memberService.updateMember(memberUpdateInput);
      console.log("Update result:", result);
      setAuthMember(result);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Avatar Upload */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Avatar
          src={image}
          sx={{ width: 80, height: 80, border: "3px solid rgba(37,99,235,0.4)" }}
        />
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#e8eaf0", mb: 0.5 }}>
            Profile Photo
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#8892a4", mb: 1 }}>
            JPG, JPEG, PNG formats only
          </Typography>
          <Button
            component="label"
            size="small"
            startIcon={<CloudUploadIcon fontSize="small" />}
            sx={{
              textTransform: "none", fontSize: 12, fontWeight: 600,
              borderRadius: "8px", color: "#3b82f6",
              border: "1px solid rgba(59,130,246,0.3)",
              bgcolor: "rgba(59,130,246,0.08)",
              "&:hover": { bgcolor: "rgba(59,130,246,0.15)" },
            }}
          >
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageViewer} />
          </Button>
        </Box>
      </Box>

      {/* Fields */}
      <TextField
        fullWidth label="Username" variant="outlined"
        value={memberUpdateInput.memberNick}
        onChange={(e) => setMemberUpdateInput((prev) => ({ ...prev, memberNick: e.target.value }))}
        sx={inputSx}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth label="Phone" variant="outlined"
          value={memberUpdateInput.memberPhone}
          onChange={(e) => setMemberUpdateInput((prev) => ({ ...prev, memberPhone: e.target.value }))}
          sx={inputSx}
        />
        <TextField
          fullWidth label="Address" variant="outlined"
          value={memberUpdateInput.memberAddress}
          onChange={(e) => setMemberUpdateInput((prev) => ({ ...prev, memberAddress: e.target.value }))}
          sx={inputSx}
        />
      </Box>
      <TextField
        fullWidth label="Description" variant="outlined" multiline rows={3}
        value={memberUpdateInput.memberDesc}
        onChange={(e) => setMemberUpdateInput((prev) => ({ ...prev, memberDesc: e.target.value }))}
        sx={inputSx}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : null}
        sx={{
          alignSelf: "flex-end", px: 4, py: 1.2,
          bgcolor: "#2563eb", borderRadius: "10px",
          fontWeight: 600, textTransform: "none", fontSize: 14,
          "&:hover": { bgcolor: "#1d4ed8" },
          "&.Mui-disabled": { bgcolor: "rgba(37,99,235,0.3)", color: "#8892a4" },
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
}
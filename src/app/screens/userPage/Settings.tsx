import { useState } from "react";
import { Button, TextField, Typography, Avatar, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "sonner";
import { useGlobals } from "../../components/hooks/useGlobals";
import type { MemberUpdateInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { resolveAssetUrl } from "../../../lib/config";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>(
    authMember?.memberImage ? resolveAssetUrl(authMember.memberImage) : "/icons/default-user.svg"
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
      if (!authMember) {
        toast.error("Please login first.");
        return;
      }
      if (!memberUpdateInput.memberNick || !memberUpdateInput.memberPhone) {
        toast.error("Username and phone are required.");
        return;
      }
      setLoading(true);
      const memberService = new MemberService();
      const result = await memberService.updateMember(memberUpdateInput);
      setAuthMember(result);
      if (result.memberImage) setImage(resolveAssetUrl(result.memberImage));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-settings">
      <div className="user-settings__avatar-row">
        <Avatar src={image} className="user-settings__avatar" />
        <div>
          <Typography className="user-settings__avatar-title">Profile Photo</Typography>
          <Typography className="user-settings__avatar-copy">JPG, JPEG, PNG formats only</Typography>
          <Button
            component="label"
            size="small"
            startIcon={<CloudUploadIcon fontSize="small" />}
            className="user-settings__upload"
          >
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageViewer} />
          </Button>
        </div>
      </div>

      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={memberUpdateInput.memberNick}
        onChange={(e) => setMemberUpdateInput((prev) => ({ ...prev, memberNick: e.target.value }))}
        className="user-settings__field"
      />

      <div className="user-settings__row">
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          value={memberUpdateInput.memberPhone}
          onChange={(e) =>
            setMemberUpdateInput((prev) => ({ ...prev, memberPhone: e.target.value }))
          }
          className="user-settings__field"
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={memberUpdateInput.memberAddress}
          onChange={(e) =>
            setMemberUpdateInput((prev) => ({ ...prev, memberAddress: e.target.value }))
          }
          className="user-settings__field"
        />
      </div>

      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        value={memberUpdateInput.memberDesc}
        onChange={(e) => setMemberUpdateInput((prev) => ({ ...prev, memberDesc: e.target.value }))}
        className="user-settings__field"
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={16} className="user-settings__spinner" /> : null}
        className="user-settings__submit"
      >
        Save Changes
      </Button>
    </div>
  );
}

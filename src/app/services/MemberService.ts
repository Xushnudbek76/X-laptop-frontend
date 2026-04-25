import axios from "axios";
import { serverApi } from "../../lib/config";
import type { LoginInput, Member, MemberInput, MemberUpdateInput } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/top-users";
      const result = await axios.get(url);

      return result.data;
    } catch (error) {
      console.log("Error, getTopUsers", error);
      throw error;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
  try {
    console.log("Attempting login with input:", input);
    const result = await axios.post(`${this.path}/member/login`, input, {
      withCredentials: true,
    });
    localStorage.setItem("memberData", JSON.stringify(result.data.member));

    return result.data.member;
  } catch (error) {
    console.log("Error, login:", error);
    throw error;
  }
}

public async signup(input: MemberInput): Promise<Member> {
  try {
    const result = await axios.post(`${this.path}/member/signup`, input, {
      withCredentials: true,
    });
    localStorage.setItem("memberData", JSON.stringify(result.data.member));

    return result.data.member;
  } catch (error) {
    console.log("Error, signup:", error);
    throw error;
  }
}

public async logout(): Promise<boolean> {
  try {
   const result = await axios.post(`${this.path}/member/logout`, {}, {
      withCredentials: true,
    });
    localStorage.removeItem("memberData");
    return result.data.logout;
  } catch (error) {
    console.log("Error, logout:", error);
    throw error;
  }
}

public async updateMember(input: MemberUpdateInput): Promise<Member> {
  try {
    const formData = new FormData();
    formData.append("memberNick", input.memberNick ?? "");
    formData.append("memberPhone", input.memberPhone ?? "");
    formData.append("memberAddress", input.memberAddress ?? "");
    formData.append("memberDesc", input.memberDesc ?? "");
    if (input.memberImage instanceof File) {
      formData.append("memberImage", input.memberImage);
    }

    const result = await axios.post(
      `${serverApi}/member/update`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const member: Member = result.data;
    localStorage.setItem("memberData", JSON.stringify(member));
    return member;
  } catch (error) {
    console.log("Error, updateMember:", error);
    throw error;
  }
}
}
export default MemberService;
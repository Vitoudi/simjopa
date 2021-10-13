import { API_URL } from "./apiRef";
import { CreateJournalistDto, GetJournalistDto } from "./journalists";
import { CreateUserDto, LoginResponse, WithToken } from "./users";
import { sendRequestAsFormData } from "./utils/postAsFormData";

export interface SignUpJournalistsResponse extends Omit<LoginResponse, "user"> {
  user?: WithToken<GetJournalistDto>;
}

async function signUp(signUpUrl: string, userInfo: CreateUserDto) {
  const userInfoCopy = { ...userInfo };
  delete userInfoCopy.imgFile;

  const response = await sendRequestAsFormData({
    url: signUpUrl,
    jsonData: userInfoCopy,
    file: userInfo.imgFile || null,
    fileName: "profileImg",
  });

  return response.data as LoginResponse;
}

export async function makeRequestToSignUpUser(userInfo: CreateUserDto) {
  const url = API_URL + "/signup";

  const response = await signUp(url, userInfo)

  return response;
}
export async function makeRequestToSignUpJournalist(journalistInfo: CreateJournalistDto) {
  const url = API_URL + "/signup/journalist";

  const response = await signUp(url, journalistInfo);

  return response;
}

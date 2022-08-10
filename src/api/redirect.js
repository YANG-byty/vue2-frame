import Setting from '@/setting';
export function authLogin() {
  let url = `${Setting.apiBaseURL}/review/auth/client/login?redirect_uri=${Setting.OAUTH_REDIRECT_URI}`;
  return url;
}

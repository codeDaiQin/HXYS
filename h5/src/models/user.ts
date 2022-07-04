import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import to from 'await-to-js';
import { getUserDetail, wechatLogin } from '@/services/user';
import local from '@/utils/localstorage';
import notice from '@/utils/notice';
import { LoginResponse, UserDetailInfo } from '@/interface/user';
import { TOKEN_KEY } from '@/constants/local-storage-key';
import { RootState } from './store';

const namespace = 'user';
const initialState: Partial<UserDetailInfo & LoginResponse> = {};

// login
export const login = createAsyncThunk(
  `${namespace}/login`,
  async (code: string) => {
    const appSecret = import.meta.env.VITE_APP_SECRET;
    const appId = import.meta.env.VITE_APP_ID;
    const [err, user] = await to(wechatLogin({ code, appSecret, appId }));

    if (err) {
      notice.error('登陆出错了');
      throw user;
    }

    return user.token;
  }
);

// getUserInfo
export const getUserInfo = createAsyncThunk(
  `${namespace}/getUserInfo`,
  async () => {
    const [err, user] = await to(getUserDetail());
    if (err) {
      notice.error('登陆状态过期');
      throw err;
    }
    return user;
  }
);

const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    logout: (state) => {
      local.del(TOKEN_KEY);
      state = { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        local.set(TOKEN_KEY, action.payload);
        state.token = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state = { ...state, ...action.payload };
      });
  }
});

export const selectUser = (state: RootState) => state.user;

export const { logout } = userSlice.actions;

export default userSlice.reducer;

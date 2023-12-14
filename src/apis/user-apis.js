import axios from 'axios';
import {PROXY_CLOUD, PROXY_TUE_LOCAL} from '@env';

export const GETUserInfoAction = async (account, token) => {
  if (account == null || token == null) return null;

  try {
    console.log(PROXY_TUE_LOCAL);
    var url = PROXY_TUE_LOCAL + '/api/v1/users/' + account;
    const {data} = await axios({
      method: 'get',
      url: url,
      validateStatus: () => true,
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GETSelfUserInfoAction = async token => {
  if (token == null) return null;

  try {
    console.log(PROXY_TUE_LOCAL);
    var url = PROXY_TUE_LOCAL + '/api/v1/users/self';
    const {data} = await axios({
      method: 'get',
      url: url,
      validateStatus: () => true,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const POSTUploadAvatarAction = async formData => {};

const POSTUpdateUserInfo = async (account, token, payload) => {
  // if (account == null || token == null) return {status: 'fail'};
  try {
    const response = await axios({
      method: 'patch', // Phương thức PATCH thích hợp cho việc cập nhật thông tin người dùng
      url: `${PROXY_TUE_LOCAL}/api/v1/users/${account}`, // Sử dụng đúng đường dẫn API cập nhật thông tin
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      data: payload, // Truyền dữ liệu cập nhật từ payload
    });

    if (response.status === 200) {
      console.log('Profile updated successfully');
    } else {
      console.error('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

const POSTRequestUpgradeAccount = async (account, token, payload) => {};

const GETUpgradeRequestByAccount = async (account, token) => {};

const POSTAcceptRequestUpgrade = async (account, token, payload) => {};

export const GETUserByIdAction = async id => {};

const UserAPIs = {
  GETUserInfoAction,
  POSTUploadAvatarAction,
  POSTUpdateUserInfo,
  GETUpgradeRequestByAccount,
  POSTRequestUpgradeAccount,
  POSTAcceptRequestUpgrade,
  GETUserByIdAction,
  GETSelfUserInfoAction,
};

export default UserAPIs;

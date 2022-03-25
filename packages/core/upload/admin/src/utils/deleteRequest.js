import axiosInstance from './axiosInstance';

export const deleteRequest = (type, id) => {
  return axiosInstance.delete(`/upload/${type}/${id}`);
};

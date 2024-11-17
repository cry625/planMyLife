// src/api/userApi.js
import axios from "axios";

// 设置基础 URL（根据你的后端服务地址进行修改）
const API_BASE_URL = "http://127.0.0.1:8000";

// 创建一个 axios 实例，可以配置一些默认选项，比如 baseURL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // 可以在这里添加 headers、timeout 等其他配置
});

// GET 请求
export const getUser = async (params = {}) => {
  try {
    const response = await apiClient.get("/get", { params });
    return response.data;
  } catch (error) {
    console.error("GET 请求失败:", error);
    throw error; // 可以选择抛出错误以便在调用处处理
  }
};

// DELETE 请求
export const deleteUser = async (params = {}) => {
  try {
    const response = await apiClient.delete("/del", { params });
    return response.data;
  } catch (error) {
    console.error("DELETE 请求失败:", error);
    throw error;
  }
};

// POST 请求

export const createUser = async (data = {}) => {
  try {
    const response = await apiClient.post("/post", data);
    return response.data;
  } catch (error) {
    console.error("POST 请求失败:", error);
    throw error;
  }
};

// PUT 请求

export const updateUser = async (data = {}) => {
  try {
    const response = await apiClient.put("/put", data);
    return response.data;
  } catch (error) {
    console.error("PUT 请求失败:", error);
    throw error;
  }
};

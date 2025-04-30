const BASE_URL = "http://localhost:4000/api"; // 根据你的后端配置修改

export async function apiRequest(path, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
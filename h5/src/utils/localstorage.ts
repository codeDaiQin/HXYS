type localStorageType = {
  time?: number;
  expires?: number;
  value?: any;
};

export const localDel = (name: string) => {
  localStorage.removeItem(name);
};

export const localGet = (name: string) => {
  let data: localStorageType = {};
  try {
    data = JSON.parse(localStorage.getItem(name) ?? '{}');
  } catch (error) {
    data = {};
  }
  const { time = Infinity, value, expires = 0 } = data;
  if (Date.now() > time + expires) {
    localDel(name); // 清除
    return null;
  }
  return value;
};

export const localSet = (
  name: string,
  value: string,
  expires = 60 * 1000 * 24 * 7 // 默认7天过期
) => {
  if (!value) return;
  localStorage.setItem(
    name,
    JSON.stringify({ time: Date.now(), expires, value })
  );
};

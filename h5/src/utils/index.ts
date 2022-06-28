// query转换对象
export const querystring = (url: string) =>
  url
    ? url
        .split('?')[1]
        ?.split('&')
        .reduce((all, cur) => {
          const [key, value] = cur.split('=');
          all[key] = value;
          return all;
        }, {} as Record<string, string>)
    : {};

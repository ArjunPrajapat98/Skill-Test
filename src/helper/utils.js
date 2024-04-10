export const utils = {
  queryString: (params) =>
    Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&"),

  spliceString: (
    text = "", // string
    start = 0, // index
    end = 0, // index
    join = "", // character
    from = "", // character
    to = 0 //lenght or count
  ) => {
    if (from !== "") {
      let ind = text.indexOf(".");
      return (
        text.slice(start, end > ind ? ind : end) +
        join +
        text.slice(ind, text.length)
      );
    } else {
      return text?.slice(start, end);
    }
  },
};

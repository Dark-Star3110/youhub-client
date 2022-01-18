export const getStringToDate = (value: string): string => {
  const time = new Date(value);
  const diff = Date.now() - (time.getTime() - 7 * 60 * 60 * 1000);
  const diff_min = Math.floor(diff / (60 * 1000));
  // console.log(t);

  if (diff_min < 1) return `vài giây trước`;
  else if (diff_min < 60) return `${diff_min} phút trước`;
  else if (diff_min < 24 * 60) return `${Math.floor(diff_min / 60)} giờ trước`;
  else if (diff_min < 24 * 60 * 7)
    return `${Math.floor(diff_min / (60 * 24))} ngày trước`;
  else if (diff_min < 24 * 60 * 30)
    return `${Math.floor(diff_min / (60 * 24 * 7))} tuần trước`;
  else if (diff_min < 24 * 60 * 365)
    return `${Math.floor(diff_min / (24 * 60 * 30))} tháng trước`;
  else return `${Math.floor(diff_min / (24 * 60 * 365))} năm trước`;
};

export const getDateFromString = (value: string): string => {
  const time = new Date(value);
  return `${time.getUTCDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
};

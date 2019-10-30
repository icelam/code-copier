const zeroPad = (n, x) => {
  if (typeof x !== 'number') {
    return n;
  }

  return (n < 10 ? `${'0'.repeat(x)}${n}` : `${n}`);
};

const formatDate = (timestamp) => {
  const lastUpdate = new Date(timestamp);

  if (Number.isNaN(lastUpdate.getTime())) {
    return undefined;
  }

  const year = lastUpdate.getFullYear();
  const month = lastUpdate.getMonth() + 1;
  const date = lastUpdate.getDate();
  const hour = lastUpdate.getHours();
  const minute = lastUpdate.getMinutes();

  return `${year}-${zeroPad(month, 1)}-${zeroPad(date, 1)} ${zeroPad(hour, 1)}:${zeroPad(minute, 1)}`;
};

const formatUtils = { zeroPad, formatDate };

export default formatUtils;

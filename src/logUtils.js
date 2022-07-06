export const wasPingSuccesful = (ping) =>
  ping.ping === null || Number.isNaN(Number(ping.ping));

export const wasPingDropped = (ping) =>
  ping.ping === null || Number.isNaN(Number(ping.ping));

export const getSuccesfulPings = (logs) =>
  logs.map((log) => log.ping.ping).filter(wasPingSuccesful);

export const calculateDroppedPercentage = (logs) => {
  let pings = logs.map((log) => log.ping);
  let dropped = pings.filter(wasPingDropped);

  return ((dropped.length / pings.length) * 100).toFixed(2);
};

export const calculateAverage = (pings) => {
  return (pings.reduce((a, b) => a + b, 0) / pings.length).toFixed(2);
};

export const calculateStdDev = (pings) => {
  let avg = calculateAverage(pings);
  let sum = pings.reduce((a, b) => a + Math.pow(b - avg, 2), 0);

  return Math.sqrt(sum / pings.length).toFixed(2);
};

export const calculateJitter = (pings) => {
  let differences = [];
  for (let i = 0; i < pings.length - 1; i++) {
    differences.push(Math.abs(pings[i] - pings[i + 1]));
  }

  return (differences.reduce((a, b) => a + b, 0) / differences.length).toFixed(
    2
  );
};

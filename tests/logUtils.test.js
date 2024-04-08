import {
  calculateJitter,
  calculateAverage,
  calculateStdDev,
  calculateDroppedPercentage,
  wasPingDropped,
  wasPingSuccesful,
} from "../src/logUtils";

TEST_PINGS = [136, 184, 115, 148, 125];

test("Test jitter", () => {
  expect(calculateJitter(TEST_PINGS)).toBe("43.25");
});

test("Test average", () => {
  expect(calculateAverage(TEST_PINGS)).toBe("141.60");
});

test("Test stddev", () => {
  expect(calculateStdDev(TEST_PINGS)).toBe("23.89");
});

test("Test stddev", () => {
  expect(calculateStdDev(TEST_PINGS)).toBe("23.89");
});

test("Test packet loss percentage", () => {
  expect(
    calculateDroppedPercentage([
      {
        ping: {
          ping: 136,
          datetime: null,
          errorMsg: null,
        },
      },
      {
        ping: {
          ping: 236,
          datetime: null,
          errorMsg: null,
        },
      },
      {
        ping: {
          ping: null,
          datetime: null,
          errorMsg: null,
        },
      },
      {
        ping: {
          ping: null,
          datetime: null,
          errorMsg: null,
        },
      },
      {
        ping: {
          ping: 23,
          datetime: null,
          errorMsg: null,
        },
      },
    ])
  ).toBe("40.00");
});

test("Test packet loss percentage", () => {
  expect(
    calculateDroppedPercentage([
      {
        ping: {
          ping: 136,
          datetime: null,
          errorMsg: null,
        },
      },
      {
        ping: {
          ping: 236,
          datetime: null,
          errorMsg: null,
        },
      },
      {
        ping: {
          ping: null,
          datetime: null,
          errorMsg: null,
        },
      },
      {
        ping: {
          ping: null,
          datetime: null,
          errorMsg: null,
        },
      },
      {
        ping: {
          ping: 23,
          datetime: null,
          errorMsg: null,
        },
      },
    ])
  ).toBe("40.00");
});

test("Test ping was succesful", () => {
  expect(
    wasPingSuccesful({
      ping: null,
      datetime: null,
      errorMsg: null,
    })
  ).toBe(false);

  expect(
    wasPingSuccesful({
      ping: "123",
      datetime: null,
      errorMsg: null,
    })
  ).toBe(true);

  expect(
    wasPingSuccesful({
      ping: 1,
      datetime: null,
      errorMsg: null,
    })
  ).toBe(true);

  expect(
    wasPingSuccesful({
      ping: 1000,
      datetime: null,
      errorMsg: null,
    })
  ).toBe(true);
});

import { calculateDay } from "../client/js/calculateDay";

describe("Testing the date functionality", () => {
    test("Testing the oneDay() calculation", () => {
        expect(calculateDay("2021-07-03")).toBe(11);
    });
});
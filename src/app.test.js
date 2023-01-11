import { filterTimelogsByMonth } from "./projectDashboard";

describe("filterByMonth", () => {
  const timelogs = [
    {
      id: 1,
      project_id: 1,
      issue: "BS-01",
      description: "Work on Basel project",
      time_spent_seconds: 3600,
      timestamp: "2022-12-01T09:00:00Z"
    },
    {
      id: 2,
      project_id: 2,
      issue: "ZH-01",
      description: "Work on Zurich project",
      time_spent_seconds: 7200,
      timestamp: "2022-12-15T10:00:00Z"
    },
    {
      id: 3,
      project_id: 1,
      issue: "BS-02",
      description: "Work on Basel project",
      time_spent_seconds: 9000,
      timestamp: "2023-01-01T11:00:00Z"
    },
    {
      id: 4,
      project_id: 2,
      issue: "ZH-02",
      description: "Work on Zurich project",
      time_spent_seconds: 10800,
      timestamp: "2023-01-05T12:00:00Z"
    }
  ];
  it("should filter timelogs by month and year", () => {
    const filteredTimelogs = filterTimelogsByMonth(timelogs, 11, 2022);
    expect(filteredTimelogs).toEqual([timelogs[0]]);
  });

  it("should return empty array if no match is found", () => {
    const filteredTimelogs = filterTimelogsByMonth(timelogs, 2);
    expect(filteredTimelogs).toEqual([]);
  });

  it("should filter timelogs by month only if year not provided", () => {
    const filteredTimelogs = filterTimelogsByMonth(timelogs, 12);
    expect(filteredTimelogs).toEqual([timelogs[0], timelogs[1], timelogs[2]]);
  });

  it("should filter timelogs by year only if month not provided", () => {
    const filteredTimelogs = filterTimelogsByMonth(timelogs, null, 2023);
    expect(filteredTimelogs).toEqual([timelogs[2], timelogs[3]]);
  });

  it("should return all timelogs if both month and year not provided", () => {
    const filteredTimelogs = filterTimelogsByMonth(timelogs);
    expect(filteredTimelogs).toEqual(timelogs);
  });
});

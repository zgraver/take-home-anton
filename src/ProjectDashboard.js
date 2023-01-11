import React, { useState, useEffect } from "react";
import moment from "moment";
import MonthYearPicker from "./MonthYearPicker";

const getBudgetByProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `https://brudi-take-home.hasura.app/api/rest/project/${projectId}/budget`,
      {
        method: "GET",
        headers: {
          "x-hasura-admin-secret":
            "gnCS7FA8rr3X9bi0XzqzCCjliFNkjIXbU4GLZ5qmzYa78y0diTA4y9BNdNFEsXr4"
        }
      }
    );
    const data = await response.json();
    // console.log(data)
    return data.project_budget[0];
  } catch (error) {
    throw error;
  }
};

const getTimelogsByProjectId = async (projectId) => {
  try {
    const response = await fetch(
      `https://brudi-take-home.hasura.app/api/rest/project/${projectId}/timelogs`,
      {
        method: "GET",
        headers: {
          "x-hasura-admin-secret":
            "gnCS7FA8rr3X9bi0XzqzCCjliFNkjIXbU4GLZ5qmzYa78y0diTA4y9BNdNFEsXr4"
        }
      }
    );
    const data = await response.json();
    // console.log(data);
    return data.timelogs;
  } catch (error) {
    throw error;
  }
};

export const filterTimelogsByMonth = (timelogs, month) => {
  if (!month) return timelogs;
  const filteredTimelogs = timelogs.filter(
    (log) => moment(log.timestamp).format("MM/YY") === month
  );
  return filteredTimelogs;
};

const ProjectBudgetDashboard = ({ projectId }) => {
  const [budget, setBudget] = useState({});
  const [filteredMonth, setFilteredMonth] = useState(null);
  const [timeLogs, setTimeLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const budgetResponse = await getBudgetByProjectId(projectId);
        setBudget(budgetResponse);

        const timeLogResponse = await getTimelogsByProjectId(projectId);
        setTimeLogs(timeLogResponse);

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [projectId]);

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div> Remaining Budget: {budget.amount} </div>
      {timeLogs && timeLogs.length > 0 && (
        <div>
          <br />
          <MonthYearPicker
            timelogs={timeLogs}
            onChange={(month) => setFilteredMonth(month)}
          />
          <ul>
            {filterTimelogsByMonth(timeLogs, filteredMonth).map((timeLog) => (
              <li key={timeLog.id} className="issue">
                <div>
                  {timeLog.issue}: {timeLog.description}
                </div>
                <div>
                  Time Spent:{" "}
                  {Math.round(timeLog.time_spent_seconds / 36) / 100} hours
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectBudgetDashboard;

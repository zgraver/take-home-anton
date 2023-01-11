import "./styles.css";

import React, { useState, useEffect } from "react";
import ProjectBudgetDashboard from "./ProjectDashboard";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://brudi-take-home.hasura.app/api/rest/projects",
          {
            method: "GET",
            headers: {
              "x-hasura-admin-secret":
                "gnCS7FA8rr3X9bi0XzqzCCjliFNkjIXbU4GLZ5qmzYa78y0diTA4y9BNdNFEsXr4"
            }
          }
        );
        const data = await response.json();
        setProjects(data?.project);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects &&
          projects.map((project) => {
            return (
              <>
                <h3 key={project.id}>
                  {project.name} ({project.hourly_rate}/h)
                </h3>
                <ProjectBudgetDashboard projectId={project.id} />
                <br />
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default ProjectList;

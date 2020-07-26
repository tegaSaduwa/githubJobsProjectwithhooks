import React, { useState } from "react";
import { Container } from "react-bootstrap";
import useFetchJobs from "./usefetchJobs";
import Jobs from "./Jobs";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>error...try refreshing</h1>}
      {
        <h1>
          {jobs.map((job) => {
            return <Jobs key={job.id} job={job} hasNextPage={hasNextPage} />;
          })}
        </h1>
      }
    </Container>
  );
}

export default App;

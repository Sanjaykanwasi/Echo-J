import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, searchQuery, company_id]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6f32a8" />;
  }

  return (
    <div>
      <h1 className="font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* Filters */}

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#6f32a8" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😓</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;

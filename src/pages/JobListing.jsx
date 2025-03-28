import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { State } from "country-state-city";

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

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, searchQuery, company_id]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setLocation("");
    setSearchQuery("");
    setCompany_id("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6f32a8" />;
  }

  return (
    <div>
      <h1 className="font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* Filters */}
      <form
        className="h-14 flex w-full gap-4 items-center mb-3"
        onSubmit={handleSearch}
      >
        <Input
          name="search-query"
          className="h-full flex-1 px-4 p-4 border-2 border-purple-950 text-md "
          type="text"
          placeholder="Search here by job titles"
        />
        <Button
          type="submit"
          className={"h-full sm:w-28 cursor-pointer"}
          variant={"green"}
        >
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-full  p-5 border-2 border-purple-950 ">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent
            className={"bg-[#100628] border-2 border-purple-950  !text-white"}
          >
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem
                    className="data-[highlighted]:bg-purple-400 "
                    key={name}
                    value={name}
                  >
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="w-full  p-5 border-2 border-purple-950 ">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent
            className={"bg-[#100628] border-2 border-purple-950  !text-white"}
          >
            {/* <SelectGroup>
              {companies.map(({ name, id }) => {
                return (
                  <SelectItem
                    className="data-[highlighted]:bg-purple-400 "
                    key={name}
                    value={id}
                  >
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup> */}
            <SelectGroup>
              {companies?.length > 0 ? (
                companies.map(({ name, id }) => (
                  <SelectItem
                    key={id}
                    value={id}
                    className="data-[highlighted]:bg-purple-400"
                  >
                    {name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No Companies Found</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={clearFilters}
          variant={"purple"}
          size={"lg"}
          className={"sm:w-1/2"}
        >
          Clear Filters
        </Button>
      </div>

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

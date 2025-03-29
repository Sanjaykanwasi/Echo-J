import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import ApplicationCard from "@/components/ApplicationCard";
import ApplyJobDrawer from "@/components/ApplyJobDrawer";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import MDEditor from "@uiw/react-md-editor";
import {
  BriefcaseIcon,
  DoorClosedIcon,
  DoorOpenIcon,
  MapPinIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJobs());
  };

  useEffect(() => {
    if (isLoaded) {
      fnJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#6f32a8" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="font-extrabold pb-3 text-4xl sm:text-6xl">
          {jobs?.title}
        </h1>
        <img src={jobs?.company?.logo_url} className="h-12" alt={jobs?.title} />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {jobs?.location}
        </div>
        <div className="flex gap-2 ">
          <BriefcaseIcon /> {jobs?.applications?.length} Applicants
        </div>
        <div className="flex gap-2 ">
          {jobs?.isOpen ? (
            <>
              <DoorOpenIcon /> Open{" "}
            </>
          ) : (
            <>
              <DoorClosedIcon /> Open{" "}
            </>
          )}
        </div>
      </div>

      {/* Hiring status */}
      {loadingHiringStatus && <BarLoader width={"100%"} color="#6f32a8" />}
      {jobs?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${
              jobs?.isOpen ? "bg-green-700" : "bg-red-900"
            } p-3 rounded-2xl cursor-pointer`}
          >
            <SelectValue
              placeholder={
                "Hiring Status" + (jobs?.isOpen ? "(Open)" : "(Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent
            side="bottom"
            align="center"
            className="bg-[#100628] border-2 border-green-950 !text-white rounded-2xl p-5 w-auto min-w-[150px] max-w-[90%] sm:min-w-[300px] md:min-w-[400px] cursor-pointer"
            position="popper"
          >
            <SelectItem
              className="data-[state=checked]:bg-purple-400 data-[highlighted]:bg-green-700 text-center p-1 rounded-2xl"
              value={"open"}
            >
              Open
            </SelectItem>
            <SelectItem
              className="data-[state=checked]:bg-purple-400 data-[highlighted]:bg-red-700 p-1 text-center rounded-2xl"
              value={"closed"}
            >
              Closed
            </SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{jobs?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        className="!bg-transparent sm:text-lg"
        source={jobs?.requirements}
      />

      {/* Render applications */}
      {jobs?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={jobs}
          user={user}
          fetchJob={fnJobs}
          applied={jobs?.applications?.find(
            (ap) => ap.candidate_id === user.id
          )}
        />
      )}

      {jobs?.applications?.length > 0 && jobs?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
          {jobs?.applications.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobPage;

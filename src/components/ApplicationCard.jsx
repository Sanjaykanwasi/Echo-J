import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateApplications } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplications,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#6f32a8" />}
      <Card className={"bg-[#241C31] text-white border-none"}>
        <CardHeader>
          <CardTitle className={"flex justify-between font-bold"}>
            {isCandidate
              ? `${application?.job?.title} at ${application?.job?.company?.name}`
              : application?.name}
            <Download
              size={18}
              onClick={handleDownload}
              className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className={"flex flex-col gap-4 flex-1"}>
          <div className="flex flex-col md:flex-row justify-between ">
            <div className="flex gap-2 items-center">
              <BriefcaseBusiness size={15} />
              Experience: {application?.experience} years
            </div>
            <div className="flex gap-2 items-center">
              <School size={15} />
              Education: {application?.education}
            </div>
            <div className="flex gap-2 items-center">
              <Boxes size={15} />
              Skills: {application?.skills}
            </div>
          </div>
          <hr />
        </CardContent>
        <CardFooter>
          {!isCandidate ? (
            <span className="capitalize font-bold ">
              Status: {application?.status}
            </span>
          ) : (
            <></>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ApplicationCard;

import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { saveJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJobs, {
    alreadySaved: saved,
  });

  const { user } = useUser();

  const handleSavedJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJob !== undefined) {
      setSaved(savedJob?.length > 0);
    }
  }, [savedJob]);

  return (
    <Card className={"bg-[#241C31] flex flex-col border-none !text-white"}>
      <CardHeader>
        <CardTitle className={"flex justify-between font-bold"}>
          {job.title}{" "}
          {isMyJob && (
            <Trash2Icon
              size={18}
              fill="red"
              className="text-red-400 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4 flex-1"}>
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>
      <CardFooter className={"flex gap-2"}>
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button className={"w-full"} variant={"purple"} size={"lg"}>
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant={"purple"}
            className={"w-15 cursor-pointer"}
            onClick={handleSavedJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;

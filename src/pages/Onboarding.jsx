import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: { role },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((error) => {
        console.error("Error updating role", error);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6f32a8" />;
  }
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="font-extrabold text-7xl sm:text-8xl tracking-tight">
        I am a...
      </h2>
      <div className="grid mt-16 grid-cols-2 gap-4 w-full md:px-40">
        <Button
          onClick={() => {
            handleRoleSelection("applicant");
          }}
          className={"h-36 text-2xl"}
          variant={"purple"}
        >
          Applicant
        </Button>
        <Button
          onClick={() => {
            handleRoleSelection("recruiter");
          }}
          className={"h-36 text-2xl"}
          variant={"green"}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;

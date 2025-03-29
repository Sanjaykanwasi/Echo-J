import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be more than 1 Year" })
    .int(),
  skills: z.string().min(1, { message: "Mention skills" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Please fill education",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      {
        message: "Only pdf or word file are allowed",
      }
    ),
});

const ApplyJobDrawer = ({ user, job, applied = false, fetchJob }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "Applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          className={"cursor-pointer"}
          variant={job?.isOpen && !applied ? "green" : "destructive"}
          disabled={!job?.isOpen || applied}
          size={"lg"}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#241C31]">
        <DrawerHeader>
          <DrawerTitle className={"text-white"}>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription className={"text-white"}>
            Kindly fill the form below.
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
        >
          <Input
            className={"flex-1 border-1 border-purple-600 p-3"}
            placeholder="Years of Experience"
            type={"number"}
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
          {errors.experience && (
            <p className="text-red-600">{errors.experience.message}</p>
          )}

          <Input
            className={"flex-1 border-1 border-purple-600 p-3"}
            placeholder="Skills (Comma Seperated)"
            type={"text"}
            {...register("skills")}
          />
          {errors.skills && (
            <p className="text-red-600">{errors.skills.message}</p>
          )}

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className={
                      "cursor-pointer border border-red-500 bg-gray-100"
                    }
                    value="Intermediate"
                    id="intermediate"
                  />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex  items-center space-x-2">
                  <RadioGroupItem
                    className={
                      "cursor-pointer border border-red-500 bg-gray-100"
                    }
                    value="Graduate"
                    id="graduate"
                  />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex  items-center space-x-2">
                  <RadioGroupItem
                    className={
                      "cursor-pointer border border-red-500 bg-gray-100"
                    }
                    value="Post Graduate"
                    id="post-graduate"
                  />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />

          {errors.education && (
            <p className="text-red-600">{errors.education.message}</p>
          )}

          <Input
            className={
              "flex-1 border-1 border-purple-600 p-3 file:text-gray-500 cursor-pointer"
            }
            {...register("resume")}
            placeholder="pdf, doc, docx"
            type={"file"}
          />

          {errors.resume && (
            <p className="text-red-600">{errors.resume.message}</p>
          )}

          {errorApply?.message && (
            <p className="text-red-600">{errorApply?.message}</p>
          )}

          {loadingApply && <BarLoader width={"100%"} color="#6f32a8" />}

          <Button
            type="submit"
            variant={"purple"}
            size={"lg"}
            className={"cursor-pointer"}
          >
            Submit
          </Button>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className={"cursor-pointer"} variant="destructive">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;

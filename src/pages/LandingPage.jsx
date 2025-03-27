import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";

const LandingPage = () => {
  return (
    <div>
      <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
        <section className="text-center">
          <h1 className="flex flex-col items-center justify-center text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
            Turn Your Passion into{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-950 text-transparent bg-clip-text">
              a Profession
            </span>
          </h1>
          <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
            "Discover the right job or the right candidate—effortlessly."
          </p>
        </section>
        <div className="flex justify-center gap-6">
          <Link to="/jobs">
            <Button variant="purple" size={"xl"} className="cursor-pointer">
              Get Hired
            </Button>
          </Link>
          <Link to="/post-job">
            <Button variant={"green"} className="cursor-pointer" size="xl">
              Hire the best
            </Button>
          </Link>
        </div>
        {/* Carousel */}

        <Carousel
          plugins={[Autoplay({ delay: 1500 })]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => {
              return (
                <CarouselItem className="basis-1/3 lg:basis-1/6" key={id}>
                  <img
                    className="h-9 sm:h-14 object-contain"
                    src={path}
                    alt={name}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={"bg-[#241C31] border-none !text-white"}>
            <CardHeader>
              <CardTitle>Kickstart your career today</CardTitle>
            </CardHeader>
            <CardContent>
              Take control of your career—search for jobs, submit applications,
              and follow up effortlessly.
            </CardContent>
          </Card>

          <Card className={"bg-[#241C31] border-none !text-white"}>
            <CardHeader>
              <CardTitle>Talent Search</CardTitle>
            </CardHeader>
            <CardContent>
              Find top talent by posting jobs, managing applications, and
              selecting the best candidates with ease.
            </CardContent>
          </Card>
        </section>
        {/* Accordian */}
        <Accordion type="single" collapsible>
          {faqs.map((faq, idx) => {
            return (
              <AccordionItem key={idx} value={`item-${idx + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </main>
    </div>
  );
};

export default LandingPage;

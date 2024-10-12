// Refrences:
// images taken from: https://unsplash.com

import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordian";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="container max-w-screen-2xl">
      <div className="relative bg-black isolate text-white overflow-hidden rounded-lg mt-3">
        <img
          src="/hero.jpg"
          alt=""
          className="-z-10 absolute w-full h-full object-cover opacity-20"
        />
        <div className="py-24 text-center space-y-4">
          <h1 className="text-5xl font-medium">
            {t("The Only place to get movie recommendations")}
          </h1>
          <p className="max-w-lg mx-auto">
            {t(
              "Our philosophy is simple, no more hassle finding movies/tv shows that you are looking for to make your day great"
            )}
          </p>

          <div className="flex justify-center gap-5">
            <Button
              asChild
              className="border-2 text-lg h-auto hover:bg-black/60 border-white bg-black/40 text-white flex items-center gap-2 max-w-fit"
            >
              <Link to={"/movies"}>
                <GoArrowUpRight className="size-6" />
                {t("Browse Movies")}
              </Link>
            </Button>
            <Button asChild className="text-lg h-auto">
              <Link to={"/favourites"}>
                <GoHeartFill className="size-6 mr-1" />
                {t("Your Favourite movies")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="py-14">
        <h2 className="text-4xl font-medium text-center">
          {t("Our dedicated team")}
        </h2>

        <div className="flex gap-5 flex-wrap mt-4">
          <div className="group flex-1 min-w-80 max-w-md">
            <div className="relative bg-[url(https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]">
              <div className="bg-white right-4 left-4 rounded-md absolute bottom-4 p-2">
                <p className="font-medium text-lg">Gordan Willson</p>
                <span className="text-sm text-accent-foreground font-medium">
                  Lead developer
                </span>
              </div>
            </div>
          </div>
          <div className="group flex-1 min-w-80 max-w-md">
            <div className="relative bg-[url(https://images.unsplash.com/photo-1489980869433-d1f7c7ac0fcf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]">
              <div className="bg-white right-4 left-4 rounded-md absolute bottom-4 p-2">
                <p className="font-medium text-lg">Oliver Nacelle </p>
                <span className="text-sm text-accent-foreground font-medium">
                  Payments Support
                </span>
              </div>
            </div>
          </div>
          <div className="group flex-1 min-w-80 max-w-md">
            <div className="relative bg-[url(https://images.unsplash.com/photo-1489980721706-f487dab89c24?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]">
              <div className="bg-white right-4 left-4 rounded-md absolute bottom-4 p-2">
                <p className="font-medium text-lg">Oriando Diggs</p>
                <span className="text-sm text-accent-foreground font-medium">
                  Cheescake Co-founder
                </span>
              </div>
            </div>
          </div>
          <div className="group flex-1 min-w-80 max-w-md">
            <div className="relative bg-[url(https://images.unsplash.com/photo-1474313438662-85ce389c174a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]">
              <div className="bg-white right-4 left-4 rounded-md absolute bottom-4 p-2">
                <p className="font-medium text-lg">Mohamad Al Sufi</p>
                <span className="text-sm text-accent-foreground font-medium">
                  Product co-ordinator
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <p className=" text-2xl font-medium text-center">
          {t("We've been blown away by the support from our customers")} <br />
          {t(
            "Any suggestions for improvements? Give a follow up contact request and we will make a change in a few days!"
          )}
        </p>
        <Button asChild className="mx-auto block max-w-fit mt-5 h-auto text-lg">
          <Link to="/contact" className="flex gap-2 items-center">
            {" "}
            <GoArrowUpRight className="size-6" /> {t("Contact Us")}
          </Link>
        </Button>
      </div>

      <div className="flex justify-center flex-col text-center">
        <h2 className="text-4xl font-medium">{t("FAQ")}</h2>

        <Accordion
          type="single"
          collapsible
          className="text-start  px-10 bg-neutral-50 my-5 rounded-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="ml-0 pl-0">
              {t("How cheescake makes finding a movie or tv show easier?")}
            </AccordionTrigger>
            <AccordionContent>
              <p>
                {t(
                  "Cheesecake provides the user with a list of movies and TV shows to choose from. If that's not enough; we have a dedicated section on"
                )}{" "}
                <Link to={"/home"} className="underline">
                  {t("Home")}
                </Link>{" "}
                {t(
                  "page to make things even easier. If that's also not enough, you can browse a list of movies and TV shows based on genres on the website. Hence, making the hassle of searching through movies a breeze for the user."
                )}
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="ml-0 pl-0 ">
              How much does cheesecake cost?
            </AccordionTrigger>
            <AccordionContent>
              None. That's the value that we provide to our customers. No
              payments, no subscription. All there for free
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="ml-0 pl-0 ">
              What can I watch on cheesecake?
            </AccordionTrigger>
            <AccordionContent>
              Cheesecake have an extensive library of movies, tv shows, genres
              and much more.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="ml-0 pl-0 ">
              Is cheesecake good for kids?
            </AccordionTrigger>
            <AccordionContent>
              Yes, it is. Kids can select movies falling under animation
              category, making the movies suitable for kids to watch
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default About;

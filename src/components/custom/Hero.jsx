import React, { useState } from "react";
import { Button } from "../ui/button";
import { Lightbulb } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import axios from "axios";
import HeroImage from "../../assets/hero.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../../view-trip/components/Footer";

export default function HeroSection() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (token) => handleGoogleLogin(token),
    onError: () => toast("Google authentication failed!"),
  });

  const handleGoogleLogin = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        { headers: { Authorization: `Bearer ${tokenInfo.access_token}` } }
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: resp.data.email,
          name: resp.data.name,
          picture: resp.data.picture,
        })
      );
      toast("Signed in successfully!");
      setOpenSignIn(false);
      navigate("/create-trip");
    } catch {
      toast("Google authentication failed!");
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-20 gap-10 bg-gradient-to-r from-sky-100 via-white to-orange-100">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            Plan Your <br />
            <span className="text-blue-500">AI</span>{" "}
            <span className="text-black">Powered</span>{" "}
            <span className="text-blue-500">Trip</span>
          </h1>

          <div className="mt-6 flex gap-3 items-center justify-center lg:justify-start text-gray-700">
            <Lightbulb className="text-orange-500" />
            <p className="text-lg md:text-xl">Just describe your travel idea</p>
          </div>

          <p className="mt-3 text-blue-600 font-semibold text-lg md:text-xl">
            “Weekend getaway with a mid-range budget in summer”
          </p>

          <p className="mt-4 text-gray-700 text-lg">
            TripMate understands your intent and creates a personalized itinerary —
            places, food, experiences, everything planned for you.
          </p>

          <Button
            className="mt-6 px-8 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg hover:scale-105 transition"
            onClick={() => setOpenSignIn(true)}
          >
            Start Planning
          </Button>
        </div>

        <div className="flex justify-center lg:justify-end w-full">
          <img
            src={HeroImage}
            alt="TripMate AI Travel Planner"
            className="w-full lg:w-[650px] xl:w-[900px] rounded-xl shadow-2xl"
          />
        </div>

        {/* SIGN IN MODAL */}
        <Dialog open={openSignIn} onOpenChange={setOpenSignIn}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="sr-only">Sign In</DialogTitle>
              <DialogDescription className="text-center">
                <img src="/logo.png" alt="TripMate" className="h-16 mx-auto" />
                <h2 className="text-2xl font-bold mt-3 text-blue-600">TripMate</h2>
                <p className="mt-4 font-semibold">Sign in securely with Google</p>

                <Button
                  onClick={login}
                  className="w-full mt-6 flex items-center gap-4 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <FcGoogle className="h-6 w-6" />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 lg:px-24 text-center bg-gradient-to-r from-sky-100 via-white to-orange-100">
        <h2 className="text-4xl sm:text-5xl font-bold text-blue-500">How it works</h2>
        <p className="text-2xl text-gray-700 mt-2 mb-10">
          Follow three simple steps and get your AI-powered travel plan in minutes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { img: "/login.png", title: "Login", desc: "Sign in securely" },
            { img: "/bulb.png", title: "Share Idea", desc: "Tell us your plan" },
            { img: "/plane.png", title: "Get Plan", desc: "AI builds itinerary" },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="bg-gray-900 p-6 rounded-2xl">
                <img src={step.img} alt={step.title} className="h-16 w-16" />
              </div>
              <h3 className="text-xl font-bold text-blue-700">{step.title}</h3>
              <p className="text-black-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="bg-gradient-to-r from-sky-100 via-white to-orange-100 py-16 px-6 lg:px-24">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold">
            Popular on <span className="text-blue-500">TripMate</span>
          </h2>
          <p className="mt-3 text-lg text-gray-700">
            Destinations users love planning with TripMate
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { name: "Paris", img: "/paris.png", tag: "Romantic" },
            { name: "Ooty", img: "/ooty.png", tag: "Hill Station" },
            { name: "Vrindavan", img: "/vrin.png", tag: "Spiritual" },
            { name: "Santorini", img: "/greece.png", tag: "International" },
          ].map((place, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
            >
              <div className="relative">
                <img
                  src={place.img}
                  alt={place.name}
                  className="h-56 w-full object-cover hover:scale-105 transition"
                />
                <span className="absolute top-4 left-4 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  {place.tag}
                </span>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">{place.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

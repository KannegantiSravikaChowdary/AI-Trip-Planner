import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: codeResp => GetUserProfile(codeResp),
    onError: error => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.totalDays ||
      !formData?.budget ||
      !formData?.traveler ||
      formData.totalDays > 5
    ) {
      toast("Please fill all details correctly! Max 5 days allowed.");
      return;
    }

    toast("Form generated.");
    setLoading(true);

    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", formData?.location)
        .replace("{totalDays}", formData?.totalDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      await SaveAiTrip(result?.response?.text());
    } catch (err) {
      console.error(err);
      toast("Failed to generate trip. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async TripData => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    try {
      setLoading(true);
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
        createdAt: serverTimestamp(),
      });
      navigate("/view-trip/" + docId);
    } catch (err) {
      console.error(err);
      toast("Failed to save trip. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = tokenInfo => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        headers: { Authorization: `Bearer ${tokenInfo?.access_token}` },
      })
      .then(resp => {
        const userData = {
          email: resp.data.email,
          name: resp.data.name || resp.data.email.split("@")[0],
          picture: resp.data.picture || null,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch(error => {
        console.error("Failed to fetch user profile:", error);
        toast("Google authentication failed. Please try again!");
      });
  };

  return (
    <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <div>
        <h2 className="font-bold text-3xl">
          Tell us your travel preferences 🌍✈️🌴
        </h2>
        <p className="mt-3 text-gray-600 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
      </div>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination */}
        <div className="mb-5">
          <label className="text-xl mb-3 font-medium">
            What is destination of choice?
          </label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: v => {
                setPlace(v);
                handleInputChange("location", v.label);
              },
            }}
          />
        </div>

        {/* Days */}
        <div className="mb-5">
          <label className="text-xl font-medium">
            How many days are you planning your trip?
          </label>
          <Input
            placeholder="ex.3"
            type="number"
            min="1"
            max="5"
            onChange={v => handleInputChange("totalDays", v.target.value)}
          />
        </div>

        {/* Budget + Travelers */}
        <div>
          <label className="text-xl my-3 font-medium">What is Your Budget?</label>
          <p>The budget is exclusively allocated for activities and dining purposes.</p>
          <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                  formData?.budget === item.title ? "shadow-lg border-cyan-500" : ""
                }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>

          <label className="text-xl font-medium my-3">
            Who do you plan on traveling with on your next adventure?
          </label>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                  formData?.traveler === item.people ? "shadow-lg border-cyan-500" : ""
                }`}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="my-10 flex justify-end">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">Sign In</DialogTitle>
            <DialogDescription className="text-center">
              <div className="flex flex-col items-center">
                <img src="/logo.png" alt="TripMate Logo" className="h-16 w-16" />
                <h1 className="text-2xl font-extrabold mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  TripMate
                </h1>
              </div>
              <h2 className="font-bold text-lg mt-6">
                Sign in to TripMate with Google authentication securely
              </h2>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center bg-blue-500 hover:bg-blue-600 text-white"
              >
                <FcGoogle className="h-7 w-7" /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;

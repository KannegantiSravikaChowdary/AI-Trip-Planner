import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-4">
      {/* Left Section: Logo + Name */}
      <div className="flex items-center gap-2">
        <a href="/">
          <img src="/logo.png" alt="TripMate Logo" className="w-[50px] h-[50px]" />
        </a>
        <a href="/">
          <h1 className="font-bold text-xl text-black">TripMate</h1>
        </a>
      </div>

      {/* Right Section: Auth + Buttons */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className="rounded-full w-[38px] h-[38px]" />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
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

export default Header;
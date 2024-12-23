"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login if someone visits the base URL
    router.push("/login");
  }, [router]);

  return null; // You can also return a loading spinner or similar until the redirection happens
};

export default HomePage;

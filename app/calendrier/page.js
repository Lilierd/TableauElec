"use client"

import CalendrierExec from "@/components/calendrier/CalendrierExec";
import CalendrierManagement from "@/components/calendrier/CalendrierManagement";

export default function CalendrierPage() {
  const calendarUpdate = () => {
    console.log("yo");
  };

  const isAdmin = true;

  return (
    <div>
      { isAdmin ? <CalendrierManagement /> : <CalendrierExec />}
    </div>
  );
}
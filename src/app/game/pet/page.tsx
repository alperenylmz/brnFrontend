"use client";
import { archivo_black } from "@/config/fonts";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  return (
    <main className="flex flex-col bg-gradient-home items-center justify-center">
      <div
        className={
          "flex items-center justify-center h-[70vh] lg:h-[50vh] min-h-[50vh] py-16 w-full"
        }
      >
        <div className={"w-[80vw] lg:w-[40vw] m-auto text-left lg:text-center"}>
          <h2
            className={`${archivo_black.className} uppercase text-4xl lg:text-5xl mb-5`}
          >
            PET
          </h2>
          <p>
            Pet Page
          </p>
        </div>
      </div>
    </main>
  );
}

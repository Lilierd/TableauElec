"use client"

import { ConnectionForm } from "./ConnectionForm";
import { useEffect, useState } from "react";

export default function ConnectModal({ isOpen }) {

    return (
        <div>
            {isOpen && <dialog
                className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-20 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                <div className="flex flex-col bg-white p-1 rounded">
                    <div className="flex flex-row justify-end"><div className="flex flex-col"><button className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-800 transition-all" id="croix1">X</button></div></div>
                    <div className="flex flex-row"><ConnectionForm /></div>
                </div>
            </dialog>}
        </div>
    );
}

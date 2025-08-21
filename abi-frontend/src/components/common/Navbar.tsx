"use client";
import React, { useState, useRef } from "react";
import Logo from "../../../public/globe.svg";
import Link from "next/link";
import { Bell, User, Menu, X, LogOut } from "lucide-react";
import { useClickAway } from "react-use";
import Darkmode from "./Darkmode";
import Image from "next/image";

function NavBar() {


    const navigations = [
        { link: "/", name: "Home" },
        { link: "#", name: "Orders" },
        { link: "#", name: "Contact us" },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [isUserOpen, setIsuserOpen] = useState(false);
    const dropdownRef = useRef(null);

    useClickAway(dropdownRef, () => setIsuserOpen(false));

    return (
        <nav className=" flex items-center justify-between px-4 py-5 font-semibold lg:px-10 border-b-1 border-border">
            {/* shadow */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="absolute inset-0 z-20 h-screen w-screen bg-black/50"
                />
            )}
            {/* ... */}

            {/* left nav */}
            <div className="flex items-center gap-5">
                <Link href={"/"}>
                    <Image src={Logo} alt="logo" />
                </Link>
                <div className="hidden gap-3 md:flex">
                    {navigations.map((item) => (
                        <Link key={item.name} href={item.link} className="hover:scale-105">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* right nav */}
            <div className="flex items-center gap-4">


                <button><Bell className="transform transition duration-300 hover:scale-120" /></button>
                <Darkmode />
                <button className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Menu />
                </button>
                <User
                    onClick={() => setIsuserOpen(!isUserOpen)}
                    className="hidden rounded-2xl border-2 p-0.5 transition-all duration-100 hover:scale-120 hover:border-0 md:flex"
                />

                <div
                    ref={dropdownRef}
                    className={`z-50 ${isUserOpen ? "block" : "hidden"
                        } bg-sub absolute top-9 right-13 my-4 list-none rounded-l-xl rounded-br-xl border-2 border-border text-base`}
                    id="dropdown-user"
                >
                    <div
                        className="flex items-center gap-2 border-b border-border px-4 py-3"
                        role="none"
                    >
                        <User />
                        <div className="px-5">
                            <p className="text-sm">Neil Sims</p>
                        </div>
                    </div>
                    <div className="py-1" role="none">
                        <a
                            href="#"
                            className="hover:bg-red flex items-center gap-2 px-5 py-2 text-sm"
                            role="menuitem"
                        >
                            <LogOut size={17} />
                            <em>Sign out</em>
                        </a>
                    </div>
                </div>

                {/* mobile view sidebar */}
                {isOpen && (
                    <div className="bg-sub fixed top-0 right-0 z-40 flex h-screen flex-col gap-1 transition-all duration-200 ease-in-out">
                        <div className=" flex items-center gap-2 border-b-2 border-border p-5 pt-7">
                            <User size={40} className="rounded-full border-3 p-1" />
                            <div className="flex flex-col gap-1 px-5">
                                <p>Name</p>
                                <p>Email@gmail.com</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="absolute top-4 right-4 hover:scale-110"
                            >
                                <X size={15} />
                            </button>
                        </div>
                        <div className="flex flex-col px-1">
                            {navigations.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.link}
                                    className=" rounded p-2 px-5 pr-6"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <a
                            href="#"
                            className="mt-1 flex items-center gap-2 px-5 py-2 text-sm hover:text-red-500"
                            role="menuitem"
                        >
                            <LogOut size={17} />
                            <em>Sign out</em>
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;

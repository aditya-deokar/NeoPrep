"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  StarsIcon,
  ChevronDown,
  FileText,
  PenBox,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
 

 

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 glass`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
            <Image src={'/logo.svg'} alt="logo" width="25" height="25"/>
          </motion.div>
          <motion.span
            className="text-xl font-bold text-slate-900" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            NeoPrep
          </motion.span>
        </Link>

        {/* Desktop Navigation & SignedIn Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {/* General Nav Links from Navbar */}
          <NavLink href="/dashboard/insights">Industry Insights</NavLink>
          <NavLink href="/dashboard/courses">AI Courses</NavLink>
          <NavLink href="/dashboard/interviews">Interview Prep</NavLink>
          {/* <NavLink href="/dashboard/pricing">Pricing</NavLink> */}

          {/* SignedIn Links from Header */}
          <SignedIn>
            <NavLink href="/dashboard">Dashboard</NavLink>
             {/* Growth Tools Dropdown - using button style for distinction */}
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                   <StarsIcon className='h-4 w-4' />
                   <span>Growth Tools</span>
                   <ChevronDown className='h-4 w-4' />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                 <DropdownMenuItem asChild>
                   <Link href={"/resume"} className='flex items-center gap-2'>
                     <FileText className='h-4 w-4' />
                     <span>Build Resume</span>
                   </Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                   <Link href={"/ai-cover-letter"} className='flex items-center gap-2'>
                     <PenBox className='h-4 w-4' />
                     <span>Cover Letter</span>
                   </Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                   <Link href={"/interview"} className='flex items-center gap-2'>
                     <GraduationCap className='h-4 w-4' />
                     <span>Interview Prep</span>
                   </Link>
                 </DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
          </SignedIn>


        </nav>

        {/* Desktop Authentication */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedOut>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Using Clerk's SignInButton */}
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">
                  Sign In
                </Button>
              </SignInButton>
            </motion.div>
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.4 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <SignInButton mode="modal" redirectUrl="/dashboard">
                 <Button className="bg-primary text-primary-foreground">Get Started</Button>
               </SignInButton>
             </motion.div>
          </SignedOut>

          <SignedIn>
            {/* Using Clerk's UserButton */}
             <UserButton
               appearance={{
                 elements: {
                   avatarBox: "w-9 h-9", // Slightly smaller to fit better
                   userButtonPopoverCard: "shadow-xl",
                   userPreviewMainIdentifier: "font-semibold"
                 }
               }}
               afterSignOutUrl='/'
             />
          </SignedIn>
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-900">
            <div className="flex flex-col space-y-6 p-6">
              {/* General Mobile Links */}
              <MobileNavLink href="/insights" setIsOpen={setIsOpen}>Industry Insights</MobileNavLink>
              <MobileNavLink href="/courses" setIsOpen={setIsOpen}>AI Courses</MobileNavLink>
              <MobileNavLink href="/interviews" setIsOpen={setIsOpen}>Interview Prep</MobileNavLink>
              <MobileNavLink href="/pricing" setIsOpen={setIsOpen}>Pricing</MobileNavLink>

              {/* SignedIn Mobile Links */}
              <SignedIn>
                 <MobileNavLink href="/dashboard" setIsOpen={setIsOpen}>Dashboard</MobileNavLink>
                 {/* Simple links for Growth Tools in mobile */}
                 <MobileNavLink href="/resume" setIsOpen={setIsOpen}>Build Resume</MobileNavLink>
                 <MobileNavLink href="/ai-cover-letter" setIsOpen={setIsOpen}>Cover Letter</MobileNavLink>
                 <MobileNavLink href="/interview" setIsOpen={setIsOpen}>Interview Prep</MobileNavLink>
              </SignedIn>

              {/* Mobile Authentication */}
              <div className="flex flex-col space-y-3 pt-6 border-t dark:border-slate-700">
                 <SignedOut>
                   <SignInButton mode="modal">
                     <Button variant="outline" className="w-full justify-center" onClick={() => setIsOpen(false)}>
                       Sign In
                     </Button>
                   </SignInButton>
                   <SignInButton mode="modal" redirectUrl="/dashboard">
                     <Button className="w-full justify-center bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsOpen(false)}>
                       Get Started
                     </Button>
                   </SignInButton>
                 </SignedOut>
                 <SignedIn>
                    {/* You might want a profile link or just rely on desktop UserButton */}
                    {/* Example: Link to a profile page */}
                    <Button variant="outline" className="w-full justify-center" asChild onClick={() => setIsOpen(false)}>
                      <Link href="/user-profile">My Profile</Link>
                      {/* Clerk manages sign out via UserButton on desktop or specific profile page */}
                    </Button>
                 </SignedIn>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

// Helper component for Desktop Nav Links (from original Navbar)
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Link
        href={href}
        className="text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors relative group"
      >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
      </Link>
    </motion.div>
  );
}

// Helper component for Mobile Nav Links (from original Navbar)
function MobileNavLink({
  href,
  children,
  setIsOpen,
}: {
  href: string;
  children: React.ReactNode;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: 5 }}
    >
      <Link
        href={href}
        className="block py-2 text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400 font-medium text-lg transition-colors"
        onClick={() => setIsOpen(false)} // Close sheet on click
      >
        {children}
      </Link>
    </motion.div>
  );
}
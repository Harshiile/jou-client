"use client";

import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format, isSameDay, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import { Separator } from "../../../components/ui/separator";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../../../components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { CustomCalendar } from "./Calender";

const fadeInUp = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: 15, scale: 0.98, transition: { duration: 0.25, ease: "easeIn" } },
};

export function Schedule({ date, setDate, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleDateSelect = (selectedDate) => {
        if (selectedDate) setDate(selectedDate);
    };

    const handleTimeChange = (type, value) => {
        if (date) {
            const newDate = new Date(date);
            if (type === "hour") {
                newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
            } else if (type === "minute") {
                newDate.setMinutes(parseInt(value));
            } else if (type === "ampm") {
                const hours = newDate.getHours();
                if (value === "AM" && hours >= 12) newDate.setHours(hours - 12);
                if (value === "PM" && hours < 12) newDate.setHours(hours + 12);
            }
            setDate(newDate);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal bg-primary border border-secondary hover:bg-primary hover:text-white transition",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? `${date.toDateString()} - ${date.toLocaleTimeString()}` : <span>MM/DD/YYYY hh:mm aa</span>}
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[50vw] h-screen border-secondary rounded-xl p-0" >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="h-full flex flex-col bg-primary text-white rounded-xl"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Calendar Picker */}
                            <div className="p-4 rounded-t-xl overflow-auto justify-center mt-2.5">
                                <CustomCalendar selectedDate={date} onDateSelect={setDate} />
                            </div>

                            <Separator className="bg-secondary" />

                            {/* Time Picker */}
                            <div className="flex flex-col">
                                <p className="bg-primary text-white text-center py-2 font-medium flex items-center justify-center gap-1 pb-3 rounded-b-xl">
                                    <Clock className="w-4 h-4" /> Time
                                </p>

                                <div className="flex flex-col sm:flex-row flex-1 divide-y sm:divide-y-0 sm:divide-x">
                                    {["hour", "minute", "ampm"].map((type) => (
                                        <ScrollArea
                                            key={type}
                                            className={cn("bg-primary text-white flex-1 h-auto rounded-none")}
                                        >
                                            <div className="flex sm:flex-col p-2 gap-2">
                                                {(type === "hour"
                                                    ? hours.slice().reverse()
                                                    : type === "minute"
                                                        ? Array.from({ length: 12 }, (_, i) => i * 5)
                                                        : ["AM", "PM"]
                                                ).map((val) => {
                                                    const isSelected =
                                                        date &&
                                                        ((type === "hour" && date.getHours() % 12 === val % 12) ||
                                                            (type === "minute" && date.getMinutes() === val) ||
                                                            (type === "ampm" &&
                                                                ((val === "AM" && date.getHours() < 12) ||
                                                                    (val === "PM" && date.getHours() >= 12))));

                                                    return (
                                                        <Button
                                                            key={val}
                                                            size="icon"
                                                            variant="ghost"
                                                            className={cn(
                                                                "sm:w-full shrink-0 aspect-square transition",
                                                                isSelected
                                                                    ? "bg-white text-black font-semibold"
                                                                    : "hover:bg-secondary/50 hover:text-white"
                                                            )}
                                                            onClick={() => handleTimeChange(type, val.toString())}
                                                        >
                                                            {val}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </ScrollArea>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </SheetContent>
        </Sheet>
    );
}

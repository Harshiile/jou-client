"use client";

import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export function Schedule({ date, setDate }) {
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
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal bg-primary border border-secondary hover:bg-primary hover:text-white transition",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MM/dd/yyyy hh:mm aa") : <span>MM/DD/YYYY hh:mm aa</span>}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0 border-secondary">
                <motion.div className="sm:flex" variants={fadeIn} initial="hidden" animate="visible">
                    <Calendar
                        mode="single"
                        className="bg-primary text-white rounded-l-md"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                    />

                    <div className="flex flex-col">
                        <p className="bg-primary text-white text-center py-2 font-medium flex items-center justify-center gap-1">
                            <Clock className="w-4 h-4" /> Time
                        </p>

                        <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            {["hour", "minute", "ampm"].map((type, idx) => (
                                <ScrollArea key={type} className="bg-primary text-white w-64 sm:w-auto">
                                    <div className="flex sm:flex-col p-2 gap-2">
                                        {(type === "hour" ? hours.reverse() : type === "minute" ? Array.from({ length: 12 }, (_, i) => i * 5) : ["AM", "PM"]).map((val) => (
                                            <Button
                                                key={val}
                                                size="icon"
                                                variant={
                                                    date &&
                                                        ((type === "hour" && date.getHours() % 12 === val % 12) ||
                                                            (type === "minute" && date.getMinutes() === val) ||
                                                            (type === "ampm" && ((val === "AM" && date.getHours() < 12) || (val === "PM" && date.getHours() >= 12))))
                                                        ? "default"
                                                        : "ghost"
                                                }
                                                className="sm:w-full shrink-0 aspect-square hover:bg-secondary/50 transition"
                                                onClick={() => handleTimeChange(type, val.toString())}
                                            >
                                                {val}
                                            </Button>
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                                </ScrollArea>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </PopoverContent>
        </Popover>
    );
}
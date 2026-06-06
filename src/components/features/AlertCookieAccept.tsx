"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfoIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertCookieAccept() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("cookie-accept");
        if (!accepted) setVisible(true);
    }, []);

    const handleClick = () => {
        localStorage.setItem("cookie-accept", "true");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 80 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2"
                >
                    <Alert>
                        <AlertTitle className="flex items-center gap-2 mb-3">
                            <InfoIcon />
                            Для работы сайта используются файлы cookie 🍪
                        </AlertTitle>

                        <Button onClick={handleClick} className="w-full">
                            Принять
                        </Button>
                    </Alert>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
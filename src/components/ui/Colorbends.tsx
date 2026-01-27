
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const Colorbends = ({ className }: { className?: string }) => {
    return (
        <div className={cn('absolute inset-0 overflow-hidden pointer-events-none select-none', className)}>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, 0],
                    x: [0, 20, 0],
                    y: [0, 30, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute -top-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-[100px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -60, 0],
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
                className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-l from-cyan-400 to-blue-500 blur-[90px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 120, 0],
                    x: [0, 50, 0],
                    y: [0, -40, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 4,
                }}
                className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-t from-pink-500 to-rose-500 blur-[110px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -90, 0],
                    x: [0, -40, 0],
                    y: [0, 60, 0],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
                className="absolute -bottom-[20%] right-[30%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-b from-blue-400 to-emerald-400 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
        </div>
    );
};

export default Colorbends;

import type { Request, Response } from "express";

export const fastRoute = async (
    _req: Request,
    res: Response
): Promise<void> => {

    const start = performance.now();
    res.json({
        message: "Fast route",
        latency: `${performance.now() - start} ms`,
    });
};


export const slowRoute = async (
    _req: Request,
    res: Response
): Promise<void> => {

    const start = performance.now();

    // Artificial 5 sec delay
    await new Promise(resolve =>
        setTimeout(resolve, 5000)
    );
    res.json({
        message: "Slow route",
        latency: `${performance.now() - start} ms`,
    });
};


export const cpuHeavyRoute = async (
    _req: Request,
    res: Response
): Promise<void> => {

    const start = performance.now();
    let total = 0;
    for (let i = 0; i < 1_000_000_000; i++) {
        total += i;
    }

    res.json({
        message: "CPU heavy route",
        total,
        latency: `${performance.now() - start} ms`,
    });
};


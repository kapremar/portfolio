"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Cpu, Plus, Trash2, Code2 } from "lucide-react";

interface Process {
  id: number;
  name: string;
  arrivalTime: number;
  burstTime: number;
  startTime?: number;
  endTime?: number;
  waitingTime?: number;
  turnaroundTime?: number;
}

export default function ProjectsPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [executedProcesses, setExecutedProcesses] = useState<Process[]>([]);
  const [ganttChart, setGanttChart] = useState<Array<{ process: string; start: number; end: number }>>([]);
  const [nextId, setNextId] = useState(1);
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [animationInterval]);

  const calculateFCFS = () => {
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let time = 0;
    const executed: Process[] = [];
    const gantt: Array<{ process: string; start: number; end: number }> = [];

    sortedProcesses.forEach((process) => {
      const startTime = Math.max(time, process.arrivalTime);
      const endTime = startTime + process.burstTime;
      const waitingTime = startTime - process.arrivalTime;
      const turnaroundTime = endTime - process.arrivalTime;

      executed.push({
        ...process,
        startTime,
        endTime,
        waitingTime,
        turnaroundTime,
      });

      gantt.push({
        process: process.name,
        start: startTime,
        end: endTime,
      });

      time = endTime;
    });

    return { executed, gantt, totalTime: time };
  };

  const handleRun = () => {
    if (processes.length === 0) return;
    
    setIsRunning(true);
    setCurrentTime(0);
    const { executed, gantt, totalTime } = calculateFCFS();
    setExecutedProcesses(executed);
    setGanttChart(gantt);

    let time = 0;
    const interval = setInterval(() => {
      time += 0.5;
      setCurrentTime(time);
      if (time >= totalTime) {
        clearInterval(interval);
        setAnimationInterval(null);
        setIsRunning(false);
      }
    }, 500);
    setAnimationInterval(interval);
  };

  const handleReset = () => {
    if (animationInterval) {
      clearInterval(animationInterval);
      setAnimationInterval(null);
    }
    setIsRunning(false);
    setCurrentTime(0);
    setExecutedProcesses([]);
    setGanttChart([]);
  };

  const handleAddProcess = () => {
    const newProcess: Process = {
      id: nextId,
      name: `P${nextId}`,
      arrivalTime: 0,
      burstTime: 1,
    };
    setProcesses([...processes, newProcess]);
    setNextId(nextId + 1);
  };

  const handleRemoveProcess = (id: number) => {
    setProcesses(processes.filter((p) => p.id !== id));
  };

  const handleUpdateProcess = (id: number, field: "arrivalTime" | "burstTime", value: number) => {
    setProcesses(
      processes.map((p) =>
        p.id === id ? { ...p, [field]: Math.max(0, value) } : p
      )
    );
  };

  const avgWaitingTime =
    executedProcesses.length > 0
      ? executedProcesses.reduce((sum, p) => sum + (p.waitingTime || 0), 0) /
        executedProcesses.length
      : 0;
  const avgTurnaroundTime =
    executedProcesses.length > 0
      ? executedProcesses.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) /
        executedProcesses.length
      : 0;

  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-primary/10 border-2 border-primary inline-block">
              <Cpu className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
            FCFS CPU Scheduling
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive visualization of First Come First Serve CPU scheduling algorithm
          </p>
        </motion.div>

        {/* Process Input Section - New Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border-2 border-border p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 border-2 border-primary">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Processes</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProcess}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground border-2 border-primary font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Process</span>
              <span className="sm:hidden">Add</span>
            </motion.button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Process</th>
                  <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Arrival</th>
                  <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Burst</th>
                  <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-muted-foreground text-sm sm:text-base">
                      No processes added. Click &quot;Add Process&quot; to get started.
                    </td>
                  </tr>
                ) : (
                  processes.map((process, index) => (
                    <motion.tr
                      key={process.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-border"
                    >
                      <td className="p-2 sm:p-3 font-semibold text-foreground text-sm sm:text-base font-mono">{process.name}</td>
                      <td className="p-2 sm:p-3">
                        <input
                          type="number"
                          min="0"
                          value={process.arrivalTime}
                          onChange={(e) =>
                            handleUpdateProcess(
                              process.id,
                              "arrivalTime",
                              parseInt(e.target.value) || 0
                            )
                          }
                          disabled={isRunning}
                          className="w-16 sm:w-20 px-2 py-1 border-2 border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                        />
                      </td>
                      <td className="p-2 sm:p-3">
                        <input
                          type="number"
                          min="1"
                          value={process.burstTime}
                          onChange={(e) =>
                            handleUpdateProcess(
                              process.id,
                              "burstTime",
                              parseInt(e.target.value) || 1
                            )
                          }
                          disabled={isRunning}
                          className="w-16 sm:w-20 px-2 py-1 border-2 border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                        />
                      </td>
                      <td className="p-2 sm:p-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveProcess(process.id)}
                          disabled={isRunning || processes.length === 1}
                          className="p-2 text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent hover:border-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning || processes.length === 0}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground border-2 border-primary font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <Play className="w-5 h-5" />
            Run Algorithm
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-card border-2 border-border text-foreground font-semibold shadow-lg hover:shadow-xl hover:border-primary transition-all text-sm sm:text-base"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </motion.button>
        </motion.div>

        {/* Gantt Chart */}
        {ganttChart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card border-2 border-border p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Gantt Chart</h2>
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max pb-4">
                {ganttChart.map((item, index) => {
                  const isActive = currentTime >= item.start && currentTime < item.end;
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`relative flex flex-col items-center ${
                        isActive ? "z-10" : ""
                      }`}
                    >
                      <motion.div
                        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                        className={`w-16 sm:w-20 h-14 sm:h-16 border-2 flex items-center justify-center font-bold text-xs sm:text-sm font-mono ${
                          isActive
                            ? "bg-primary text-primary-foreground border-primary shadow-lg"
                            : "bg-card text-foreground border-border"
                        }`}
                      >
                        {item.process}
                      </motion.div>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        {item.start}
                      </div>
                      {index === ganttChart.length - 1 && (
                        <div className="text-xs text-muted-foreground mt-1 absolute -right-2 font-mono">
                          {item.end}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Table */}
        {executedProcesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-card border-2 border-border p-4 sm:p-6 mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Results</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Process</th>
                    <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Arrival</th>
                    <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Burst</th>
                    <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Start</th>
                    <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">End</th>
                    <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Waiting</th>
                    <th className="text-left p-2 sm:p-3 text-foreground text-xs sm:text-sm font-mono">Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {executedProcesses.map((process, index) => (
                    <motion.tr
                      key={process.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-border"
                    >
                      <td className="p-2 sm:p-3 font-semibold text-foreground text-sm sm:text-base font-mono">{process.name}</td>
                      <td className="p-2 sm:p-3 text-foreground text-sm sm:text-base font-mono">{process.arrivalTime}</td>
                      <td className="p-2 sm:p-3 text-foreground text-sm sm:text-base font-mono">{process.burstTime}</td>
                      <td className="p-2 sm:p-3 text-foreground text-sm sm:text-base font-mono">{process.startTime}</td>
                      <td className="p-2 sm:p-3 text-foreground text-sm sm:text-base font-mono">{process.endTime}</td>
                      <td className="p-2 sm:p-3 text-foreground text-sm sm:text-base font-mono">{process.waitingTime}</td>
                      <td className="p-2 sm:p-3 text-foreground text-sm sm:text-base font-mono">{process.turnaroundTime}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary/10 border-2 border-primary p-4">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 font-mono">Average Waiting Time</p>
                <p className="text-xl sm:text-2xl font-bold text-primary font-mono">
                  {avgWaitingTime.toFixed(2)}
                </p>
              </div>
              <div className="bg-primary/10 border-2 border-primary p-4">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 font-mono">
                  Average Turnaround Time
                </p>
                <p className="text-xl sm:text-2xl font-bold text-primary font-mono">
                  {avgTurnaroundTime.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

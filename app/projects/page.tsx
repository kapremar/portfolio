"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Gauge,
  Layers,
  ListChecks,
  Play,
  Plus,
  RefreshCw,
  Trash2,
  Workflow,
} from "lucide-react";

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

const defaultProcesses: Process[] = [
  { id: 1, name: "P1", arrivalTime: 0, burstTime: 6 },
  { id: 2, name: "P2", arrivalTime: 2, burstTime: 4 },
  { id: 3, name: "P3", arrivalTime: 3, burstTime: 2 },
];

export default function ProjectsPage() {
  const [processes, setProcesses] = useState<Process[]>(defaultProcesses);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [executedProcesses, setExecutedProcesses] = useState<Process[]>([]);
  const [ganttChart, setGanttChart] = useState<Array<{ process: string; start: number; end: number }>>([]);
  const [nextId, setNextId] = useState(defaultProcesses.length + 1);
  const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [animationInterval]);

  const calculateSJF = () => {
    const pending = processes.map((p) => ({ ...p }));
    const executed: Process[] = [];
    const gantt: Array<{ process: string; start: number; end: number }> = [];
    let time = 0;

    while (pending.length > 0) {
      const available = pending.filter((p) => p.arrivalTime <= time);

      if (available.length === 0) {
        time = Math.min(...pending.map((p) => p.arrivalTime));
        continue;
      }

      available.sort((a, b) => {
        if (a.burstTime === b.burstTime) {
          if (a.arrivalTime === b.arrivalTime) {
            return a.id - b.id;
          }
          return a.arrivalTime - b.arrivalTime;
        }
        return a.burstTime - b.burstTime;
      });

      const nextProcess = available[0];
      const startTime = Math.max(time, nextProcess.arrivalTime);
      const endTime = startTime + nextProcess.burstTime;

      executed.push({
        ...nextProcess,
        startTime,
        endTime,
        waitingTime: startTime - nextProcess.arrivalTime,
        turnaroundTime: endTime - nextProcess.arrivalTime,
      });

      gantt.push({
        process: nextProcess.name,
        start: startTime,
        end: endTime,
      });

      time = endTime;
      const removalIndex = pending.findIndex((p) => p.id === nextProcess.id);
      pending.splice(removalIndex, 1);
    }

    return { executed, gantt, totalTime: time };
  };

  const handleRun = () => {
    if (processes.length === 0) return;

    setIsRunning(true);
    setCurrentTime(0);
    const { executed, gantt, totalTime } = calculateSJF();
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
        p.id === id ? { ...p, [field]: Math.max(field === "burstTime" ? 1 : 0, value) } : p
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-primary bg-primary/10 font-mono text-sm text-primary">
            <Workflow className="w-5 h-5" />
            Shortest Job First · Non-preemptive
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            CPU Scheduling Playground
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Visualize how the shortest available task runs first. Input processes with arrival and
            burst times, then watch the SJF non-preemptive algorithm compute waiting and turnaround
            metrics in real-time.
          </p>
        </motion.header>

        <section className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card border-2 border-border p-4 sm:p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 border-2 border-primary bg-primary/10">
                  <ListChecks className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Process queue</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddProcess}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground border-2 border-primary font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add process
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm font-mono">
                <thead>
                  <tr className="border-b-2 border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                    <th className="p-3">Process</th>
                    <th className="p-3">Arrival</th>
                    <th className="p-3">Burst</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((process, index) => (
                    <motion.tr
                      key={process.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-border"
                    >
                      <td className="p-3 font-semibold text-foreground">{process.name}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          min={0}
                          value={process.arrivalTime}
                          onChange={(e) =>
                            handleUpdateProcess(
                              process.id,
                              "arrivalTime",
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          disabled={isRunning}
                          className="w-20 px-2 py-1 border-2 border-border bg-background text-foreground focus:border-primary"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min={1}
                          value={process.burstTime}
                          onChange={(e) =>
                            handleUpdateProcess(
                              process.id,
                              "burstTime",
                              parseInt(e.target.value, 10) || 1
                            )
                          }
                          disabled={isRunning}
                          className="w-20 px-2 py-1 border-2 border-border bg-background text-foreground focus:border-primary"
                        />
                      </td>
                      <td className="p-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveProcess(process.id)}
                          disabled={isRunning || processes.length === 1}
                          className="p-2 border-2 border-transparent text-destructive hover:border-destructive disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">
              Tip: SJF non-preemptive always commits to the shortest available burst. Matching
              arrival times fall back to the lowest burst, then process ID.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border-2 border-border p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 border-2 border-primary bg-primary/10">
                <Gauge className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-mono">Simulation</p>
                <h2 className="text-xl font-bold text-foreground">Control panel</h2>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Run the scheduler to animate execution. Reset to tweak inputs or test a new scenario.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRun}
                disabled={isRunning || processes.length === 0}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground border-2 border-primary font-semibold shadow-lg disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Run SJF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-border text-foreground font-semibold hover:border-primary"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </motion.button>
            </div>
            <div className="border border-border/70 p-4 text-sm text-muted-foreground space-y-2">
              <p className="flex items-center gap-2 font-semibold text-foreground">
                <Layers className="w-4 h-4 text-primary" />
                Playing with priorities
              </p>
              <p>
                SJF is optimal for reducing average waiting time when all jobs are known. Use it to
                compare against FCFS or RR during your OS review sessions.
              </p>
            </div>
          </motion.div>
        </section>

        {ganttChart.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border-2 border-border p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 border-2 border-primary bg-primary/10">
                <Workflow className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-mono">Gantt monitor</p>
                <h2 className="text-2xl font-bold text-foreground">Execution timeline</h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max pb-4">
                {ganttChart.map((item, index) => {
                  const isActive = currentTime >= item.start && currentTime < item.end;
                  return (
                    <motion.div
                      key={`${item.process}-${index}`}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative flex flex-col items-center"
                    >
                      <motion.div
                        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                        className={`w-20 h-16 border-2 flex items-center justify-center font-bold font-mono ${
                          isActive
                            ? "bg-primary text-primary-foreground border-primary shadow-lg"
                            : "bg-background text-foreground border-border"
                        }`}
                      >
                        {item.process}
                      </motion.div>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">{item.start}</div>
                      {index === ganttChart.length - 1 && (
                        <div className="text-xs text-muted-foreground mt-1 absolute -right-3 font-mono">
                          {item.end}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {executedProcesses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border-2 border-border p-6 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground font-mono">Metrics</p>
                <h2 className="text-2xl font-bold text-foreground">Result tables</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto">
                <div className="border-2 border-primary bg-primary/10 p-4 text-center">
                  <p className="text-xs uppercase text-muted-foreground font-mono">Avg waiting time</p>
                  <p className="text-2xl font-bold text-primary font-mono">
                    {avgWaitingTime.toFixed(2)}
                  </p>
                </div>
                <div className="border-2 border-primary bg-primary/10 p-4 text-center">
                  <p className="text-xs uppercase text-muted-foreground font-mono">Avg turnaround</p>
                  <p className="text-2xl font-bold text-primary font-mono">
                    {avgTurnaroundTime.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm font-mono">
                <thead>
                  <tr className="border-b-2 border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                    <th className="p-3">Process</th>
                    <th className="p-3">Arrival</th>
                    <th className="p-3">Burst</th>
                    <th className="p-3">Start</th>
                    <th className="p-3">End</th>
                    <th className="p-3">Waiting</th>
                    <th className="p-3">Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {executedProcesses.map((process, index) => (
                    <motion.tr
                      key={process.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-border"
                    >
                      <td className="p-3 font-semibold text-foreground">{process.name}</td>
                      <td className="p-3 text-foreground">{process.arrivalTime}</td>
                      <td className="p-3 text-foreground">{process.burstTime}</td>
                      <td className="p-3 text-foreground">{process.startTime}</td>
                      <td className="p-3 text-foreground">{process.endTime}</td>
                      <td className="p-3 text-foreground">{process.waitingTime}</td>
                      <td className="p-3 text-foreground">{process.turnaroundTime}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">
              Use these numbers when writing your lab conclusions or comparing algorithm efficiency
              in OS class defenses.
            </p>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card border-2 border-border p-6 flex flex-col gap-4 text-sm text-muted-foreground"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-mono">Study ideas</p>
          <p>
            Document how SJF compares to FCFS and Round Robin by copying the process list and timing
            outputs. Challenge yourself to recreate this playground using another stack or to add
            context switching costs.
          </p>
          <a
            href="/remar.pdf"
            className="inline-flex items-center gap-2 text-primary font-semibold"
          >
            See the full project write-up
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.section>
      </div>
    </div>
  );
}

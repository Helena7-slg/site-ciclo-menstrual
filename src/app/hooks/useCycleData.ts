"use client"

import { useState, useEffect } from "react"

export interface Cycle {
  id: string
  startDate: string
  endDate?: string
  duration: number
  flow: "light" | "medium" | "heavy"
  notes?: string
}

export interface Symptom {
  id: string
  date: string
  type: string
  severity: "mild" | "moderate" | "severe"
  notes?: string
}

export interface Mood {
  id: string
  date: string
  mood: string
  energy: number
  notes?: string
}

const STORAGE_KEYS = {
  CYCLES: "luna-cycles",
  SYMPTOMS: "luna-symptoms",
  MOODS: "luna-moods",
}

export function useCycleData() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [moods, setMoods] = useState<Mood[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedCycles = localStorage.getItem(STORAGE_KEYS.CYCLES)
    const loadedSymptoms = localStorage.getItem(STORAGE_KEYS.SYMPTOMS)
    const loadedMoods = localStorage.getItem(STORAGE_KEYS.MOODS)

    if (loadedCycles) setCycles(JSON.parse(loadedCycles))
    if (loadedSymptoms) setSymptoms(JSON.parse(loadedSymptoms))
    if (loadedMoods) setMoods(JSON.parse(loadedMoods))
  }, [])

  // Save cycles to localStorage
  useEffect(() => {
    if (cycles.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CYCLES, JSON.stringify(cycles))
    }
  }, [cycles])

  // Save symptoms to localStorage
  useEffect(() => {
    if (symptoms.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SYMPTOMS, JSON.stringify(symptoms))
    }
  }, [symptoms])

  // Save moods to localStorage
  useEffect(() => {
    if (moods.length > 0) {
      localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(moods))
    }
  }, [moods])

  const addCycle = (cycle: Omit<Cycle, "id">) => {
    const newCycle: Cycle = {
      ...cycle,
      id: Date.now().toString(),
    }
    setCycles((prev) => [newCycle, ...prev])
  }

  const addSymptom = (symptom: Omit<Symptom, "id">) => {
    const newSymptom: Symptom = {
      ...symptom,
      id: Date.now().toString(),
    }
    setSymptoms((prev) => [newSymptom, ...prev])
  }

  const addMood = (mood: Omit<Mood, "id">) => {
    const newMood: Mood = {
      ...mood,
      id: Date.now().toString(),
    }
    setMoods((prev) => [newMood, ...prev])
  }

  const getAverageCycleLength = (): number => {
    if (cycles.length < 2) return 28 // Default cycle length

    const completedCycles = cycles.filter((c) => c.endDate)
    if (completedCycles.length === 0) return 28

    const totalDays = completedCycles.reduce((sum, cycle) => {
      const start = new Date(cycle.startDate)
      const end = new Date(cycle.endDate!)
      const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      return sum + days
    }, 0)

    return Math.round(totalDays / completedCycles.length)
  }

  const getNextPeriod = (): number | null => {
    if (cycles.length === 0) return null

    const lastCycle = cycles[0]
    const avgLength = getAverageCycleLength()
    const lastStart = new Date(lastCycle.startDate)
    const nextPeriodDate = new Date(lastStart.getTime() + avgLength * 24 * 60 * 60 * 1000)
    const today = new Date()
    const daysUntil = Math.ceil((nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    return daysUntil > 0 ? daysUntil : null
  }

  const getNextOvulation = (): number | null => {
    if (cycles.length === 0) return null

    const lastCycle = cycles[0]
    const avgLength = getAverageCycleLength()
    const ovulationDay = Math.floor(avgLength / 2) // Typically day 14 for 28-day cycle
    const lastStart = new Date(lastCycle.startDate)
    const ovulationDate = new Date(lastStart.getTime() + ovulationDay * 24 * 60 * 60 * 1000)
    const today = new Date()
    const daysUntil = Math.ceil((ovulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    return daysUntil > 0 ? daysUntil : null
  }

  return {
    cycles,
    symptoms,
    moods,
    addCycle,
    addSymptom,
    addMood,
    getNextPeriod,
    getNextOvulation,
    getAverageCycleLength,
  }
}

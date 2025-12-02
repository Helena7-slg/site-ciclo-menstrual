"use client"

import { useState } from "react"
import { Calendar, Heart, Moon, Sun, Droplets, Activity, BookOpen, Bell, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import CycleTracker from "./components/CycleTracker"
import SymptomsLogger from "./components/SymptomsLogger"
import MoodTracker from "./components/MoodTracker"
import ArticlesSection from "./components/ArticlesSection"
import RemindersPanel from "./components/RemindersPanel"
import { useCycleData } from "./hooks/useCycleData"

export default function Home() {
  const [activeTab, setActiveTab] = useState("tracker")
  const { cycles, symptoms, moods, addCycle, addSymptom, addMood, getNextPeriod, getNextOvulation } = useCycleData()

  const nextPeriod = getNextPeriod()
  const nextOvulation = getNextOvulation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Luna Cycle
                </h1>
                <p className="text-xs text-gray-500">Seu ciclo, seu bem-estar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/pricing">
                <Button variant="outline" size="sm" className="gap-2 border-purple-300 hover:bg-purple-50">
                  <CreditCard className="w-4 h-4" />
                  <span className="hidden sm:inline">Planos</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Lembretes</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/90 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-500" />
                Próxima Menstruação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-600">
                {nextPeriod ? `${nextPeriod} dias` : "Registre seu ciclo"}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {nextPeriod ? "Previsão baseada no seu histórico" : "Comece a monitorar"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Heart className="w-4 h-4 text-purple-500" />
                Próxima Ovulação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {nextOvulation ? `${nextOvulation} dias` : "Em breve"}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {nextOvulation ? "Período fértil aproximado" : "Aguardando dados"}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                Ciclos Registrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{cycles.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                {cycles.length > 0 ? "Continue monitorando" : "Comece hoje"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:inline-grid bg-white/90 backdrop-blur-sm border border-pink-100 shadow-md">
            <TabsTrigger value="tracker" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Ciclo</span>
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Droplets className="w-4 h-4" />
              <span className="hidden sm:inline">Sintomas</span>
            </TabsTrigger>
            <TabsTrigger value="mood" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Sun className="w-4 h-4" />
              <span className="hidden sm:inline">Humor</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Artigos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracker" className="space-y-4">
            <CycleTracker cycles={cycles} onAddCycle={addCycle} />
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-4">
            <SymptomsLogger symptoms={symptoms} onAddSymptom={addSymptom} />
          </TabsContent>

          <TabsContent value="mood" className="space-y-4">
            <MoodTracker moods={moods} onAddMood={addMood} />
          </TabsContent>

          <TabsContent value="articles" className="space-y-4">
            <ArticlesSection />
          </TabsContent>
        </Tabs>

        {/* Reminders Panel */}
        <div className="mt-8">
          <RemindersPanel nextPeriod={nextPeriod} nextOvulation={nextOvulation} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">🔒 Seus dados são privados e seguros</p>
            <p className="text-xs text-gray-500">
              Todas as informações são armazenadas localmente no seu dispositivo.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              Nenhum dado pessoal é compartilhado sem seu consentimento.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { BookOpen, Heart, Activity, Brain, Leaf } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ARTICLES = [
  {
    id: 1,
    title: "Entendendo o Ciclo Menstrual",
    description: "Conheça as fases do ciclo menstrual e como elas afetam seu corpo e mente.",
    category: "Educação",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    content: "O ciclo menstrual tem em média 28 dias e é dividido em quatro fases principais: menstruação, fase folicular, ovulação e fase lútea. Cada fase traz mudanças hormonais que afetam seu corpo e humor de maneiras diferentes.",
  },
  {
    id: 2,
    title: "Alimentação e Ciclo Menstrual",
    description: "Descubra como a nutrição pode ajudar a aliviar sintomas e melhorar seu bem-estar.",
    category: "Nutrição",
    icon: Leaf,
    color: "text-green-500",
    bgColor: "bg-green-50",
    content: "Durante a menstruação, alimentos ricos em ferro como espinafre e feijão ajudam a repor nutrientes. Magnésio encontrado em nozes e sementes pode reduzir cólicas. Evite excesso de cafeína e sal para diminuir inchaço.",
  },
  {
    id: 3,
    title: "Exercícios Durante o Ciclo",
    description: "Aprenda quais atividades físicas são mais adequadas para cada fase do ciclo.",
    category: "Fitness",
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    content: "Durante a menstruação, prefira exercícios leves como yoga e caminhada. Na fase folicular, você tem mais energia para treinos intensos. Durante a ovulação, aproveite o pico de energia. Na fase lútea, reduza a intensidade gradualmente.",
  },
  {
    id: 4,
    title: "Gerenciando Cólicas Menstruais",
    description: "Técnicas naturais e eficazes para aliviar o desconforto menstrual.",
    category: "Saúde",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    content: "Compressas quentes na região abdominal ajudam a relaxar os músculos. Chás de camomila e gengibre têm propriedades anti-inflamatórias. Massagens suaves e posições de yoga como a postura da criança podem trazer alívio.",
  },
  {
    id: 5,
    title: "Saúde Mental e Hormônios",
    description: "Como as mudanças hormonais afetam seu humor e o que fazer a respeito.",
    category: "Bem-estar",
    icon: Brain,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    content: "As flutuações hormonais podem afetar neurotransmissores como serotonina. Pratique autocuidado, mantenha rotina de sono regular, faça atividades prazerosas e não hesite em buscar apoio profissional se necessário.",
  },
]

export default function ArticlesSection() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm border-pink-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <BookOpen className="w-5 h-5 text-pink-500" />
            Artigos sobre Saúde Menstrual
          </CardTitle>
          <CardDescription className="mt-1">
            Informações e dicas para cuidar melhor de você
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ARTICLES.map((article) => {
              const Icon = article.icon
              return (
                <div
                  key={article.id}
                  className={`p-5 rounded-xl border-2 border-gray-100 ${article.bgColor} hover:shadow-lg transition-all cursor-pointer group`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${article.color}`} />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {article.category}
                      </Badge>
                      <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {article.description}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {article.content}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-white shadow-md">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">Dica de Autocuidado</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Lembre-se: cada corpo é único. O que funciona para outras pessoas pode não funcionar para você. 
                Ouça seu corpo, respeite seus limites e não hesite em consultar um profissional de saúde quando necessário.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

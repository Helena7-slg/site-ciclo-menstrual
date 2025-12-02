"use client"

import { Check, Moon, Sparkles, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para começar a monitorar seu ciclo",
      icon: Moon,
      iconColor: "text-pink-500",
      bgGradient: "from-pink-50 to-purple-50",
      borderColor: "border-pink-200",
      buttonVariant: "outline" as const,
      features: [
        "Registro de ciclos menstruais",
        "Previsão de próxima menstruação",
        "Rastreamento básico de sintomas",
        "Artigos educativos",
        "Armazenamento local seguro"
      ]
    },
    {
      name: "Premium",
      price: "R$ 9,90",
      period: "/mês",
      description: "Recursos avançados para melhor autocuidado",
      icon: Sparkles,
      iconColor: "text-purple-500",
      bgGradient: "from-purple-50 to-blue-50",
      borderColor: "border-purple-300",
      buttonVariant: "default" as const,
      popular: true,
      features: [
        "Tudo do plano Gratuito",
        "Previsão de ovulação",
        "Rastreamento avançado de humor",
        "Gráficos e análises detalhadas",
        "Lembretes personalizados",
        "Exportação de dados",
        "Suporte prioritário"
      ]
    },
    {
      name: "Pro",
      price: "R$ 19,90",
      period: "/mês",
      description: "Experiência completa com IA e insights",
      icon: Crown,
      iconColor: "text-amber-500",
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-300",
      buttonVariant: "default" as const,
      features: [
        "Tudo do plano Premium",
        "Insights com Inteligência Artificial",
        "Recomendações personalizadas",
        "Consultas com especialistas",
        "Sincronização em nuvem",
        "Acesso a comunidade exclusiva",
        "Conteúdo premium ilimitado",
        "Sem anúncios"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Luna Cycle
                </h1>
                <p className="text-xs text-gray-500">Seu ciclo, seu bem-estar</p>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
            Planos Acessíveis
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Escolha o plano ideal para você
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comece gratuitamente e faça upgrade quando precisar de mais recursos.
            <br className="hidden sm:block" />
            Todos os planos incluem segurança e privacidade total dos seus dados.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card
                key={plan.name}
                className={`relative bg-gradient-to-br ${plan.bgGradient} border-2 ${plan.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  plan.popular ? "ring-4 ring-purple-300 ring-opacity-50" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <Icon className={`w-8 h-8 ${plan.iconColor}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.buttonVariant === "default"
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg"
                        : "border-2 border-pink-300 hover:bg-pink-50"
                    }`}
                    size="lg"
                  >
                    {plan.price === "R$ 0" ? "Começar Grátis" : "Assinar Agora"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
            Perguntas Frequentes
          </h3>
          <div className="space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="text-lg">Posso cancelar a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
                  Seus dados permanecerão seguros e você continuará com acesso ao plano gratuito.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="text-lg">Meus dados estão seguros?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutamente! Todos os dados são criptografados e armazenados com segurança.
                  No plano gratuito, seus dados ficam apenas no seu dispositivo. Nos planos pagos,
                  usamos criptografia de ponta a ponta para sincronização em nuvem.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="text-lg">Posso fazer upgrade depois?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
                  Todos os seus dados serão preservados durante a mudança.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <Card className="bg-gradient-to-r from-pink-500 to-purple-500 border-0 shadow-2xl max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
                Pronta para começar?
              </CardTitle>
              <CardDescription className="text-pink-100 text-lg">
                Junte-se a milhares de mulheres que já cuidam melhor da sua saúde
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg text-lg px-8"
                >
                  Começar Gratuitamente
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">🔒 Seus dados são privados e seguros</p>
            <p className="text-xs text-gray-500">
              Todas as informações são protegidas com criptografia de ponta a ponta.
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

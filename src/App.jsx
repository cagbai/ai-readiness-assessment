import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Brain, CheckCircle, ArrowRight, BarChart3, Target, Users, Shield, Cog, TrendingUp, Lightbulb, Info } from 'lucide-react'
import './App.css'

const assessmentData = {
  "AI Strategy & Business Alignment": {
    icon: Target,
    questions: [
      {
        text: "To what extent is your organization's AI strategy clearly defined and directly linked to specific, measurable business objectives?",
        importance: "A clear AI strategy ensures that AI initiatives are not isolated experiments but are instead purposeful investments designed to deliver tangible business value. This alignment is crucial for successful project definition during the discovery phase."
      },
      {
        text: "How well does your leadership understand the potential of AI and actively champion its adoption across the organization?",
        importance: "Strong leadership buy-in and understanding are critical for securing resources, overcoming organizational inertia, and fostering a culture that embraces AI. This support is vital for smooth project execution from discovery to deployment."
      }
    ]
  },
  "Data Foundation & Governance": {
    icon: BarChart3,
    questions: [
      {
        text: "How accessible, clean, and well-structured is the data required for potential AI projects within your organization?",
        importance: "High-quality, accessible data is the lifeblood of effective AI models. Poor data quality or accessibility can significantly delay or derail AI projects, making data readiness a key factor in the discovery phase."
      },
      {
        text: "Are there established processes for data governance, including data collection, storage, security, and privacy compliance?",
        importance: "Robust data governance ensures that data used for AI is managed responsibly, securely, and in compliance with regulations. This minimizes legal and ethical risks and builds trust in AI systems."
      }
    ]
  },
  "Technology Infrastructure & Tools": {
    icon: Cog,
    questions: [
      {
        text: "Does your organization have the necessary computing power (e.g., cloud, on-premise GPUs) and development environments to support AI model training and deployment?",
        importance: "Adequate technological infrastructure is fundamental for developing and deploying AI solutions efficiently. Understanding existing capabilities helps in scoping projects and identifying infrastructure gaps early."
      },
      {
        text: "How familiar are your technical teams with modern AI/ML tools, frameworks, and platforms (e.g., TensorFlow, PyTorch, cloud AI services)?",
        importance: "Proficiency with relevant tools and platforms accelerates development and ensures that solutions can be built and integrated effectively. This informs the choice of technology stack during the discovery phase."
      }
    ]
  },
  "Talent, Skills & Culture": {
    icon: Users,
    questions: [
      {
        text: "Does your organization possess or have access to the necessary AI/ML talent (e.g., data scientists, ML engineers, AI product managers) to drive AI initiatives?",
        importance: "The availability of skilled personnel is paramount for successful AI project delivery. Identifying talent gaps early allows for strategic hiring, training, or partnership decisions."
      },
      {
        text: "How open and adaptable is your organizational culture to embracing new AI technologies, experimenting, and learning from failures?",
        importance: "An innovative and adaptable culture fosters experimentation and continuous improvement, which are essential for navigating the iterative nature of AI development and maximizing its potential."
      }
    ]
  },
  "Risk Management & Ethical AI": {
    icon: Shield,
    questions: [
      {
        text: "Are there clear processes for identifying, assessing, and mitigating risks associated with AI (e.g., bias, security vulnerabilities, explainability)?",
        importance: "Proactive risk management is crucial for building trustworthy and responsible AI systems. Addressing these concerns early in the discovery phase prevents costly issues down the line."
      },
      {
        text: "Has your organization considered and established guidelines for the ethical implications of AI development and deployment?",
        importance: "Ethical considerations are increasingly important for AI adoption. Establishing clear ethical guidelines ensures that AI solutions are developed and used responsibly, aligning with societal values and avoiding negative consequences."
      }
    ]
  }
}

const recommendations = {
  "0-2": {
    title: "AI Novice - Foundational Exploration",
    description: "Organizations in this range are at the very beginning of their AI journey, with limited or no established AI strategy, data infrastructure, or talent. They are likely exploring the basic concepts of AI and its potential relevance.",
    color: "bg-red-100 text-red-800",
    recommendations: [
      "AI Strategy Workshop & Visioning: We can facilitate an intensive workshop with your leadership to define a clear AI vision, identify potential high-impact use cases, and align AI initiatives with your core business objectives. This lays the groundwork for a successful discovery phase.",
      "Data Landscape Assessment: Our team can conduct a preliminary assessment of your existing data infrastructure, identifying key data sources, assessing data quality, and outlining initial steps for data preparation crucial for any AI project.",
      "Pilot Project Identification & Scoping: We can help you identify a low-risk, high-value pilot AI project that can serve as a learning experience and demonstrate early ROI, providing a concrete starting point for our discovery phase engagement."
    ]
  },
  "3-4": {
    title: "AI Explorer - Strategic Planning",
    description: "These organizations have some nascent interest in AI and may have isolated initiatives, but lack a cohesive strategy, robust data governance, or integrated technology. They are in the early stages of planning their AI roadmap.",
    color: "bg-orange-100 text-orange-800",
    recommendations: [
      "AI Roadmap Development: We can collaborate to develop a detailed AI roadmap, prioritizing use cases, outlining technology requirements, and defining a phased implementation plan. This structured approach is central to our discovery phase process.",
      "Data Governance & Preparation Consulting: Our experts can assist in establishing robust data governance frameworks and implementing data preparation strategies to ensure your data is AI-ready, minimizing roadblocks during model development.",
      "Technology Stack Advisory: We provide guidance on selecting the most appropriate AI/ML tools and platforms for your specific needs, ensuring your technology infrastructure supports scalable and efficient AI development."
    ]
  },
  "5-6": {
    title: "AI Builder - Capability Development",
    description: "Organizations at this level have initiated AI projects and are actively building core capabilities in data, technology, and talent. They are focused on developing and implementing initial AI solutions but may face challenges in scaling or governance.",
    color: "bg-yellow-100 text-yellow-800",
    recommendations: [
      "AI Solution Co-Development & Prototyping: Partner with us to co-develop and prototype AI solutions, leveraging our expertise to accelerate your development cycles and build robust, scalable applications. This is where our core development services come into play.",
      "MLOps & Deployment Strategy: We can help you design and implement MLOps practices to streamline the deployment, monitoring, and maintenance of your AI models, ensuring operational efficiency and reliability.",
      "Talent Upskilling & Mentorship Programs: Our team can provide tailored training and mentorship to your internal teams, enhancing their AI/ML capabilities and fostering a culture of continuous learning and innovation."
    ]
  },
  "7-8": {
    title: "AI Integrator - Operationalizing AI",
    description: "These organizations have a solid AI foundation with ongoing projects and established practices. They are looking to integrate AI more deeply into their operations, scale successful solutions, and mature their MLOps practices.",
    color: "bg-blue-100 text-blue-800",
    recommendations: [
      "Advanced AI Integration & Optimization: We specialize in integrating complex AI solutions into existing enterprise systems, optimizing performance, and ensuring seamless operational workflows.",
      "Scalable AI Architecture Design: Our architects can design scalable and resilient AI architectures that support the expansion of your AI initiatives across multiple departments and business units.",
      "Ethical AI & Risk Mitigation Frameworks: We can help you develop and implement advanced ethical AI frameworks and robust risk mitigation strategies to ensure responsible and compliant AI operations at scale."
    ]
  },
  "9-10": {
    title: "AI Innovator - Advanced & Transformative AI",
    description: "Organizations in this category are leaders in AI adoption, with mature strategies, robust infrastructure, and a strong AI-driven culture. They are continuously innovating, leveraging AI for significant business value, and exploring cutting-edge applications.",
    color: "bg-green-100 text-green-800",
    recommendations: [
      "Next-Generation AI Research & Development: Collaborate with our R&D team to explore and develop cutting-edge AI technologies, positioning your organization at the forefront of AI innovation.",
      "AI-Driven Business Transformation Consulting: We can partner with you to identify and implement AI-driven transformations across your core business processes, unlocking new revenue streams and operational efficiencies.",
      "AI Thought Leadership & Industry Partnerships: Leverage our network and expertise to establish your organization as a thought leader in the AI space, fostering strategic partnerships and driving industry-wide advancements."
    ]
  }
}

function App() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [currentCategory, setCurrentCategory] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  const categories = Object.keys(assessmentData)
  const totalQuestions = categories.length * 2

  const handleAnswer = (score) => {
    const categoryName = categories[currentCategory]
    const questionIndex = currentQuestion
    
    setAnswers(prev => ({
      ...prev,
      [`${categoryName}-${questionIndex}`]: score
    }))

    // Move to next question
    if (currentQuestion < 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1)
      setCurrentQuestion(0)
    } else {
      // Assessment complete
      calculateResults()
    }
  }

  const calculateResults = () => {
    let totalScore = 0
    const categoryScores = {}

    categories.forEach(category => {
      let categoryTotal = 0
      for (let i = 0; i < 2; i++) {
        categoryTotal += answers[`${category}-${i}`] || 0
      }
      categoryScores[category] = categoryTotal
      totalScore += categoryTotal
    })

    // Total possible score: 5 categories × 2 questions × 5 points = 50
    // Normalize to 0-10 scale: (totalScore / 50) × 10
    const normalizedScore = ((totalScore / 50) * 10).toFixed(1)
    
    let recommendationKey = "0-2"
    if (normalizedScore >= 9) recommendationKey = "9-10"
    else if (normalizedScore >= 7) recommendationKey = "7-8"
    else if (normalizedScore >= 5) recommendationKey = "5-6"
    else if (normalizedScore >= 3) recommendationKey = "3-4"

    setResults({
      totalScore: normalizedScore,
      categoryScores,
      recommendation: recommendations[recommendationKey]
    })
    setCurrentStep('results')
  }

  const getProgress = () => {
    const answeredQuestions = Object.keys(answers).length
    return (answeredQuestions / totalQuestions) * 100
  }

  const startAssessment = () => {
    setCurrentStep('assessment')
    setCurrentCategory(0)
    setCurrentQuestion(0)
    setAnswers({})
  }

  const resetAssessment = () => {
    setCurrentStep('welcome')
    setCurrentCategory(0)
    setCurrentQuestion(0)
    setAnswers({})
    setResults(null)
  }

  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Brain className="h-16 w-16 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">AI Readiness Assessment</CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-4">
              Discover how ready your organization is for implementing AI workflows and leveraging AI in your business.
              This streamlined assessment will evaluate your organization across 5 key areas and provide personalized recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category, index) => {
                const IconComponent = assessmentData[category].icon
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                    <span className="font-medium text-gray-700">{category}</span>
                  </div>
                )
              })}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">
                The assessment takes approximately 3-5 minutes to complete and consists of 10 questions.
              </p>
              <Button onClick={startAssessment} size="lg" className="w-full md:w-auto">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === 'assessment') {
    const categoryName = categories[currentCategory]
    const IconComponent = assessmentData[categoryName].icon
    const questionData = assessmentData[categoryName].questions[currentQuestion]

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {Object.keys(answers).length + 1} of {totalQuestions}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(getProgress())}% Complete
              </span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Question Card */}
            <div className="lg:col-span-2">
              <Card className="w-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                    <Badge variant="secondary" className="text-sm">
                      {categoryName}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {questionData.text}
                  </CardTitle>
                  <CardDescription>
                    Rate your organization on a scale of 1 to 5, where 1 indicates very low readiness and 5 indicates very high readiness.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-3 mb-6">
                    {[...Array(5)].map((_, index) => (
                      <Button
                        key={index + 1}
                        variant="outline"
                        className="h-16 w-full text-lg font-medium hover:bg-blue-50 hover:border-blue-300 flex flex-col items-center justify-center"
                        onClick={() => handleAnswer(index + 1)}
                      >
                        <span className="text-xl font-bold">{index + 1}</span>
                        <span className="text-xs mt-1">
                          {index === 0 && "Very Low"}
                          {index === 1 && "Low"}
                          {index === 2 && "Moderate"}
                          {index === 3 && "High"}
                          {index === 4 && "Very High"}
                        </span>
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Not Ready</span>
                    <span>Fully Ready</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel with Context */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-600" />
                    Why This Matters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {questionData.importance}
                  </p>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Discovery Phase Impact</h4>
                    <p className="text-sm text-blue-800">
                      Understanding this aspect helps us better scope your AI project requirements and identify potential challenges early in our collaboration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Card className="w-full mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Assessment Complete!</CardTitle>
              <CardDescription className="text-lg text-gray-600 mt-2">
                Here are your AI readiness results and personalized recommendations for our services.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Your AI Readiness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {results.totalScore}
                  </div>
                  <div className="text-lg text-gray-600">out of 10</div>
                </div>
                
                <Badge className={`w-full justify-center py-2 text-lg ${results.recommendation.color}`}>
                  {results.recommendation.title}
                </Badge>
                
                <p className="text-gray-600 mt-4 text-center">
                  {results.recommendation.description}
                </p>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-gray-900">Category Breakdown:</h4>
                  {categories.map((category, index) => {
                    const score = results.categoryScores[category]
                    // Max score per category: 2 questions × 5 points = 10
                    const percentage = (score / 10) * 100
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{category}</span>
                          <span>{score}/10</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  How We Can Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.recommendation.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Ready to Get Started?</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Contact us to discuss how we can help accelerate your AI journey with our discovery phase services.
                  </p>
                  <Button className="w-full" size="sm">
                    Schedule a Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button onClick={resetAssessment} variant="outline" size="lg">
              Take Assessment Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default App


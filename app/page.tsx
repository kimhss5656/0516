"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Instagram,
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Palette,
  Film,
  Eye,
  Layers,
  Quote,
} from "lucide-react"

// ============================================
// 애니메이션 Variants
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
}

// ============================================
// 데이터 정의
// ============================================

/** [자동생성] 수정 가능 - 핵심 역량 데이터 */
const skills = [
  {
    icon: Sparkles,
    title: "감정 기반 예술 창작",
    description: "감정과 기억을 시각적 경험으로 풀어내는 작업",
    sub: "몰입형 감성 연출"
  },
  {
    icon: Film,
    title: "스토리텔링 디렉션",
    description: "장면과 분위기를 연결하는 서사 중심 구성",
    sub: "감정 흐름 기반 연출"
  },
  {
    icon: Eye,
    title: "감각 큐레이션",
    description: "향기, 색감, 사운드, 공간 무드 연결",
    sub: "오감 기반 경험 설계"
  },
  {
    icon: Palette,
    title: "브랜딩 감각",
    description: "예술성과 브랜드 감도를 동시에 담는 비주얼 설계",
    sub: "감성 브랜딩"
  },
  {
    icon: Layers,
    title: "무드 비주얼 디자인",
    description: "색감과 여백 중심의 감성 표현",
    sub: "시네마틱 무드 연출"
  }
]

/** [자동생성] 수정 가능 - 스킬 & 툴 데이터 */
const toolCategories = [
  {
    category: "Art Direction",
    tools: [
      { name: "Photoshop", level: 95 },
      { name: "Lightroom", level: 90 }
    ]
  },
  {
    category: "Visual Storytelling",
    tools: [
      { name: "Illustrator", level: 85 },
      { name: "Blender", level: 75 }
    ]
  },
  {
    category: "Creative Tools",
    tools: [
      { name: "Figma", level: 88 }
    ]
  }
]

/** [더미] 수정 필요 - 프로젝트 데이터 */
const projects = [
  {
    id: 1,
    title: "Avoir28",
    description: "28살의 감정을 향기로 기록한 시네마틱 아트 프로젝트",
    role: "Creative Direction / Art Concept",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop",
    tags: ["향기", "감정", "시네마틱"]
  },
  {
    id: 2,
    title: "Blue Memory",
    description: "푸른 색감과 빛의 질감으로 기억을 시각화한 감정 아카이브",
    role: "Visual Artist",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop",
    tags: ["기억", "빛", "푸른색"]
  },
  {
    id: 3,
    title: "Silent Seasons",
    description: "계절의 감정 흐름을 공간과 색감으로 표현한 몰입형 전시 프로젝트",
    role: "Installation Artist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    tags: ["계절", "공간", "전시"]
  },
  {
    id: 4,
    title: "Fragments of Emotion",
    description: "감정의 잔상을 추상적 비주얼로 풀어낸 디지털 아트 시리즈",
    role: "Creative Artist",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&h=600&fit=crop",
    tags: ["디지털", "추상", "감정"]
  }
]

/** [자동생성] 수정 가능 - 타임라인 데이터 */
const timeline = [
  { year: "2022", event: "감정 기반 비주얼 작업 시작" },
  { year: "2023", event: "개인 아트 프로젝트 전개" },
  { year: "2024", event: "감각 기반 브랜드 및 예술 작업 확장" },
  { year: "2025", event: "몰입형 감정 아카이브 프로젝트 진행 중" }
]

/** [자동생성] 수정 가능 - 추천사 데이터 */
const testimonials = [
  {
    quote: "김혜수의 작업은 단순히 보는 경험이 아니라, 감정을 체험하게 만드는 힘이 있습니다.",
    author: "Creative Director"
  },
  {
    quote: "브랜드와 예술 사이를 자연스럽게 연결하는 감각이 인상적이었습니다.",
    author: "Visual Producer"
  },
  {
    quote: "빛과 분위기를 다루는 방식이 굉장히 섬세합니다.",
    author: "Art Collaborator"
  }
]

/** [더미] 수정 필요 - 소셜 링크 */
const socialLinks = {
  instagram: "https://instagram.com",
  behance: "https://behance.net",
  email: "mailto:hello@example.com"
}

const navItems = [
  { id: "about", label: "소개" },
  { id: "skills", label: "역량" },
  { id: "projects", label: "작업" },
  { id: "timeline", label: "여정" },
  { id: "testimonials", label: "협업" },
  { id: "contact", label: "문의" }
]

// ============================================
// 메인 컴포넌트
// ============================================
export default function ArtistPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // 현재 섹션 감지
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      {/* ============================================ */}
      {/* 네비게이션 */}
      {/* ============================================ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : ""
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* 로고 */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-serif text-xl tracking-wide text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              김혜수
            </motion.button>

            {/* 데스크탑 네비게이션 */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm tracking-wider transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* 모바일 메뉴 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
            >
              <div className="px-6 py-8 space-y-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-lg tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        {/* ============================================ */}
        {/* Hero Section */}
        {/* ============================================ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* 배경 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2E3A59]/40 via-background to-[#1a1510]/60" />
          
          {/* 배경 글로우 효과 */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2E3A59]/10 rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* 텍스트 영역 */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center lg:text-left"
              >
                {/* 프로필 이미지 (모바일) */}
                <motion.div 
                  variants={scaleIn}
                  className="lg:hidden mb-12 flex justify-center"
                >
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-4 ring-offset-background">
                      {/** [더미] 수정 필요 - 프로필 이미지 */}
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                        alt="김혜수 프로필"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl -z-10" />
                  </div>
                </motion.div>

                <motion.p 
                  variants={fadeInUp}
                  className="text-sm tracking-[0.3em] text-primary/80 mb-6"
                >
                  {/** [자동생성] 수정 가능 */}
                  ARTIST / EMOTIONAL CREATOR
                </motion.p>

                <motion.h1 
                  variants={fadeInUp}
                  className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8"
                >
                  김혜수
                </motion.h1>

                <motion.p 
                  variants={fadeInUp}
                  className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light leading-relaxed mb-6 text-balance"
                >
                  {/** [자동생성] 수정 가능 */}
                  감정은 사라지지 않습니다.
                  <br />
                  <span className="text-foreground/90">단지 다른 형태로 남겨질 뿐.</span>
                </motion.p>

                <motion.p 
                  variants={fadeInUp}
                  className="text-muted-foreground mb-12 max-w-lg mx-auto lg:mx-0"
                >
                  {/** [자동생성] 수정 가능 */}
                  감정을 예술의 언어로 기록하는 아티스트
                </motion.p>

                {/* CTA 버튼 */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                >
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base tracking-wide"
                    onClick={() => scrollToSection("contact")}
                  >
                    작업 문의하기
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border hover:bg-secondary px-8 py-6 text-base tracking-wide"
                    onClick={() => scrollToSection("projects")}
                  >
                    포트폴리오 보기
                  </Button>
                </motion.div>

                {/* 소셜 링크 */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex gap-6 justify-center lg:justify-start"
                >
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={22} />
                  </a>
                  <a
                    href={socialLinks.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Behance"
                  >
                    <ExternalLink size={22} />
                  </a>
                  <a
                    href={socialLinks.email}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Email"
                  >
                    <Mail size={22} />
                  </a>
                </motion.div>
              </motion.div>

              {/* 프로필 이미지 (데스크탑) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    {/** [더미] 수정 필요 - 프로필 이미지 */}
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop"
                      alt="김혜수 프로필"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -inset-8 bg-gradient-to-tr from-primary/10 via-transparent to-[#2E3A59]/10 rounded-3xl blur-3xl -z-10" />
                </div>
              </motion.div>
            </div>

            {/* 스크롤 인디케이터 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <span className="text-xs tracking-widest">SCROLL</span>
                <ChevronDown size={20} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* About Me Section */}
        {/* ============================================ */}
        <section id="about" className="py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
            >
              {/* 텍스트 영역 */}
              <div className="order-2 lg:order-1">
                <motion.p 
                  variants={fadeInUp}
                  className="text-sm tracking-[0.3em] text-primary/80 mb-6"
                >
                  ABOUT
                </motion.p>

                <motion.h2 
                  variants={fadeInUp}
                  className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-8"
                >
                  아티스트 소개
                </motion.h2>

                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-muted-foreground leading-relaxed mb-8"
                >
                  {/** [자동생성] 수정 가능 */}
                  감정과 기억, 향기, 시각예술을 연결하는 작업을 중심으로 활동하고 있으며,
                  감각적 경험을 하나의 서사로 풀어내는 예술 프로젝트를 지속적으로 전개하고 있습니다.
                </motion.p>

                <motion.blockquote 
                  variants={fadeInUp}
                  className="border-l-2 border-primary/50 pl-6 my-10"
                >
                  <p className="text-xl md:text-2xl font-light italic text-foreground/90 leading-relaxed">
                    {/** [자동생성] 수정 가능 */}
                    &ldquo;저는 눈에 보이지 않는 감정을
                    <br />
                    색과 분위기, 질감으로 기록합니다.&rdquo;
                  </p>
                </motion.blockquote>

                {/* 태그 */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-wrap gap-3"
                >
                  {["감정예술", "시네마틱무드", "기억아카이빙", "감성브랜딩", "오감경험"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-sm bg-secondary/50 text-secondary-foreground rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* 이미지 영역 */}
              <motion.div 
                variants={scaleIn}
                className="order-1 lg:order-2"
              >
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop"
                      alt="추상적인 예술 이미지"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-2xl -z-10" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* Skills Section - 핵심 역량 */}
        {/* ============================================ */}
        <section id="skills" className="py-32 lg:py-40 bg-secondary/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p 
                variants={fadeInUp}
                className="text-sm tracking-[0.3em] text-primary/80 mb-6 text-center"
              >
                EXPERTISE
              </motion.p>

              <motion.h2 
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-6 text-center"
              >
                핵심 역량
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
              >
                {/** [자동생성] 수정 가능 */}
                감각과 감정을 연결하는 다양한 창작 역량
              </motion.p>

              {/* 역량 카드 그리드 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.title}
                    variants={fadeInUp}
                    custom={index}
                  >
                    <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-500 group h-full hover:shadow-lg hover:shadow-primary/5">
                      <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                          <skill.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-medium mb-3">{skill.title}</h3>
                        <p className="text-muted-foreground mb-2">{skill.description}</p>
                        <p className="text-sm text-primary/70">{skill.sub}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* 스킬 & 툴 섹션 */}
              <motion.div 
                variants={fadeInUp}
                className="mt-24"
              >
                <h3 className="text-2xl font-light mb-12 text-center">사용 툴 & 스킬</h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {toolCategories.map((category) => (
                    <div key={category.category}>
                      <h4 className="text-sm tracking-widest text-primary/80 mb-6">{category.category}</h4>
                      <div className="space-y-6">
                        {category.tools.map((tool) => (
                          <div key={tool.name} className="group">
                            <div className="flex justify-between mb-2">
                              <span className="text-foreground">{tool.name}</span>
                              <span className="text-muted-foreground text-sm">{tool.level}%</span>
                            </div>
                            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${tool.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* Projects Section */}
        {/* ============================================ */}
        <section id="projects" className="py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p 
                variants={fadeInUp}
                className="text-sm tracking-[0.3em] text-primary/80 mb-6 text-center"
              >
                PORTFOLIO
              </motion.p>

              <motion.h2 
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-6 text-center"
              >
                프로젝트
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
              >
                {/** [자동생성] 수정 가능 */}
                감정을 시각화하고 경험으로 전환하는 작업들
              </motion.p>

              {/* 프로젝트 그리드 */}
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={fadeInUp}
                    custom={index}
                  >
                    <Card
                      className="bg-card/30 border-border/50 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all duration-500"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Hover overlay content */}
                        <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex gap-2">
                            {project.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 text-xs bg-primary/20 text-primary backdrop-blur-sm rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {project.description}
                        </p>
                        <p className="text-xs text-primary/70">{project.role}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 프로젝트 상세 모달 */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-4xl bg-card border border-border rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:text-primary transition-colors"
                  aria-label="닫기"
                >
                  <X size={20} />
                </button>
                
                <div className="aspect-video overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="font-serif text-3xl mb-4">{selectedProject.title}</h3>
                  <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
                  <p className="text-sm text-primary">{selectedProject.role}</p>
                  
                  <div className="flex gap-2 mt-6">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================ */}
        {/* Timeline Section */}
        {/* ============================================ */}
        <section id="timeline" className="py-32 lg:py-40 bg-secondary/20">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p 
                variants={fadeInUp}
                className="text-sm tracking-[0.3em] text-primary/80 mb-6 text-center"
              >
                JOURNEY
              </motion.p>

              <motion.h2 
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-16 text-center"
              >
                여정
              </motion.h2>

              {/* 타임라인 */}
              <div className="relative">
                {/* 세로선 */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      variants={fadeInUp}
                      custom={index}
                      className={`relative flex items-center gap-8 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* 연도 */}
                      <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"}`}>
                        <span className="font-serif text-4xl text-primary/50">{item.year}</span>
                      </div>

                      {/* 원형 마커 */}
                      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 ring-4 ring-background" />

                      {/* 이벤트 */}
                      <div className={`flex-1 ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                        <span className="md:hidden font-serif text-2xl text-primary/50 block mb-2">{item.year}</span>
                        <p className="text-lg text-foreground">{item.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* Testimonials Section */}
        {/* ============================================ */}
        <section id="testimonials" className="py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p 
                variants={fadeInUp}
                className="text-sm tracking-[0.3em] text-primary/80 mb-6 text-center"
              >
                COLLABORATION
              </motion.p>

              <motion.h2 
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-16 text-center"
              >
                협업 후기
              </motion.h2>

              {/* 추천사 카드 */}
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                  >
                    <Card className="bg-card/30 border-border/50 h-full hover:border-primary/20 transition-all duration-500">
                      <CardContent className="p-8">
                        <Quote className="w-8 h-8 text-primary/30 mb-6" />
                        <p className="text-foreground/90 leading-relaxed mb-6 text-lg">
                          {testimonial.quote}
                        </p>
                        <p className="text-sm text-primary/70">— {testimonial.author}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* CTA Section */}
        {/* ============================================ */}
        <section id="contact" className="py-32 lg:py-40 relative overflow-hidden">
          {/* 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2E3A59]/30 via-background to-[#1a1510]/40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-balance"
              >
                {/** [자동생성] 수정 가능 */}
                함께 새로운 감정을 만들고 싶다면.
              </motion.h2>

              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto"
              >
                {/** [자동생성] 수정 가능 */}
                브랜드, 전시, 비주얼 프로젝트 협업 문의를 기다립니다.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base tracking-wide"
                  asChild
                >
                  <a href={socialLinks.email}>
                    <Mail className="mr-2 h-5 w-5" />
                    이메일 문의하기
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-secondary px-10 py-6 text-base tracking-wide"
                  asChild
                >
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5" />
                    Instagram 보기
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ============================================ */}
      {/* Footer */}
      {/* ============================================ */}
      <footer className="py-12 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif text-lg mb-1">김혜수</p>
              {/** [더미] 수정 필요 */}
              <p className="text-sm text-muted-foreground">hello@example.com</p>
            </div>

            <div className="flex gap-6">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Behance"
              >
                <ExternalLink size={20} />
              </a>
              <a
                href={socialLinks.email}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2026 김혜수. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

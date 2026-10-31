import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ArrowRight, MapPin, Clock, Star, ChevronDown, Menu, X, ExternalLink, MessageCircle } from "lucide-react";
import { SALON, SERVICES, CATEGORIES } from "@/lib/salon";
import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import before from "@/assets/hair-before.png";
import after from "@/assets/hair-after.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio Deluxe — Sobrancelhas, cílios e o liso perfeito" },
      { name: "description", content: "Studio Deluxe — Beleza & Estética. Demonstração da Convert Studio com serviços de sobrancelhas, cílios, cabelos, unhas e maquiagem." },
      { property: "og:title", content: "Studio Deluxe — Beleza & Estética" },
      { property: "og:description", content: "Sobrancelhas, cílios e o liso perfeito. Conheça a demonstração de beleza da Convert Studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://studio-perfect-showcase.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://studio-perfect-showcase.lovable.app/" }],
  }),
  component: Index,
});

const NAV = [["Serviços", "#servicos"], ["Antes e depois", "#antes-depois"], ["Avaliações", "#avaliacoes"], ["Dúvidas", "#faq"]];

function Index() {
  const [modal, setModal] = useState<{ open: boolean; service: string | null }>({ open: false, service: null });
  const book = (service: string | null = null) => setModal({ open: true, service });
  const close = useCallback(() => setModal({ open: false, service: null }), []);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header onBook={() => book()} />
      <Hero onBook={() => book()} />
      <ServiceMarquee />
      <Services onBook={book} />
      <BeforeAfter />
      <Reviews />
      <GoogleReview />
      <Faq />
      <Footer />
      <BookingModal open={modal.open} initialService={modal.service} onClose={close} />
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="leading-none">
      <span className="block font-display text-2xl font-semibold tracking-tight">Studio <em className="text-brand">Deluxe</em></span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] whitespace-nowrap text-muted-foreground">Beleza & Estética</span>
    </a>
  );
}

function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-muted-foreground transition hover:text-primary">{l}</a>)}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={onBook} className="whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:px-5">Solicitar horário</button>
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="grid border-t px-5 py-2 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-sm">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blush blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-8 md:grid-cols-[1.1fr_1fr] md:gap-10 md:py-20">
        <div className="relative mx-auto w-full max-w-sm md:order-2 md:max-w-md">
          <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-brand opacity-90" />
          <img src={SALON.heroImg} alt="Materiais de design de sobrancelhas sobre mármore" width={1024} height={1280} className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-soft" />
          <div className="absolute -bottom-5 left-4 rounded-2xl bg-card px-4 py-3 shadow-soft">
            <p className="font-display text-lg leading-tight">Master em sobrancelhas</p>
            <p className="text-xs text-muted-foreground">e cílios</p>
          </div>
        </div>
        <div className="md:order-1">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
            <MapPin className="h-3.5 w-3.5" /> Estúdio demonstrativo
          </p>
          <h1 className="font-display text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Sobrancelhas, cílios e <em className="text-brand">o liso perfeito.</em>
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            Master em sobrancelhas e cílios, com cabelos, unhas e maquiagem no mesmo lugar. Escolha seu serviço e fale com a gente.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onBook} className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-base">
              Solicitar horário <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#servicos" className="rounded-full border bg-card px-6 py-3 text-sm font-medium transition hover:border-primary sm:px-7 sm:py-3.5 sm:text-base">Ver serviços</a>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={SALON.contact} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
              <MessageCircle className="h-4 w-4" /> Falar com a Convert Studio
            </a>
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 shrink-0 text-primary" /> {SALON.hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceMarquee() {
  return (
    <div className="overflow-hidden border-y border-primary-foreground/25 bg-primary py-3.5 text-primary-foreground md:py-[18px]" aria-label="Serviços do Studio Deluxe">
      <div className="marquee-track flex w-max font-display text-xl uppercase tracking-[0.14em] sm:text-2xl">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-7 pr-7" aria-hidden={copy === 1}>
            {SERVICES.map((s) => (
              <span key={s.id} className="flex shrink-0 items-center gap-7">
                <span>{s.short}</span><span className="text-primary-foreground/80" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 max-w-xl">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Services({ onBook }: { onBook: (id: string) => void }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Todos");
  const list = cat === "Todos" ? SERVICES : SERVICES.filter((s) => s.category === cat);
  return (
    <section id="servicos" className="scroll-mt-20 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Nossos serviços" title={<>Do olhar <em className="text-brand">aos fios.</em></>} sub="Escolha o serviço e solicite um horário. Os valores são informados pelo salão." />
        <div className="-mx-5 mb-8 flex snap-x gap-3.5 overflow-x-auto px-5 pb-2 sm:gap-4">
          {CATEGORIES.map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>{c}</button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s) => (
            <article key={s.id} className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" width={896} height={1120} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium">{s.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.copy}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-primary">Valor sob consulta</p>
                <button onClick={() => onBook(s.id)} className="mt-3 rounded-full border border-primary px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">{s.cta}</button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Não sabe qual escolher?{" "}
          <Button variant="link" onClick={() => onBook("")} className="h-auto p-0 font-medium">Veja as opções.</Button>
        </p>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <section id="antes-depois" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <SectionTitle eyebrow="Antes e depois" title={<>Arraste e veja <em className="text-brand">a diferença.</em></>} sub="Coloração aplicada, brilho de volta e fios alinhados: o cuidado que o seu cabelo merece aqui no salão." />
        <div className="relative aspect-square w-full select-none overflow-hidden rounded-3xl shadow-soft">
          <img src={after} alt="Depois" className="absolute inset-0 h-full w-full object-cover" />
          <img src={before} alt="Antes" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
          <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-card" style={{ left: `${pos}%` }}>
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-primary shadow-soft">⇆</div>
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-plum/80 px-3 py-1 text-xs text-plum-foreground">Antes</span>
          <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Depois</span>
          <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  "Profissional extremamente competente. Parabéns pelo profissionalismo.",
  "Lugar muito agradável, limpo, profissionais muito competentes e preço bom. Super recomendo!",
  "Ótimo serviço e excelente relação custo benefício!",
];

function Reviews() {
  return (
    <section id="avaliacoes" className="scroll-mt-20 bg-plum py-16 text-plum-foreground md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-blush">Avaliações</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">O que dizem <em>as clientes.</em></h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-5xl">4,9</span>
            <div>
              <div className="flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-xs opacity-70">Classificação demonstrativa</p>
            </div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r} className="rounded-3xl border border-plum-foreground/15 p-6">
              <div className="mb-4 flex text-primary">{[...Array(5)].map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}</div>
              <blockquote className="font-display text-xl italic leading-snug">“{r}”</blockquote>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-xs opacity-60">Depoimentos ilustrativos para demonstração.</p>
      </div>
    </section>
  );
}

function GoogleReview() {
  const [open, setOpen] = useState(false);
  return (
    <section className="px-5 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border bg-card px-6 py-8 text-center shadow-soft sm:flex-row sm:text-left">
        <div className="flex-1">
          <h3 className="font-display text-3xl">Já foi atendida no Studio Deluxe?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Sua avaliação ajuda outras clientes a nos encontrarem.</p>
        </div>
        <Button variant="outline" onClick={() => setOpen(true)} className="h-auto inline-flex shrink-0 items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary hover:bg-primary hover:text-primary-foreground">
          <Star className="h-4 w-4" /> Avaliar no Google
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[calc(100%_-_2rem)] rounded-3xl bg-card shadow-soft sm:max-w-lg">
          <DialogTitle className="font-display text-2xl">Avaliar no Google</DialogTitle>
          <DialogDescription>Esta é uma demonstração da Convert Studio. Em um site real, este botão direciona as clientes à página de avaliações do estabelecimento no Google.</DialogDescription>
          <DialogClose asChild><Button className="rounded-full">Fechar</Button></DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  );
}

const FAQ = [
  ["Quais serviços para o olhar o Studio Deluxe faz?", "Design de sobrancelhas, cílios e micropigmentação — sobrancelhas e cílios são a especialidade da casa. Escolha o serviço para experimentar a solicitação de horário."],
  ["Vocês fazem progressiva e coloração?", "Sim. Na parte de cabelos, o salão divulga progressiva (o “liso perfeito”), coloração, ombré hair, corte, escova e penteados."],
  ["Quanto custa?", "Os valores são informados pelo salão, conforme o serviço escolhido. Nesta demonstração, você pode revisar uma solicitação sem confirmar um agendamento."],
  ["Como solicito um horário?", "Escolha o serviço e informe suas preferências em “Solicitar horário”. Nesta demonstração, revise o pedido e envie à Convert Studio ou copie a mensagem. Em um site real, o salão confirmará a disponibilidade pelo WhatsApp."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 pb-16 pt-8 md:pb-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="divide-y rounded-3xl border bg-card">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                {q}<ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-6 pb-5 text-sm text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">{SALON.tagline}.</p>
        </div>
        <p className="flex gap-3 text-sm"><MapPin className="h-4 w-4 shrink-0 text-primary" />{SALON.address}</p>
        <div className="grid content-start gap-3 text-sm">
          <p className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-primary" />{SALON.hours}</p>
          <a href={SALON.contact} target="_blank" rel="noopener noreferrer" className="flex gap-3 font-medium text-primary hover:underline"><MessageCircle className="h-4 w-4 shrink-0" />Falar com a Convert Studio</a>
        </div>
        <a href={SALON.contact} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-sm hover:text-primary">{SALON.contactLabel} <ExternalLink className="h-3 w-3" /></a>
      </div>
      <p className="border-t py-5 text-center text-xs text-muted-foreground">Studio Deluxe — site demonstrativo desenvolvido pela Convert Studio.</p>
    </footer>
  );
}

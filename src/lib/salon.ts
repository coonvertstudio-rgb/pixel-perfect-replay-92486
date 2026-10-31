import type { LucideIcon } from "lucide-react";
import { Sparkles, Sun, Palette, Waves, Droplets, Scissors, Flower2, Heart } from "lucide-react";
import hero from "@/assets/ib-hero.jpg";
import mechas from "@/assets/ib-mechas.jpg";
import descoloracao from "@/assets/ib-descoloracao.jpg";
import coloracao from "@/assets/ib-coloracao.jpg";
import progressiva from "@/assets/ib-progressiva.jpg";
import hidratacao from "@/assets/ib-hidratacao.jpg";
import penteado from "@/assets/ib-penteado.jpg";
import corte from "@/assets/ib-corte.jpg";
import labios from "@/assets/ib-labios.jpg";

const PLACE_ID = "ChIJR8VI7cYvWpMRV3xfmauSte8";

export const SALON = {
  name: "Império da Beleza",
  owner: "Aline Garrido",
  tagline: "Sua melhor versão começa aqui",
  address: "QS 12, Conj. 3A, Lote 05, Loja 02 — Riacho Fundo I, Brasília/DF, 71825-203",
  hours: "Terça a sábado, das 9h às 19h",
  phone: "(61) 99423-1398",
  landline: "(61) 3301-8381",
  whatsapp: "5561994231398",
  instagram: "https://www.instagram.com/alinegarrido.imperiodabeleza/",
  instagramHandle: "@alinegarrido.imperiodabeleza",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=Salao+Imperio+Da+Beleza+By+Aline+Garrido&query_place_id=${PLACE_ID}`,
  reviewUrl: `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
  rating: "4,7",
  reviewCount: 14,
  heroImg: hero,
};

export const waLink = (msg: string) => SALON.whatsapp ? `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(msg)}` : null;

export type Category = "Loiros & cor" | "Cabelos" | "Lábios";

export type Service = { id: string; title: string; short: string; category: Category; copy: string; cta: string; img: string; icon: LucideIcon; pros: string[] };

export const SERVICES: Service[] = [
  { id: "mechas", title: "Mechas", short: "MECHAS", category: "Loiros & cor", copy: "O carro-chefe da casa: mechas iluminadas, feitas com técnica e cuidado com os fios.", cta: "Quero horário para mechas", img: mechas, icon: Sparkles, pros: [] },
  { id: "descoloracao", title: "Descoloração saudável", short: "DESCOLORAÇÃO SAUDÁVEL", category: "Loiros & cor", copy: "Clareamento planejado para chegar ao loiro dos sonhos preservando a saúde do cabelo.", cta: "Quero horário para descoloração", img: descoloracao, icon: Sun, pros: [] },
  { id: "coloracao", title: "Coloração", short: "COLORAÇÃO", category: "Loiros & cor", copy: "Cor uniforme, cobertura de brancos ou um tom novo, como o cobre iluminado.", cta: "Quero horário para coloração", img: coloracao, icon: Palette, pros: [] },
  { id: "progressiva", title: "Progressiva", short: "PROGRESSIVA", category: "Cabelos", copy: "Fios alinhados, com menos volume e muito mais facilidade no dia a dia.", cta: "Quero horário para progressiva", img: progressiva, icon: Waves, pros: [] },
  { id: "hidratacao", title: "Hidratação", short: "HIDRATAÇÃO", category: "Cabelos", copy: "Tratamento para devolver brilho, maciez e força, principalmente aos fios loiros.", cta: "Quero horário para hidratação", img: hidratacao, icon: Droplets, pros: [] },
  { id: "corte", title: "Corte", short: "CORTE", category: "Cabelos", copy: "Corte pensado para o seu rosto e para valorizar as suas mechas.", cta: "Quero horário para corte", img: corte, icon: Scissors, pros: [] },
  { id: "penteado", title: "Escova & penteado", short: "PENTEADO", category: "Cabelos", copy: "Finalização com ondas e movimento para eventos ou para sair do salão pronta.", cta: "Quero horário para penteado", img: penteado, icon: Flower2, pros: [] },
  { id: "labios", title: "Micropigmentação labial", short: "LÁBIOS", category: "Lábios", copy: "Lip blush: lábios mais corados, definidos e com aparência rejuvenescida.", cta: "Quero horário para lábios", img: labios, icon: Heart, pros: [] },
];

export const MARQUEE = ["MECHAS", "DESCOLORAÇÃO SAUDÁVEL", "COLORAÇÃO", "PROGRESSIVA", "HIDRATAÇÃO", "LÁBIOS", "SOBRANCELHAS", "MANICURE & PEDICURE", "MAQUIAGEM"];

export const CATEGORIES: ("Todos" | Category)[] = ["Todos", "Loiros & cor", "Cabelos", "Lábios"];
export const PERIODS = ["Manhã (09h–12h)", "Tarde (12h–16h)", "Fim da tarde (16h–19h)"];
export const NO_PREF = "Sem preferência";

export function fmtDate(d: string) {
  if (!d) return "A combinar";
  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
}

export function buildBookingMessage(o: { service: string; pro?: string | null; date: string; period: string; notes: string }) {
  return [
    `Olá, ${SALON.owner}! Gostaria de agendar no ${SALON.name}:`,
    ``,
    `• Serviço: ${o.service}`,
    ...(o.pro ? [`• Profissional: ${o.pro}`] : []),
    `• Data: ${fmtDate(o.date)}`,
    `• Período: ${o.period || "A combinar"}`,
    ...(o.notes.trim() ? [`• Observação: ${o.notes.trim()}`] : []),
    ``,
    `Aguardo a confirmação. Obrigada!`,
  ].join("\n");
}

/** Local date (YYYY-MM-DD), avoiding UTC shift. */
export function todayLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

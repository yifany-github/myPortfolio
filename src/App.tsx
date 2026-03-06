import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Briefcase,
  Sparkles,
  Mail,
  Printer,
  Sun,
  Moon,
  Smile,
  Zap,
  Coffee,
  ArrowRight,
  ArrowLeft,
  Rocket,
  GraduationCap,
  Book,
  Palette,
  CornerDownLeft,
  Eye,
  EyeOff,
} from "lucide-react";

const TABS = [
  { id: "home", label: "Profile", icon: User },
  { id: "work", label: "Resume", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "tech", label: "Skills", icon: Sparkles },
  { id: "comm", label: "Contact", icon: Mail },
];

type BlockItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
};

type BlockDraft = {
  title: string;
  date: string;
  excerpt: string;
  tagsInput: string;
  content: string;
};

const BLOCKS_STORAGE_KEY = "portfolio_blocks";
const BLOCK_PASSWORD_KEY = "portfolio_blocks_password";
const BLOCK_PASSWORD_VERSION_KEY = "portfolio_blocks_password_version";
const BLOCK_PASSWORD_VERSION = "2";
const BLOCK_PASSWORD_SEED = "Yy4210752";
const THEME_MODE_STORAGE_KEY = "portfolio_theme_mode";

type ThemeMode = "auto" | "light" | "dark";

const getSystemPrefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const CONTACT_LINKS = {
  instagram: "https://www.instagram.com/kent2197/",
  linkedin: "https://linkedin.com/in/yifan-yang-765234256",
  email: "mailto:vapouryang@gmail.com",
  x: "https://x.com/hiYYToo",
  github: "https://github.com/yifany-github",
};

const createEmptyDraft = (): BlockDraft => ({
  title: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  tagsInput: "",
  content: "",
});

const stripSlugPrefix = (content: string) =>
  content.replace(/^Slug:\s*\/[^\n]+\n\n/i, "");

const sortBlocksByDateDesc = (items: BlockItem[]) =>
  [...items].sort((a, b) => b.date.localeCompare(a.date));

const DEFAULT_BLOCKS: BlockItem[] = [
  {
    id: "block-future-ai-surfaces",
    title: "The Future of AI Is Not Bigger Models. It's Better Surfaces.",
    date: "2025-12-02",
    excerpt:
      "For the last two years, the AI conversation has been dominated by scale: larger models, more parameters, more compute, longer context windows. But the next wave of meaningful products may come from something less flashy and more important - better surfaces.",
    tags: ["AI", "Product Design", "Interfaces"],
    content:
      "For the last two years, the AI conversation has been dominated by scale. Bigger models. Larger context windows. More benchmarks. More GPUs. More money.\n\nThat race matters. Better foundation models unlock new capabilities, and there is no denying how much progress has come from scaling. But I increasingly think that the next truly important layer of AI will not be defined by model size alone. It will be defined by surfaces.\n\nBy surfaces, I mean the places where intelligence actually meets life: the screen you glance at in the kitchen, the assistant embedded in your workflow, the tiny interface that helps you make a decision without forcing you to open five tabs and think like a systems engineer.\n\nMost AI products today still feel like destinations. You go to them, type into them, and leave. They are impressive, but they often remain separate from the environment where real decisions happen. The future feels different. AI becomes useful when it stops asking for attention and starts fitting naturally into moments that already exist.\n\nThat is why I am increasingly interested in small, ambient, and context-aware interfaces. Not everything needs to be a giant chatbot window. Sometimes the right AI product is a dashboard on a home server. Sometimes it is an e-paper display that quietly shows what matters. Sometimes it is a tool that notices patterns in your day and surfaces the right information before you ask.\n\nThis shift sounds subtle, but it changes product design completely.\n\nIf your main question is \"How smart is the model?\", you optimize for raw capability. If your question becomes \"Where should intelligence appear, and in what form?\", you start thinking about timing, trust, friction, and cognitive load.\n\nThat is a more human question.\n\nIn practice, many of the best AI experiences will not feel like \"using AI\" at all. They will feel like fewer clicks. Less context switching. Less forgetting. More continuity between intention and action.\n\nA lot of current AI products still make users do too much translation work. The user has to explain context, restate preferences, assemble files, describe goals, and decide what tool to use. In theory the AI is powerful. In practice the human is still acting as the operating system.\n\nGood surfaces reduce that burden.\n\nA good surface knows where it lives. It understands whether it is helping with work, home, creativity, communication, or health. It respects the user's attention. It does not show ten possibilities when one clear next step is enough. It does not force a dramatic conversation every time the user needs a small answer.\n\nThis also changes how I think about devices. AI does not belong only on premium laptops and cloud dashboards. It belongs on physical objects, in persistent spaces, and in systems that stay available in the background. The most interesting AI products of the next few years may not be the ones with the loudest demos. They may be the ones that become part of a person's environment and quietly earn trust over time.\n\nThat is especially true for personal AI.\n\nPersonal AI should not just be smart in a general way. It should be situated. It should know what kind of life it is supporting. A generic answer engine can be useful, but a meaningful assistant needs memory, rhythm, and context. It needs to understand whether the user is building, learning, resting, struggling, or deciding. It needs to show up differently in each case.\n\nThis is where hardware, interface design, and software orchestration start to matter as much as the model itself.\n\nThe next generation of AI products will not win simply by being the most intelligent in abstraction. They will win by being the most naturally placed. The best ones will appear where people already are, with the right level of visibility, the right amount of information, and the right relationship to the user's time.\n\nIn other words, intelligence is only half the product.\n\nThe other half is presence.\n\nAnd I suspect that presence - where AI lives, how it appears, and how gently it fits into real life - will matter more and more from here.",
  },
  {
    id: "block-agents-need-grounding",
    title: "Agents Need Grounding, Not Just Autonomy",
    date: "2025-08-12",
    excerpt:
      "The dream of AI agents is compelling: systems that can plan, decide, and act on our behalf. But most agent products still fail for a simple reason. They are given too much freedom and not enough grounding.",
    tags: ["AI", "Agents", "Systems"],
    content:
      "AI agents are one of the most exciting ideas in technology right now.\n\nThe pitch is simple and powerful: instead of asking AI for one answer at a time, we build systems that can plan over multiple steps, use tools, retrieve information, remember context, and complete meaningful tasks. In theory, this moves us from conversation to execution.\n\nBut in practice, many so-called agents still feel fragile.\n\nThey can be impressive in demos, especially when the path is short and the environment is controlled. Yet once they are placed in the real world - where information is incomplete, preferences change, tools break, and humans are inconsistent - their performance often drops fast.\n\nI don't think the main problem is that agents are not autonomous enough.\n\nI think the main problem is that they are not grounded enough.\n\nAutonomy is attractive because it feels like progress. We want agents that can think ahead, take initiative, and do more with less supervision. But autonomy without grounding creates systems that are active without being reliable. They move, but they do not always move in the right direction.\n\nGrounding is what makes an agent useful. It is the set of constraints, context, signals, and feedback loops that connect a model's reasoning to the user's actual world.\n\nThat grounding can take many forms.\n\nIt can mean tool access with clear permissions.\n\nIt can mean memory that is structured rather than vague.\n\nIt can mean observing real user behavior instead of relying only on one-off prompts.\n\nIt can mean knowing whether the user is at work, at home, tired, busy, healthy, overwhelmed, or offline.\n\nIt can mean integrating live context such as documents, schedules, system status, sensor data, or communication history.\n\nWithout grounding, an agent is forced to improvise too much.\n\nAnd improvisation is exactly where trust breaks.\n\nThis is why I am skeptical of agent systems that emphasize maximum freedom too early. If an agent can call ten tools but has no stable model of user priorities, it is not really intelligent in the way that matters. It is just highly capable at generating action. That is not the same thing as good judgment.\n\nGood judgment comes from context.\n\nIf we want agents to feel dependable, they need more than planning loops and function calls. They need a worldview shaped by the environment they operate in. They need to understand the difference between urgency and importance. They need to know when not to act. They need to know when uncertainty is too high. They need to be legible to the user, so their reasoning and decisions can be inspected when needed.\n\nThis matters even more in personal AI.\n\nA truly personal agent should not behave like an intern with unlimited enthusiasm and no situational awareness. It should behave more like a calm collaborator. It should know the user's preferences, tolerate ambiguity, and improve over time by learning from real feedback. It should not merely execute goals. It should interpret them in the context of a life.\n\nThat is why I think multimodal and context-rich systems will matter so much in the next phase of agent design. Text alone is often not enough. A user's schedule, health trends, habits, past decisions, and environmental state can all change what the \"right\" action is. An agent that ignores these signals may still sound intelligent, but it will make shallow decisions.\n\nThe deeper challenge is not just making agents do more.\n\nIt is making them care about the right things.\n\nThat requires architecture as much as intelligence. We need better memory systems, better permission layers, better state tracking, better handoffs between models and tools, and better ways to express uncertainty. We also need product design that makes the agent's scope clear. A trustworthy agent is not one that claims to do everything. It is one that consistently does the right subset of things well.\n\nIn the long run, I suspect the most successful agents will not be the most autonomous in the abstract. They will be the most grounded in reality.\n\nBecause action is cheap.\n\nAlignment is hard.\n\nAnd usefulness lives in the gap between the two.",
  },
  {
    id: "block-openclaw-personal-software",
    title: "OpenClaw and the Return of Personal Software",
    date: "2026-02-11",
    excerpt:
      "OpenClaw is interesting not just because it is another AI agent, but because it points toward something older and deeper: the return of personal software. In a world of rented interfaces and cloud dependence, that shift matters.",
    tags: ["AI", "Personal Software", "Local-first"],
    content:
      "For a lot of people, OpenClaw looks like just another entry in the growing list of AI agents.\n\nThat is the obvious reading. It sends messages, uses tools, runs tasks, and plugs into the apps people already use. It sits close to the now-familiar dream of an assistant that does more than answer questions. It acts. It remembers. It stays around. Publicly, OpenClaw presents itself as \"the AI that actually does things,\" with a local-first, chat-based model that connects to everyday channels and layers in tools, skills, agents, and persistent context.\n\nBut I think that reading misses the more interesting point.\n\nWhat makes OpenClaw worth paying attention to is not that it is an AI agent. It is that it hints at the return of personal software.\n\nFor years, software has moved in one direction: away from ownership and toward access. We stopped buying tools and started renting platforms. We stopped shaping software around our own workflows and started adapting ourselves to SaaS products designed for the average customer. Cloud convenience won, but at the cost of intimacy. Most software today is polished, collaborative, and scalable. Very little of it feels truly personal.\n\nAI changes that equation.\n\nThe most interesting thing about personal AI is not that it can generate text. It is that it can restore software as something closer to a living system around an individual. Not just an app you open, but an environment that remembers, adapts, and accumulates context over time.\n\nThat is where OpenClaw feels like a signal.\n\nIts importance is not in any single feature. It is in the architecture of the idea: software that lives closer to the user, carries durable context, routes through channels the user already inhabits, and can expand its behavior through code and skills instead of waiting for a platform team to bless every new use case. The official project materials emphasize exactly this stack: local-first control, multi-channel inboxes, agent routing, tool surfaces, skills, and a coding-agent layer that can delegate real work to systems like Codex, Claude Code, or Pi.\n\nThat combination matters because it changes the center of gravity.\n\nA normal SaaS product asks: how do we get users into our interface?\n\nA personal AI system asks: how do we meet the user where they already are?\n\nThat is a much deeper shift than it sounds.\n\nIf AI only lives inside one branded chat box, it remains a destination. You visit it, ask for help, and leave. But if intelligence is routed through the channels you already check, tied to your files and habits, and able to take action with continuity, then it starts to look less like a chatbot and more like a layer of personal infrastructure.\n\nThat word matters: infrastructure.\n\nWe often describe AI in terms of intelligence, but usefulness is usually a systems problem. The hard part is not only making the model smart. The hard part is making the surrounding system persistent, grounded, and available at the right surface at the right moment. A personal AI becomes compelling when it is not merely powerful in abstraction, but situated in the user's actual life.\n\nThis is why I think the OpenClaw style of product is more important than many people realize.\n\nIt suggests that the future of AI may not belong only to giant centralized assistants with pristine interfaces and controlled capabilities. It may also belong to messy, extensible, user-shaped systems that behave more like software organisms: local when necessary, connected when useful, and open to being customized by the people who live with them.\n\nThat openness comes with obvious risks.\n\nThe more an agent can do, the more trust becomes the real product. Open ecosystems, skills, code execution, automation layers, and background tasks all create attack surfaces as well as creative possibilities. Even OpenClaw's own public messaging now highlights skill security partnerships, which tells you that the security layer is not a side issue but part of the core story.\n\nBut this does not weaken the thesis. It strengthens it.\n\nPersonal software has always been more powerful and more dangerous than generic software. A spreadsheet can run a business or ruin one. A shell script can automate a workflow or delete the wrong directory. What makes personal tools valuable is precisely that they can be shaped to the edge cases of a real life. AI agents inherit that same tension, except at a larger scale.\n\nSo the real question is not whether systems like OpenClaw are perfectly safe, polished, or complete yet.\n\nThe real question is whether they are pointing in the right direction.\n\nI think they are.\n\nBecause what people seem to want from AI is not endless conversation. They want leverage. They want continuity. They want software that feels like it belongs to them again. They want systems that understand their rhythms, use their preferred tools, and evolve with their projects instead of forcing every need through the same generic interface.\n\nIn that sense, OpenClaw is less interesting as a product category than as a philosophy.\n\nIt says that a useful AI assistant should not just be smart. It should be close. Close to the user's channels. Close to the user's data. Close to the user's habits. Close to the user's intent. And perhaps most importantly, close enough to be modified.\n\nThat last point may end up being the most important of all.\n\nThe history of computing is full of moments when powerful tools became transformative only after they became personal. Computers mattered more when they moved from institutions to desks. The web mattered more when publishing became accessible to individuals. Smartphones mattered more when software became ambient and always with us.\n\nAI may follow the same pattern.\n\nNot when it becomes bigger.\n\nNot when it becomes louder.\n\nBut when it becomes yours.\n\nAnd that is why I think OpenClaw is worth watching.\n\nNot because it proves the agent future is finished.\n\nBut because it suggests personal software may be starting again.",
  },
];

const REQUIRED_DEFAULT_POSTS = DEFAULT_BLOCKS;
const REMOVED_LEGACY_POST_IDS = new Set([
  "block-lumina",
  "block-portfolio",
  "block-side-project-strategy",
]);

const Sticker = ({ children, rotate, className, constraintsRef }: any) => (
  <motion.div
    drag
    dragConstraints={constraintsRef}
    whileHover={{ scale: 1.05, zIndex: 100 }}
    whileDrag={{ scale: 1.1, rotate: 0, zIndex: 100 }}
    className={`absolute z-[60] cursor-grab active:cursor-grabbing ${className}`}
    style={{ rotate: `${rotate}deg`, touchAction: "none" }}
  >
    {children}
  </motion.div>
);

const SocialSticker = ({
  path,
  color,
  rotate,
  className,
  constraintsRef,
  href,
  label,
}: any) => {
  const suppressClickUntilRef = useRef(0);
  const blockNextClick = () => {
    suppressClickUntilRef.current = Date.now() + 500;
  };

  return (
    <motion.a
      href={href}
      target={href?.startsWith("mailto:") ? undefined : "_blank"}
      rel={href?.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={label}
      title={label}
      drag
      dragConstraints={constraintsRef}
      onDragStart={blockNextClick}
      onDragEnd={blockNextClick}
      onClick={(e) => {
        if (Date.now() < suppressClickUntilRef.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      whileHover={{ scale: 1.1, zIndex: 100 }}
      whileDrag={{ scale: 1.2, rotate: 0, zIndex: 100 }}
      className={`absolute z-[60] cursor-grab active:cursor-grabbing ${className}`}
      style={{ rotate: `${rotate}deg`, touchAction: "none" }}
    >
      <svg
        viewBox="0 0 24 24"
        width="48"
        height="48"
        overflow="visible"
        filter="url(#sticker-outline)"
        style={{ fill: color }}
      >
        <path d={path} />
      </svg>
    </motion.a>
  );
};

const ShinChanSticker = ({
  constraintsRef,
  className,
}: {
  constraintsRef: any;
  className?: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileHover={{ scale: 1.06, rotate: 1, zIndex: 120 }}
      whileDrag={{ scale: 1.12, rotate: 0, zIndex: 120 }}
      className={`absolute z-[70] cursor-grab active:cursor-grabbing ${className ?? ""}`}
      style={{ touchAction: "none" }}
    >
      <div className="relative w-[76px] h-[94px]">
        {isDragging && (
          <>
            <motion.div
              className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[62px] h-[62px] rounded-full border-[3px] border-amber-400/80"
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 1.25, opacity: 0 }}
              transition={{ duration: 0.75, repeat: Infinity, ease: "easeOut" }}
            />
            {[
              "left-[8%] top-[12%]",
              "right-[4%] top-[22%]",
              "left-[18%] bottom-[24%]",
              "right-[14%] bottom-[32%]",
            ].map((pos) => (
              <motion.span
                key={pos}
                className={`absolute ${pos} text-amber-400 text-sm font-bold`}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.2, 1, 0.2],
                  rotate: [-8, 8, -8],
                }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.span>
            ))}
          </>
        )}

        <svg
          viewBox="0 0 76 90"
          width="76"
          height="90"
          overflow="visible"
          className="relative z-10 select-none pointer-events-none"
        >
          <image
            href="https://raw.githubusercontent.com/Ding0327/Crayon-Shin-chan/master/Crayon_Shin-chan.png"
            x="0"
            y="0"
            width="76"
            height="90"
            preserveAspectRatio="xMidYMid meet"
            filter="url(#sticker-outline)"
          />
        </svg>
      </div>
    </motion.div>
  );
};

const ImageIconSticker = ({
  src,
  rotate,
  className,
  constraintsRef,
  size = 64,
  filterId = "sticker-outline",
}: any) => (
  <motion.div
    drag
    dragConstraints={constraintsRef}
    whileHover={{ scale: 1.1, zIndex: 100 }}
    whileDrag={{ scale: 1.2, rotate: 0, zIndex: 100 }}
    className={`absolute z-[60] cursor-grab active:cursor-grabbing ${className}`}
    style={{ rotate: `${rotate}deg`, touchAction: "none" }}
  >
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      overflow="visible"
      className="select-none pointer-events-none"
    >
      <image
        href={src}
        x="0"
        y="0"
        width="64"
        height="64"
        preserveAspectRatio="xMidYMid meet"
        filter={`url(#${filterId})`}
      />
    </svg>
  </motion.div>
);

const SOCIAL_PATHS = {
  github:
    "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

const PerforatedLine = () => (
  <div className="w-full relative h-3 flex items-center justify-between px-2 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] to-transparent dark:from-white/[0.04] pointer-events-none"></div>
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-[1.5px] bg-black/30 dark:bg-black/90 rounded-full shadow-[0_1px_0_rgba(255,255,255,1)] dark:shadow-[0_1px_0_rgba(255,255,255,0.1)] relative z-10"
      ></div>
    ))}
  </div>
);

const RotatingThemeToggle = ({
  mode,
  isDark,
  toggle,
}: {
  mode: ThemeMode;
  isDark: boolean;
  toggle: () => void;
}) => {
  const AutoThemeIcon = () => (
    <div className="relative w-6 h-6" aria-hidden="true">
      <Sun
        size={22}
        strokeWidth={2.2}
        className="absolute inset-0 m-auto text-zinc-800 dark:text-zinc-200"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      />
      <Moon
        size={22}
        strokeWidth={2.2}
        className="absolute inset-0 m-auto text-zinc-800 dark:text-zinc-200"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      />
    </div>
  );

  return (
    <motion.button
      onClick={toggle}
      aria-label={`Theme mode: ${mode}. Click to cycle.`}
      className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 shadow-sm cursor-pointer text-zinc-800 dark:text-zinc-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            id="circlePath"
            d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
            fill="transparent"
          />
          <text
            fontSize="9.5"
            fontWeight="600"
            letterSpacing="2.5"
            className="font-mono uppercase fill-current opacity-40"
          >
            <textPath href="#circlePath" startOffset="0%">
              {mode === "auto"
                ? "AUTO THEME • AUTO THEME •"
                : "TOGGLE THEME • TOGGLE THEME •"}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="relative z-10">
        {mode === "auto" ? (
          <AutoThemeIcon />
        ) : isDark ? (
          <Moon size={20} />
        ) : (
          <Sun size={20} />
        )}
      </div>
    </motion.button>
  );
};

const InteractiveBrandToggle = ({ mode, onChange, isPrinting }: { mode: "portfolio" | "journal", onChange: (m: "portfolio" | "journal") => void, isPrinting: boolean }) => (
  <button
    onClick={() => onChange(mode === "portfolio" ? "journal" : "portfolio")}
    className="group flex items-center gap-3 sm:gap-4 text-left p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
  >
    <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-[#1a1a1a] rounded-[1.25rem] shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shrink-0 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ y: 20, opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute"
        >
          {mode === "portfolio" ? <Printer className="w-6 h-6 md:w-7 md:h-7" /> : <Book className="w-6 h-6 md:w-7 md:h-7" />}
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="flex flex-col justify-center gap-1">
      <div className="flex items-center gap-2 relative">
        <div className="relative h-6 md:h-8 overflow-hidden w-[100px] md:w-[110px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mode}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 font-display font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-white flex items-center"
            >
              {mode === "portfolio" ? "Printfolio" : "Blog"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[11px] md:text-xs font-medium text-zinc-500">
        <div
          className={`w-2 h-2 rounded-full ${isPrinting ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`}
        ></div>
        {isPrinting ? "Printing..." : mode === "portfolio" ? "Ready" : "Reading Mode"}
      </div>
    </div>

    {/* Hand-drawn arrow and text */}
    <div className="absolute -top-12 left-8 md:-top-14 md:left-12 pointer-events-none flex flex-col items-center z-50">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <span className="font-['Caveat',cursive] text-blue-500 dark:text-blue-400 text-xl md:text-2xl font-bold -rotate-6 mb-1 whitespace-nowrap ml-16">
          {mode === "portfolio" ? "Click for Blog!" : "Back to Portfolio"}
        </span>
        <svg width="60" height="50" viewBox="0 0 100 100" className="text-blue-500 dark:text-blue-400 ml-8">
          <path d="M80,10 Q50,10 20,70" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M20,70 L40,60 M20,70 L25,45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  </button>
);

function PaperHeader({ activeTab, mode }: { activeTab: string, mode: "portfolio" | "journal" }) {
  if (mode === "journal") {
    return (
      <div className="w-full border-b border-black/10 dark:border-white/10 pb-6 mb-8 flex justify-between items-end">
        <div className="font-display font-bold text-3xl tracking-tight text-zinc-900 dark:text-white">
          Blog
        </div>
        <div className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
          VOL: 01
        </div>
      </div>
    );
  }

  const tab = TABS.find((t) => t.id === activeTab);
  return (
    <div className="w-full border-b border-black/10 dark:border-white/10 pb-6 mb-8 flex justify-between items-end">
      <div className="font-display font-bold text-3xl tracking-tight text-zinc-900 dark:text-white">
        {tab?.label}
      </div>
      <div className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
        SEQ: 00{TABS.findIndex((t) => t.id === activeTab) + 1}
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<"portfolio" | "journal">("portfolio");
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [isPrinting, setIsPrinting] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const [isDark, setIsDark] = useState<boolean>(getSystemPrefersDark);
  const [blocks, setBlocks] = useState<BlockItem[]>(
    sortBlocksByDateDesc(DEFAULT_BLOCKS)
  );
  const [isBlockAdminOpen, setIsBlockAdminOpen] = useState(false);
  const [isBlockAdminAuthed, setIsBlockAdminAuthed] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [draftBlock, setDraftBlock] = useState<BlockDraft>(createEmptyDraft());
  const [showStickers, setShowStickers] = useState(true);
  const containerRef = useRef(null);
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      if (themeMode === "dark") {
        setIsDark(true);
      } else if (themeMode === "light") {
        setIsDark(false);
      } else {
        setIsDark(mediaQuery.matches);
      }
    };

    const handleSystemThemeChange = () => {
      if (themeMode === "auto") {
        setIsDark(mediaQuery.matches);
      }
    };

    applyTheme();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () =>
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }

    mediaQuery.addListener(handleSystemThemeChange);
    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [themeMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedBlocks = localStorage.getItem(BLOCKS_STORAGE_KEY);
    if (savedBlocks) {
      try {
        const parsed = JSON.parse(savedBlocks);
        if (Array.isArray(parsed)) {
          const parsedBlocks = (parsed as BlockItem[])
            .map((item) => {
              const requiredPost = REQUIRED_DEFAULT_POSTS.find(
                (post) => post.id === item.id
              );
              if (!requiredPost) return item;
              return {
                ...item,
                date: requiredPost.date,
                content: stripSlugPrefix(item.content),
              };
            })
            .filter((item) => !REMOVED_LEGACY_POST_IDS.has(item.id));
          const mergedBlocks = [...parsedBlocks];
          for (let i = REQUIRED_DEFAULT_POSTS.length - 1; i >= 0; i -= 1) {
            const requiredPost = REQUIRED_DEFAULT_POSTS[i];
            if (!mergedBlocks.some((item) => item.id === requiredPost.id)) {
              mergedBlocks.unshift(requiredPost);
            }
          }
          setBlocks(sortBlocksByDateDesc(mergedBlocks));
        }
      } catch {
        // Ignore malformed saved data and keep defaults.
      }
    }

    const passwordVersion = localStorage.getItem(BLOCK_PASSWORD_VERSION_KEY);
    if (passwordVersion !== BLOCK_PASSWORD_VERSION) {
      localStorage.setItem(BLOCK_PASSWORD_KEY, BLOCK_PASSWORD_SEED);
      localStorage.setItem(BLOCK_PASSWORD_VERSION_KEY, BLOCK_PASSWORD_VERSION);
    } else if (!localStorage.getItem(BLOCK_PASSWORD_KEY)) {
      localStorage.setItem(BLOCK_PASSWORD_KEY, BLOCK_PASSWORD_SEED);
    }

    const savedThemeMode = localStorage.getItem(THEME_MODE_STORAGE_KEY);
    if (
      savedThemeMode === "auto" ||
      savedThemeMode === "light" ||
      savedThemeMode === "dark"
    ) {
      setThemeMode(savedThemeMode as ThemeMode);
    } else {
      setThemeMode("auto");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(BLOCKS_STORAGE_KEY, JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode);
  }, [themeMode]);

  const openBlockAdmin = () => {
    setIsBlockAdminOpen(true);
    setAdminPasswordInput("");
    setAdminPasswordError("");
    setPasswordMessage("");
    setShowAdminPassword(false);
  };

  const closeBlockAdmin = () => {
    setIsBlockAdminOpen(false);
    setIsBlockAdminAuthed(false);
    setEditingBlockId(null);
    setDraftBlock(createEmptyDraft());
    setAdminPasswordInput("");
    setAdminPasswordError("");
    setPasswordMessage("");
    setNewPasswordInput("");
    setShowAdminPassword(false);
  };

  const handleBlockAdminLogin = () => {
    if (typeof window === "undefined") return;
    let expectedPassword = localStorage.getItem(BLOCK_PASSWORD_KEY) || "";
    if (!expectedPassword) {
      localStorage.setItem(BLOCK_PASSWORD_KEY, BLOCK_PASSWORD_SEED);
      expectedPassword = BLOCK_PASSWORD_SEED;
    }
    if (adminPasswordInput === expectedPassword) {
      setIsBlockAdminAuthed(true);
      setAdminPasswordError("");
      return;
    }
    setAdminPasswordError("Incorrect password. Please try again.");
  };

  const handleSaveBlock = () => {
    const title = draftBlock.title.trim();
    const content = draftBlock.content.trim();
    if (!title || !content) return;

    const parsedTags = draftBlock.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (editingBlockId) {
      setBlocks((prev) =>
        sortBlocksByDateDesc(
          prev.map((item) =>
            item.id === editingBlockId
              ? {
                  ...item,
                  title,
                  date: draftBlock.date,
                  excerpt: draftBlock.excerpt.trim(),
                  tags: parsedTags,
                  content,
                }
              : item
          )
        )
      );
    } else {
      setBlocks((prev) =>
        sortBlocksByDateDesc([
          {
            id: `block-${Date.now()}`,
            title,
            date: draftBlock.date,
            excerpt: draftBlock.excerpt.trim(),
            tags: parsedTags,
            content,
          },
          ...prev,
        ])
      );
    }

    setEditingBlockId(null);
    setDraftBlock(createEmptyDraft());
  };

  const handleEditBlock = (item: BlockItem) => {
    setEditingBlockId(item.id);
    setDraftBlock({
      title: item.title,
      date: item.date,
      excerpt: item.excerpt,
      tagsInput: item.tags.join(", "),
      content: item.content,
    });
  };

  const handleDeleteBlock = (id: string) => {
    if (typeof window !== "undefined") {
      const shouldDelete = window.confirm("Delete this block?");
      if (!shouldDelete) return;
    }
    setBlocks((prev) => prev.filter((item) => item.id !== id));
    if (editingBlockId === id) {
      setEditingBlockId(null);
      setDraftBlock(createEmptyDraft());
    }
  };

  const handleChangePassword = () => {
    if (typeof window === "undefined") return;
    const next = newPasswordInput.trim();
    if (next.length < 4) {
      setPasswordMessage("Password must be at least 4 characters.");
      return;
    }
    localStorage.setItem(BLOCK_PASSWORD_KEY, next);
    setNewPasswordInput("");
    setPasswordMessage("Password updated.");
  };

  const handleTabChange = (id: string) => {
    if (id === activeTab || isPrinting) return;
    setIsPrinting(true);
    setActiveTab(id);
    setTimeout(() => setIsPrinting(false), 600);
  };

  const handleModeChange = (newMode: "portfolio" | "journal") => {
    if (newMode === mode || isPrinting) return;
    setIsPrinting(true);
    setMode(newMode);
    setTimeout(() => setIsPrinting(false), 600);
  };

  const handleThemeModeToggle = () => {
    setThemeMode((prev) =>
      prev === "auto" ? "light" : prev === "light" ? "dark" : "auto"
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#f0f0f0] dark:bg-[#0f0f0f] text-zinc-900 dark:text-zinc-100 font-sans flex flex-col items-center pt-4 md:pt-8 px-4 relative overflow-hidden transition-colors duration-300"
    >
      {/* Fixed Constraints Container for Stickers */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-0"
      ></div>

      {/* SVG Filter for Stickers */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter
            id="sticker-outline"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="1.5"
              result="OUTLINE"
            />
            <feFlood floodColor="white" floodOpacity="1" result="COLOR" />
            <feComposite
              in="COLOR"
              in2="OUTLINE"
              operator="in"
              result="COLORED_OUTLINE"
            />
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.5"
              floodColor="rgba(0,0,0,0.15)"
              result="SHADOW"
            />
            <feMerge>
              <feMergeNode in="SHADOW" />
              <feMergeNode in="COLORED_OUTLINE" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="sticker-outline-wide"
            x="-24%"
            y="-24%"
            width="148%"
            height="148%"
          >
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="2.3"
              result="OUTLINE"
            />
            <feFlood floodColor="white" floodOpacity="1" result="COLOR" />
            <feComposite
              in="COLOR"
              in2="OUTLINE"
              operator="in"
              result="COLORED_OUTLINE"
            />
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.5"
              floodColor="rgba(0,0,0,0.15)"
              result="SHADOW"
            />
            <feMerge>
              <feMergeNode in="SHADOW" />
              <feMergeNode in="COLORED_OUTLINE" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {showStickers && (
        <>
          <SocialSticker
            path={SOCIAL_PATHS.github}
            color="#181717"
            rotate={12}
            className="top-6 left-[20%] hidden md:block"
            constraintsRef={constraintsRef}
            href={CONTACT_LINKS.github}
            label="GitHub"
          />
          <SocialSticker
            path={SOCIAL_PATHS.x}
            color="#000000"
            rotate={-8}
            className="top-5 left-[6%] hidden md:block"
            constraintsRef={constraintsRef}
            href={CONTACT_LINKS.x}
            label="X"
          />
          <SocialSticker
            path={SOCIAL_PATHS.instagram}
            color="#E4405F"
            rotate={15}
            className="top-6 right-[28%] hidden md:block"
            constraintsRef={constraintsRef}
            href={CONTACT_LINKS.instagram}
            label="Instagram"
          />
          <SocialSticker
            path={SOCIAL_PATHS.linkedin}
            color="#0A66C2"
            rotate={-15}
            className="top-36 right-[6%] hidden md:block"
            constraintsRef={constraintsRef}
            href={CONTACT_LINKS.linkedin}
            label="LinkedIn"
          />
          <ImageIconSticker
            src="/ucl.png"
            size={128}
            rotate={-10}
            className="top-[10.5rem] left-[26%] hidden md:block"
            constraintsRef={constraintsRef}
          />
          <ImageIconSticker
            src="/uottawa.png"
            rotate={8}
            className="top-[10.5rem] right-[26%] hidden md:block"
            filterId="sticker-outline-wide"
            constraintsRef={constraintsRef}
          />
          <ImageIconSticker
            src="/upei.png"
            size={96}
            rotate={-6}
            className="top-[15rem] right-[18%] hidden md:block"
            constraintsRef={constraintsRef}
          />
          <ImageIconSticker
            src="/guitar_transparent.png"
            rotate={9}
            className="top-24 left-[9%] hidden md:block"
            constraintsRef={constraintsRef}
          />
          <ShinChanSticker
            className="top-32 right-[16%]"
            constraintsRef={constraintsRef}
          />
          <Sticker
            rotate={-9}
            className="top-20 left-2 sm:left-8 pointer-events-auto"
            constraintsRef={constraintsRef}
          >
            <svg
              width="220"
              height="72"
              viewBox="0 0 220 72"
              overflow="visible"
              filter="url(#sticker-outline)"
            >
              <text
                x="14"
                y="50"
                fill="#111827"
                fontSize="38"
                letterSpacing="0.8"
                style={{
                  fontFamily: '"Space Grotesk", "Inter", sans-serif',
                  fontWeight: 600,
                  fontStyle: "italic",
                }}
              >
                Yifan Yang
              </text>
            </svg>
          </Sticker>
        </>
      )}

      {/* Typewriter/Printer Machine Body */}
      <div className="w-full max-w-4xl relative flex flex-col items-center">
        {/* Machine Top Bevel (Stepped Design) */}
        <div className="w-[92%] md:w-[88%] h-8 bg-gradient-to-b from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 rounded-t-3xl shadow-inner border-x border-t border-black/10 dark:border-white/10 relative z-30 -mb-2"></div>

        {/* Machine Main Body */}
        <div className="w-full bg-gradient-to-b from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 rounded-t-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.6)] border-x border-t border-black/5 dark:border-white/10 relative z-40 flex flex-col pt-8 pb-6 px-4 md:px-8">
          {/* Top Control Panel */}
          <div className="flex flex-col gap-6 relative z-10">
            {/* Top Row: Brand & Theme Toggle */}
            <div className="flex justify-between items-start sm:items-center gap-4 relative">
              {/* Left: Interactive Brand & Mode Switch */}
              <InteractiveBrandToggle mode={mode} onChange={handleModeChange} isPrinting={isPrinting} />

              {/* Center: Stickers */}
              {showStickers && (
                <div className="absolute inset-0 pointer-events-none hidden md:block z-50">
                  <Sticker rotate={-12} className="top-1 left-[32%] pointer-events-auto" constraintsRef={constraintsRef}>
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-sm border-[3px] border-white dark:border-[#1a1a1a] font-display font-bold flex items-center gap-2 text-sm">
                      <Smile size={16} /> Hello!
                    </div>
                  </Sticker>
                  <Sticker rotate={15} className="-top-1 left-[48%] pointer-events-auto" constraintsRef={constraintsRef}>
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-sm border-[3px] border-white dark:border-[#1a1a1a] font-display font-bold flex items-center gap-2 text-sm">
                      <Zap size={16} /> Fast
                    </div>
                  </Sticker>
                  <Sticker rotate={-8} className="top-2 left-[64%] pointer-events-auto" constraintsRef={constraintsRef}>
                    <div className="bg-amber-400 text-black px-4 py-2 rounded-xl shadow-sm border-[3px] border-white dark:border-[#1a1a1a] font-display font-bold flex items-center gap-2 text-sm">
                      <Coffee size={16} /> Code
                    </div>
                  </Sticker>
                  <Sticker rotate={10} className="-top-2 left-[80%] pointer-events-auto" constraintsRef={constraintsRef}>
                    <div className="bg-purple-500 text-white px-4 py-2 rounded-xl shadow-sm border-[3px] border-white dark:border-[#1a1a1a] font-display font-bold flex items-center gap-2 text-sm">
                      <Palette size={16} /> Design
                    </div>
                  </Sticker>
                </div>
              )}

              {/* Right: Theme Toggle */}
              <div className="flex items-center gap-2 sm:gap-3 justify-end shrink-0">
                <div className="scale-75 sm:scale-100 origin-right">
                  <RotatingThemeToggle
                    mode={themeMode}
                    isDark={isDark}
                    toggle={handleThemeModeToggle}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: Tabs */}
            <div className="w-full h-12 flex items-center justify-center">
              <div className="max-w-full">
                <AnimatePresence mode="wait">
                  {mode === "portfolio" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mx-auto flex items-center bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 w-max"
                    >
                      {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            disabled={isPrinting}
                            className={`
                          relative flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap
                          ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}
                          ${isPrinting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                        `}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-black/5 dark:border-white/5"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 30,
                                }}
                              />
                            )}
                            <span className="relative z-10 flex items-center gap-1.5">
                              <Icon size={16} />
                              <span className="hidden sm:block">{tab.label}</span>
                            </span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Printer Slot (The hole) */}
        <div className="h-8 w-[96%] mx-auto bg-zinc-800 dark:bg-black rounded-b-2xl shadow-inner border-b-2 border-white/20 dark:border-white/5 flex items-center justify-center relative z-20 -mt-3">
          <div className="h-3 w-[98%] bg-zinc-900 dark:bg-zinc-950 rounded-full shadow-inner"></div>
        </div>
      </div>

      {/* Machine Bottom Half (Behind Paper) */}
      <div className="w-full max-w-4xl h-20 bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-800 dark:to-zinc-950 rounded-b-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border-x border-b border-black/5 dark:border-white/5 relative z-10 -mt-4 flex flex-col items-center justify-end pb-3">
        {/* Bottom Bevel */}
        <div className="w-[92%] md:w-[88%] h-4 bg-gradient-to-b from-zinc-400 to-zinc-500 dark:from-zinc-900 dark:to-black rounded-b-xl opacity-50"></div>
      </div>

      {/* Paper Area */}
      <div
        className="w-[92%] md:w-full max-w-3xl flex-1 relative z-30 -mt-[90px]"
        style={{ clipPath: "inset(0 -100px -100px -100px)" }}
      >
        {/* Permanent Paper Stub (Stays in printer) */}
        <div
          className={`absolute top-0 left-0 w-full z-0 border-x border-black/5 dark:border-white/10 transition-colors duration-300 flex flex-col justify-end ${
            mode === "journal" 
              ? "bg-[#fdfbf7] dark:bg-[#1e1d1a]" 
              : "bg-white dark:bg-[#1a1a1a]"
          }`}
          style={{ height: "36px" }}
        >
          <PerforatedLine />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode === "journal" ? "journal" : activeTab}
            initial={{ y: "-100%", opacity: 0.55, rotateZ: 0 }}
            animate={{ y: 0, opacity: 1, rotateZ: 0 }}
            exit={{
              y: [0, 40, 1000],
              rotateZ: [0, -12, -38],
              scale: [1, 1, 0.84],
              opacity: [1, 1, 0],
              transition: {
                duration: 0.58,
                times: [0, 0.2, 1],
                ease: "easeInOut",
              },
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{ 
              transformOrigin: "100% 6px",
              marginTop: "24px",
              ...(mode === "journal" ? {
                backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 31px, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 32px)`,
                backgroundAttachment: 'local',
                backgroundPosition: '0 2rem',
              } : {})
            }}
            className={`w-full shadow-xl dark:shadow-2xl rounded-b-3xl min-h-[45vh] flex flex-col relative border-x border-b border-black/5 dark:border-white/10 mb-16 transition-colors duration-300 z-10 ${
              mode === "journal" 
                ? "bg-[#fdfbf7] dark:bg-[#1e1d1a]" 
                : "bg-white dark:bg-[#1a1a1a]"
            }`}
          >
            {/* Perforated Tear Line (Top edge of the falling paper) */}
            <div className="absolute top-0 left-0 w-full rotate-180">
              <PerforatedLine />
            </div>

            {/* Paper Content */}
            <div className="flex-1 px-5 sm:px-8 md:px-12 pb-4 md:pb-6 pt-6 md:pt-8 paper-scroll overflow-y-auto overflow-x-hidden">
              <PaperHeader activeTab={activeTab} mode={mode} />
              {mode === "journal" ? (
                <BlogContent posts={blocks} />
              ) : (
                <>
                  {activeTab === "home" && <HomeContent />}
                  {activeTab === "work" && <WorkContent />}
                  {activeTab === "projects" && <ProjectsContent />}
                  {activeTab === "tech" && <TechContent />}
                  {activeTab === "comm" && <CommContent />}
                </>
              )}
            </div>

            {/* Paper Bottom Edge */}
            <div className="h-8 w-full flex justify-center items-end pb-4 opacity-30">
              <div className="w-16 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={() => setShowStickers((prev) => !prev)}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        aria-label={showStickers ? "Hide stickers" : "Show stickers"}
        className="fixed bottom-24 right-5 z-[150] cursor-pointer select-none"
      >
        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl bg-zinc-900/15 dark:bg-black/50" />
        <span className="relative inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900">
            {showStickers ? (
              <Eye size={15} strokeWidth={2.2} />
            ) : (
              <EyeOff size={15} strokeWidth={2.2} />
            )}
          </span>
          <span className="text-xs font-semibold tracking-tight">
            {showStickers ? "Hide Stickers" : "Show Stickers"}
          </span>
        </span>
      </motion.button>

      <motion.button
        onClick={openBlockAdmin}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Open block manager"
        className="fixed bottom-5 right-5 z-[150] cursor-pointer select-none"
      >
        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-zinc-900/20 dark:bg-black/50" />
        <span className="relative inline-flex items-center gap-3 rounded-2xl border border-zinc-300 dark:border-zinc-600 bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 px-4 py-3 text-zinc-900 dark:text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900">
            <CornerDownLeft size={16} strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              Enter
            </span>
            <span className="text-sm font-bold tracking-tight">Write</span>
          </span>
        </span>
      </motion.button>

      {isBlockAdminOpen && (
        <div className="fixed inset-0 z-[160] bg-black/45 backdrop-blur-[1px] p-4 flex items-center justify-center">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#171717] border border-black/10 dark:border-white/10 shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white">
                Block Manager
              </h3>
              <button
                onClick={closeBlockAdmin}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
            </div>

            {!isBlockAdminAuthed ? (
              <div className="max-w-md space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Enter your password to unlock block management.
                </p>
                <input
                  type={showAdminPassword ? "text" : "password"}
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleBlockAdminLogin();
                  }}
                  placeholder="Enter password"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                <label className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 select-none">
                  <input
                    type="checkbox"
                    checked={showAdminPassword}
                    onChange={(e) => setShowAdminPassword(e.target.checked)}
                    className="rounded border-zinc-300 dark:border-zinc-600"
                  />
                  Show password
                </label>
                {adminPasswordError && (
                  <p className="text-sm text-red-500">{adminPasswordError}</p>
                )}
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  Password is set and stored in this browser.
                </p>
                <button
                  onClick={handleBlockAdminLogin}
                  className="w-full py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                  Unlock Manager
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                <div className="lg:col-span-3 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      value={draftBlock.title}
                      onChange={(e) =>
                        setDraftBlock((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Title"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                    <input
                      type="date"
                      value={draftBlock.date}
                      onChange={(e) =>
                        setDraftBlock((prev) => ({ ...prev, date: e.target.value }))
                      }
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                  </div>
                  <textarea
                    value={draftBlock.excerpt}
                    onChange={(e) =>
                      setDraftBlock((prev) => ({ ...prev, excerpt: e.target.value }))
                    }
                    placeholder="Excerpt (shown in list)"
                    rows={2}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
                  />
                  <input
                    value={draftBlock.tagsInput}
                    onChange={(e) =>
                      setDraftBlock((prev) => ({ ...prev, tagsInput: e.target.value }))
                    }
                    placeholder="Tags, comma-separated (e.g. AI, Product)"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                  <textarea
                    value={draftBlock.content}
                    onChange={(e) =>
                      setDraftBlock((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="Content (supports paragraph breaks)"
                    rows={10}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-y"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleSaveBlock}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      {editingBlockId ? "Update Block" : "Add Block"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingBlockId(null);
                        setDraftBlock(createEmptyDraft());
                      }}
                      className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40">
                    <p className="text-xs font-semibold mb-2 text-zinc-600 dark:text-zinc-300">
                      Update manager password
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="New password"
                        className="flex-1 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                      />
                      <button
                        onClick={handleChangePassword}
                        className="px-3 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold"
                      >
                        Save
                      </button>
                    </div>
                    {passwordMessage && (
                      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                        {passwordMessage}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 max-h-[46vh] overflow-y-auto pr-1">
                    {blocks.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900/30"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                              {item.date}
                            </p>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => handleEditBlock(item)}
                              className="px-2 py-1 rounded-md text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBlock(item.id)}
                              className="px-2 py-1 rounded-md text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        {item.excerpt && (
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                            {item.excerpt}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function HomeContent() {
  const [isRealPhoto, setIsRealPhoto] = useState(false);
  const [isAvatarFlipping, setIsAvatarFlipping] = useState(false);
  const [avatarYRotation, setAvatarYRotation] = useState(0);

  const handleAvatarClick = () => {
    if (isAvatarFlipping) return;
    setIsAvatarFlipping(true);
    setAvatarYRotation(82);
    setTimeout(() => {
      setIsRealPhoto((prev) => !prev);
      setAvatarYRotation(-82);
      setTimeout(() => setAvatarYRotation(0), 16);
    }, 170);
    setTimeout(() => setIsAvatarFlipping(false), 360);
  };

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <button
        type="button"
        onClick={handleAvatarClick}
        className="relative w-32 h-32 sm:w-36 sm:h-36 overflow-visible cursor-pointer"
        aria-label="Toggle profile photo"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shadow-[0_12px_26px_-14px_rgba(0,0,0,0.5)]" />

        {/* Back ring: sits behind the avatar */}
        <div
          className="absolute inset-0 rounded-full border-[6px] border-white dark:border-[#1a1a1a] pointer-events-none z-10"
          style={{ clipPath: "inset(0 0 50% 0)" }}
        />

        <AnimatePresence mode="wait" initial={false}>
          {!isRealPhoto ? (
            <motion.img
              key="cartoon"
              src="/caprofile_transparent.png"
              alt="Yifan avatar"
              referrerPolicy="no-referrer"
              className="absolute left-1/2 -translate-x-1/2 -top-[30%] w-[146%] h-[146%] object-contain drop-shadow-[0_14px_16px_rgba(0,0,0,0.3)] z-20"
              initial={false}
              animate={
                isAvatarFlipping
                  ? { rotateY: avatarYRotation, y: 0, opacity: 1 }
                  : { y: [0, -2, 0], opacity: 1, rotateY: 0 }
              }
              transition={
                isAvatarFlipping
                  ? { duration: 0.17, ease: "easeInOut" }
                  : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }
              style={{ transformPerspective: 900, transformOrigin: "22% 50%" }}
            />
          ) : (
            <motion.img
              key="real"
              src="/profile.png"
              alt="Yifan real profile"
              referrerPolicy="no-referrer"
              className="absolute inset-[7%] w-[86%] h-[86%] rounded-full object-cover z-20"
              initial={false}
              animate={{ rotateY: avatarYRotation, opacity: 1, scale: 1 }}
              transition={{ duration: 0.17, ease: "easeInOut" }}
              style={{
                objectPosition: "center 28%",
                transformPerspective: 900,
                transformOrigin: "22% 50%",
              }}
            />
          )}
        </AnimatePresence>

        {/* Front ring: only bottom half, sits in front of the avatar */}
        <div
          className="absolute inset-0 rounded-full border-[6px] border-white dark:border-[#1a1a1a] pointer-events-none z-30"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        />
      </button>

      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
          Hi, I'm Yifan. <br />
          <span className="text-zinc-400 dark:text-zinc-500">
            I build AI-native software and intelligent hardware systems.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
          I design and ship end-to-end AI products across cloud apps, browser
          tools, and edge devices. My work combines LLM workflows, multimodal
          interfaces, and embedded interaction design to turn research ideas
          into practical systems.
        </p>
      </div>

      <div className="pt-4">
        <div className="inline-flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 rounded-full border border-black/5 dark:border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Open to AI software and hardware collaboration
          </span>
        </div>
      </div>
    </div>
  );
}

function WorkContent() {
  const work = [
    {
      period: "Dec 2023 — Present",
      role: "Research Assistant",
      company: "University College London (UCL), London, UK",
      desc: "Enhanced machine learning model performance through advanced algorithms, feature engineering, and hyperparameter optimization. Conducted targeted literature reviews to identify research gaps and shape follow-up study directions.",
    },
    {
      period: "May 2022 — Aug 2022",
      role: "Research Assistant",
      company: "GREE Air Conditioner, Ho Chi Minh City, Vietnam",
      desc: "Built software prediction and evaluation functions using mathematical and statistical modeling. Designed low-level interaction logic to separate employee and customer workflows, implemented tested code under QA standards, and prepared system capability analysis data.",
    },
  ];

  const education = [
    {
      period: "Oct 2024",
      role: "MSc, Artificial Intelligence for Sustainable Development",
      company: "University College London, London, UK",
      desc: "Graduated with Distinction. Thesis: Optimizing Post-Disaster Road Network Recovery via a novel data-mixing strategy in multi-generational deep neural networks. Coursework included Information Retrieval and Data Mining, Statistical NLP, Probabilistic Modelling, and Deep Representations and Learning.",
    },
    {
      period: "Dec 2022",
      role: "Honours Bachelor, Computer Science",
      company: "University of Ottawa, Ottawa, Canada",
      desc: "GPA 8.65/10. Merit Scholarship (2020, 2021) and Dean's Honour List (2020, 2021). Relevant coursework: Probability and Statistics for Engineers, Analysis and Design of User Interfaces, Advanced C++, Cryptography, Computer Graphics, and Programming Paradigms.",
    },
    {
      period: "May 2019",
      role: "Bachelor, Business Administration",
      company: "University of Prince Edward Island, Charlottetown, Canada",
      desc: "Concentration in Business Administration. Relevant coursework included Management Information Systems, Finite Mathematics, Marketing, and Calculus for Social and Life Sciences.",
    },
  ];

  return (
    <div className="relative space-y-10 animate-in fade-in duration-700">
      {/* Work Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-black/5 dark:border-white/5">
            <Briefcase size={18} />
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">Experience</h3>
        </div>
        <div className="space-y-4">
          {work.map((item, i) => (
            <div key={i} className="group block border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 sm:mb-3 gap-1 sm:gap-4">
                <h4 className="text-lg sm:text-xl font-display font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {item.role}
                </h4>
                <span className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md w-fit">
                  {item.period}
                </span>
              </div>
              <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {item.company}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-black/5 dark:border-white/5">
            <GraduationCap size={18} />
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">Education</h3>
        </div>
        <div className="space-y-4">
          {education.map((item, i) => (
            <div key={i} className="group block border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 sm:mb-3 gap-1 sm:gap-4">
                <h4 className="text-lg sm:text-xl font-display font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {item.role}
                </h4>
                <span className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md w-fit">
                  {item.period}
                </span>
              </div>
              <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {item.company}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TechContent() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Vite",
    "Tailwind CSS",
    "Motion",
    "Node.js",
    "SQLite",
    "GitHub Actions",
    "Chrome Extensions",
    "AI API Integration",
  ];

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-xl">
        Technologies I use across frontend-heavy products and utility tools,
        balancing developer speed with maintainability.
      </p>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogContent({ posts }: { posts: BlockItem[] }) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPostId) return;
    const stillExists = posts.some((post) => post.id === selectedPostId);
    if (!stillExists) setSelectedPostId(null);
  }, [posts, selectedPostId]);

  if (selectedPostId !== null) {
    const post = posts.find((item) => item.id === selectedPostId);
    if (!post) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => setSelectedPostId(null)}
            className="group flex items-center gap-3 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 transition-colors">
              <ArrowLeft size={14} />
            </div>
            <span>Back to posts</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full">
            <Coffee size={12} />
            <span>5 min read</span>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
              {post.date}
            </span>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 leading-[1.1] pb-2">
            {post.title}
          </h2>
        </div>

        {/* Article Content */}
        <div className="space-y-6 sm:space-y-8">
          {post.content.split("\n\n").map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-zinc-700 dark:text-zinc-300 leading-relaxed text-base sm:text-lg md:text-xl font-serif tracking-wide ${
                i === 0
                  ? "first-letter:text-5xl sm:first-letter:text-7xl first-letter:font-display first-letter:font-black first-letter:text-zinc-900 dark:first-letter:text-white first-letter:mr-3 sm:first-letter:mr-4 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1"
                  : ""
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* End of article marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-center gap-3"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8">
        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-xl font-serif italic">
          Thoughts, tutorials, and explorations on design, development, and the
          creative process.
        </p>
      </div>

      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-zinc-300/90 dark:border-zinc-700/90 bg-gradient-to-b from-white/80 to-zinc-50/80 dark:from-zinc-900/40 dark:to-zinc-900/20 px-5 py-6 sm:px-6 sm:py-7"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent dark:via-zinc-700/80" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04),transparent_40%)]" />

          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              Blog Status
            </span>
            <span className="rounded-full border border-zinc-300 dark:border-zinc-700 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-300">
              Empty
            </span>
          </div>

          <div className="relative z-10 flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300">
              <Book size={16} />
            </div>
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                No posts yet
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onClick={() => setSelectedPostId(post.id)}
            className="group cursor-pointer py-6 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 relative"
          >
            {/* Hover background effect */}
            <div className="absolute inset-0 -mx-6 px-6 bg-zinc-50 dark:bg-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10"></div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
              <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 shrink-0 md:w-24">
                {post.date}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {post.title}
              </h3>
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div className="hidden md:block md:w-24 shrink-0"></div>
              <div className="flex-1">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 font-serif text-base sm:text-lg">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm font-medium text-blue-500 flex items-center gap-1 transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    Read <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function CommContent() {
  const iconLinks = [
    {
      id: "linkedin",
      href: CONTACT_LINKS.linkedin,
      label: "LinkedIn",
      color: "#0A66C2",
      path: SOCIAL_PATHS.linkedin,
    },
    {
      id: "github",
      href: CONTACT_LINKS.github,
      label: "GitHub",
      color: "#181717",
      path: SOCIAL_PATHS.github,
    },
    {
      id: "email",
      href: CONTACT_LINKS.email,
      label: "Email",
      color: "#2563EB",
      path: null,
    },
    {
      id: "x",
      href: CONTACT_LINKS.x,
      label: "X",
      color: "#111827",
      path: SOCIAL_PATHS.x,
    },
    {
      id: "instagram",
      href: CONTACT_LINKS.instagram,
      label: "Instagram",
      color: "#E4405F",
      path: SOCIAL_PATHS.instagram,
    },
  ];

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-xl">
        Open to collaboration and new opportunities. Reach out through any of
        these channels.
      </p>

      <div className="flex flex-wrap items-center gap-5 sm:gap-6 max-w-xl">
        {iconLinks.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
            aria-label={item.label}
            title={item.label}
            className="group inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 hover:scale-110 transition-transform"
          >
            {item.path ? (
              <svg
                viewBox="0 0 24 24"
                width="30"
                height="30"
                style={{ fill: item.color }}
                className="opacity-95 group-hover:opacity-100"
              >
                <path d={item.path} />
              </svg>
            ) : (
              <Mail
                size={30}
                style={{ color: item.color }}
                className="opacity-95 group-hover:opacity-100"
              />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    {
      title: "intelli-spark-e-paper-board",
      category: "Embedded AI Device / E-Paper System",
      description:
        "An e-paper smart board project for Raspberry Pi / Jetson that combines hardware input, voice interaction, and AI-driven task workflows.",
      highlights: [
        "Implements multi-screen e-paper UI navigation via rotary knob input.",
        "Integrates voice capture, backend action routing, and Gemini-oriented automation flows.",
      ],
      image: "https://picsum.photos/seed/intelli-spark/600/400",
      tags: ["E-Paper", "Raspberry Pi", "Voice + AI"],
      link: "https://github.com/YongBoYu1/intelli-spark-e-paper-board",
      cta: "View Repository",
    },
    {
      title: "Lumina Web App",
      category: "AI Well-Being / Conversational App",
      description:
        "A standalone Lumina web application focused on AI-powered emotional support, providing conversational guidance and a calmer, supportive interaction flow.",
      highlights: [
        "Delivers conversational emotional support through an AI chat interface.",
        "Built as a deployable web app with modern React-based frontend architecture.",
      ],
      image: "https://picsum.photos/seed/lumina-web/600/400",
      tags: ["AI Assistant", "Well-Being", "React"],
      link: "https://lumina-743776522409.us-west1.run.app/",
      cta: "Open Web App",
    },
    {
      title: "Lumina - AI Bookmark Manager (Chrome Extension)",
      category: "Browser Productivity + AI Knowledge Tool",
      description:
        "A Chrome extension that turns bookmark collections into a structured, searchable knowledge base using AI summarization and semantic retrieval.",
      highlights: [
        "Automatically generates bookmark summaries and meaningful tags via Gemini.",
        "Enables semantic search so users can find content by intent, not exact keywords.",
      ],
      image: "https://picsum.photos/seed/lumina-extension/600/400",
      tags: ["Chrome Extension", "Gemini", "Semantic Search"],
      link: "https://chromewebstore.google.com/detail/lumina-ai-bookmark-manage/eblpcbphkelmifdmjbhcdkhijjnfojbe",
      cta: "Open Chrome Web Store",
    },
    {
      title: "YY Chat",
      category: "Real-Time Communication Platform",
      description:
        "A chat-focused web platform for real-time communication between users and communities, designed around fast interaction and continuous presence.",
      highlights: [
        "Supports instant chat workflows and always-on conversation sessions.",
        "Focuses on smooth social messaging UX across desktop and mobile browser contexts.",
      ],
      image: "https://picsum.photos/seed/yychat/600/400",
      tags: ["Chat", "Realtime", "Web App"],
      link: "https://yychat.ai",
      cta: "Visit Website",
    },
  ];

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-xl">
        Recent projects in chronological order (latest to earliest), covering
        communication platforms, AI productivity tools, and embedded AI systems.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group flex flex-col border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-all"
          >
            <div className="h-40 sm:h-48 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                {project.category}
              </p>
              <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">
                {project.description}
              </p>
              <ul className="space-y-1.5 mb-4 text-xs text-zinc-600 dark:text-zinc-400">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {project.cta} <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

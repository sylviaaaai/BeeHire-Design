"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Bookmark,
  Heart,
  Home,
  Image,
  LayoutGrid,
  MessageCircle,
  MoreHorizontal,
  Package2,
  PlusSquare,
  Scale,
  Search,
  Send,
  Smile,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Story = {
  id: string;
  name: string;
  ring: boolean;
  avatar: string;
};

type FeedComment = {
  author: string;
  text: string;
};

type Post = {
  id: string;
  author: string;
  handle: string;
  role: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  likesLabel?: string;
  time: string;
  comments: FeedComment[];
  canFollow?: boolean;
  highlight?: boolean;
  badgeLabel?: string;
};

const STORIES: Story[] = [
  { id: "s1", name: "Bee_068612", ring: true, avatar: "/hive/1.png" },
  { id: "s2", name: "BeeKing", ring: true, avatar: "/1.png" },
  { id: "s3", name: "Luna", ring: true, avatar: "/3.png" },
  { id: "s4", name: "BEEhire_official", ring: false, avatar: "/hive/20.png" },
  { id: "s5", name: "Nora", ring: false, avatar: "/6.png" },
];

const POSTS: Post[] = [
  {
    id: "p1",
    author: "Bee_068612",
    handle: "@Bee_068612",
    role: "New Bee",
    avatar: "/hive/1.png",
    image: "/hive/2.JPEG",
    caption:
      "Finished my first full 6-hour session last night and I woke up to an extra $78.5 in my balance.My wrist feels slightly sore today though, like I did repetitive work in my sleep.\n\nGuys, any tips for a new bee?",
    likes: 1000,
    likesLabel: "1K+",
    time: "18m ago",
    canFollow: true,
    highlight: true,
    comments: [
      { author: "Bee_742401", text: "Great Job! Keep Going 612!" },
      { author: "Bee_193881", text: "It takes time bro. You'll get used to it." },
      { author: "Bee_207379", text: "Take as much as u want." },
    ],
  },
  {
    id: "p2",
    author: "Bee_980276",
    handle: "@Bee_980276",
    role: "Advanced Bee",
    avatar: "/hive/3.png",
    image: "/hive/4.png",
    caption:
      "Three days in the global Top 10% 🥺\nGot the monthly lottery notification this morning☕",
    likes: 10000,
    likesLabel: "10K+",
    time: "43m ago",
    canFollow: true,
    comments: [
      { author: "Bee_681030", text: "This guy is def my role model 🙌" },
      { author: "Bee_199811", text: "omggg this is crazy... 👏👏👏" },
      { author: "Bee_207379", text: "I'm so envious! I need to work more to enter the pool😭" },
    ],
  },
  {
    id: "p3",
    author: "Bee_018261",
    handle: "@Bee_018261",
    role: "New Bee",
    avatar: "/hive/6.png",
    image: "/hive/7.png",
    caption:
      "Does anyone else get this?\n\nThis morning while brushing my teeth, my right hand felt slightly delayed. It didn't quite feel like my movement TBH.\n\nIs this normal? I'm starting to feel a little concerned 😨",
    likes: 50,
    likesLabel: "50+",
    time: "1h ago",
    canFollow: true,
    comments: [
      { author: "Bee_922109", text: "Me too... Maybe it's time to take some REAL rest..." },
      {
        author: "Bee_105774",
        text: "This is normal. It might just be because you don't exercise much in daily life.",
      },
      {
        author: "Bee_441208",
        text: "I suspect this company's product may have technical issues and could be harmful to the human body.",
      },
    ],
  },
  {
    id: "p4",
    author: "Apple",
    handle: "@Apple",
    role: "Sponsored",
    avatar: "/hive/8.png",
    image: "/hive/9.png",
    caption: "See beyond the screen.\niPhone 28.",
    likes: 0,
    time: "Sponsored",
    canFollow: true,
    badgeLabel: "Ads",
    comments: [],
  },
  {
    id: "p5",
    author: "Bee_831004",
    handle: "@Bee_831004",
    role: "Advanced Bee",
    avatar: "/hive/10.png",
    image: "/hive/11.jpg",
    caption: "With my loves.\nBeehire gave my life a second chance by letting me work freely.",
    likes: 1000,
    likesLabel: "1K+",
    time: "2h ago",
    canFollow: true,
    comments: [
      { author: "Bee_699030", text: "awww I'm so happy for you🥺" },
      { author: "Bee_779811", text: "Beautiful photo❤️😍" },
      {
        author: "Bee_223479",
        text: "Family is the most important thing in the world. God bless y'all.",
      },
      {
        author: "Bee_887609",
        text: "❤️❤️❤️❤️That's why I like Beehire. More time with my family.",
      },
    ],
  },
  {
    id: "p6",
    author: "Bee_221212",
    handle: "@Bee_221212",
    role: "Advanced Bee",
    avatar: "/hive/12.png",
    image: "/hive/13.png",
    caption:
      "Sometimes I wonder which movements came from me\nand which came from the system.\n\nEither way, my income keeps rising and my rent is clear this month though✌️",
    likes: 200,
    likesLabel: "200+",
    time: "3h ago",
    canFollow: true,
    comments: [
      { author: "Bee_792491", text: "You are doing amazing girlie! 🎀🥰" },
      { author: "Bee_193881", text: "I'm proud of you!" },
      { author: "Bee_206370", text: "👏👏👏" },
      {
        author: "Bee_554018",
        text: "I feel the same way sometimes, like my body doesn't totally belong to me...",
      },
      { author: "Bee_110243", text: "What kind of job did you choose to make that much?" },
    ],
  },
  {
    id: "p7",
    author: "Bee_897764",
    handle: "@Bee_897764",
    role: "Golden Bee",
    avatar: "/hive/14.png",
    image: "/hive/15.jpg",
    caption:
      "The journey has been 10 years.\nStill feels surreal waking up without checking task queues anymore.\n\nI moved into a place by the water last month and it turns out sunsets look different when your time is finally your own.\n\nHope every bee's finding their rhythm.\nFor life, for sea! 🍷🛥️",
    likes: 50000,
    likesLabel: "50K+",
    time: "5h ago",
    canFollow: true,
    comments: [
      { author: "Bee_681030", text: "GIRL you are def the Queen of the Bees😍😍😍" },
      { author: "Bee_199811", text: "OMGGGG Where is this place? Your life is my dream🔥🔥🔥" },
      { author: "Bee_207379", text: "10 year without real sleep... Unbelievable..." },
      { author: "Bee_412679", text: "so pretty! Link to the sunglasses plz 🕶️" },
    ],
  },
  {
    id: "p8",
    author: "BEEhire_official",
    handle: "@BEEhire_official",
    role: "Sponsored",
    avatar: "/hive/20.png",
    image: "/hive/19.png",
    caption:
      "Exciting! The Hive is hiring again!\nTurn your sleep time into real money.\nThis is your second chance to change your life.\n\nJoin BeeHire today. 🐝",
    likes: 0,
    time: "Sponsored",
    canFollow: true,
    badgeLabel: "Ads",
    comments: [],
  },
  {
    id: "p9",
    author: "Bee_374121",
    handle: "@Bee_374121",
    role: "Advanced Bee",
    avatar: "/hive/17.png",
    image: "/hive/18.png",
    caption:
      "HELP!! Work Accident!\n\nLast night I was working for Beehire as usual and I think I was doing a forklift task when something hit me really hard from behind.\n\nNext thing I remember, I was on the ground.\n\nWhen I woke up, the goods were everywhere. I think I messed up the task... The worst thing is: I tried to move but I couldn't really feel my legs.\n\nI really don't know where to ask for help...Is there any way to ask for compensation in situations like this?",
    likes: 500,
    likesLabel: "500+",
    time: "6h ago",
    canFollow: true,
    comments: [
      { author: "Bee_681030", text: "omg this is scary... are you okay?? 😨" },
      {
        author: "Bee_199811",
        text: "something similar happened to me last month... my hands went numb after a long haul task 😬",
      },
      { author: "Bee_638030", text: "bro this gave me chills. this doesn't sound normal at all" },
      { author: "Bee_998301", text: "sounds like system overload tbh" },
      { author: "Bee_446037", text: "check your contract - there should be a compensation clause." },
      {
        author: "Bee_916257",
        text: "anyone else feel like incidents like this are getting more frequent...☠️",
      },
      {
        author: "BEEhire_Support",
        text:
          "Hi @Bee_374121, we're very sorry to hear about your experience.\n\nYour safety is our top priority 🐝\n\nOur team has initiated an internal review of this incident. Please submit a formal report through the Safety Center so we can assist you further.\n\nWe are committed to investigating this thoroughly and will provide an update within 30 days.",
      },
    ],
  },
];

export default function BeehivePage() {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [privateComments, setPrivateComments] = useState<Record<string, string[]>>({});

  const toggleLike = (postId: string) => {
    setLikedPosts((current) => ({ ...current, [postId]: !current[postId] }));
  };

  const toggleSave = (postId: string) => {
    setSavedPosts((current) => ({ ...current, [postId]: !current[postId] }));
  };

  const updateDraft = (postId: string, value: string) => {
    setDrafts((current) => ({ ...current, [postId]: value }));
  };

  const submitPrivateComment = (postId: string) => {
    const value = drafts[postId]?.trim();
    if (!value) return;

    setPrivateComments((current) => ({
      ...current,
      [postId]: [...(current[postId] || []), value],
    }));
    setDrafts((current) => ({ ...current, [postId]: "" }));
  };

  return (
    <main className="min-h-screen bg-[#eef1f7] flex justify-center font-sans antialiased">
      <div className="w-full max-w-md min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f6fb_42%,#ebedf5_100%)] text-[#1c2240] pb-28">
        <header className="sticky top-0 z-40 border-b border-white/70 bg-[#f8f9fd]/90 backdrop-blur-xl">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#7f87ac]">Community</p>
                <h1 className="text-[28px] font-black tracking-[-0.04em] text-[#20264a]">Beehive</h1>
              </div>
              <div className="flex items-center gap-2 text-[#7b84a7]">
                <IconButton icon={<PlusSquare size={18} />} />
                <IconButton icon={<Heart size={18} />} />
                <IconButton icon={<Bell size={18} />} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-[1.6rem] border border-white bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(31,45,88,0.08)]">
              <Search size={16} className="text-[#8c93b3]" />
              <input
                readOnly
                value="Search Bees, ideas, and task tips"
                className="w-full bg-transparent text-sm text-[#8c93b3] outline-none"
              />
            </div>
          </div>
        </header>

        <section className="px-5 pt-5">
          <div className="rounded-[2rem] border border-white bg-[linear-gradient(135deg,#ffffff_0%,#f1f4ff_100%)] p-4 shadow-[0_18px_40px_rgba(31,45,88,0.08)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dcdfff]">
                <img src="/Bee.svg" alt="Bee" className="h-6 w-6" />
              </div>
              <button className="flex-1 rounded-full bg-[#f2f4fb] px-4 py-3 text-left text-sm text-[#8790b4]">
                Share a task win, a setup photo, or a tip...
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#6f789c]">
              <QuickAction icon={<Image size={15} />} label="Photo" />
              <QuickAction icon={<Smile size={15} />} label="Mood" />
              <QuickAction icon={<Send size={15} />} label="Post" />
            </div>
          </div>
        </section>

        <section className="px-5 pt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-[#7a82a6]">Stories</h2>
            <button className="text-xs font-semibold text-[#5763c9]">View all</button>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {STORIES.map((story) => (
              <div key={story.id} className="min-w-[72px] text-center">
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full p-[3px] ${
                    story.ring
                      ? "bg-[linear-gradient(135deg,#7d6fff,#ef83c8,#ffd58a)]"
                      : "bg-[#d7dcef]"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <img src={story.avatar} alt={story.name} className="h-12 w-12 rounded-full object-cover" />
                  </div>
                </div>
                <p className="mt-2 truncate text-[11px] font-semibold text-[#59617e]">{story.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pt-5 space-y-4">
          {POSTS.map((post, index) => {
            const liked = !!likedPosts[post.id];
            const saved = !!savedPosts[post.id];
            const privateList = privateComments[post.id] || [];
            const draft = drafts[post.id] || "";
            const totalLikes = post.likes + (liked ? 1 : 0);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_22px_50px_rgba(31,45,88,0.1)] ${
                  post.highlight ? "bg-[linear-gradient(180deg,#ffffff_0%,#f7f7fd_100%)]" : ""
                }`}
              >
                <div className="flex items-center justify-between px-4 pt-4">
                  <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.author} className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-bold text-[#20264a]">{post.handle}</p>
                      <p className="text-[11px] text-[#7a82a6]">{post.role}</p>
                    </div>
                  </div>

                  {post.canFollow ? (
                    <button className="rounded-full bg-[#d9d9dd] px-5 py-2.5 text-sm font-bold text-[#20264a] transition hover:bg-[#cfd0d8]">
                      + Follow
                    </button>
                  ) : (
                    <button className="text-[#7a82a6]">
                      <MoreHorizontal size={18} />
                    </button>
                  )}
                </div>

                <div className="px-4 pt-5">
                  <p className="whitespace-pre-line text-[15px] leading-8 text-[#171a2e]">{post.caption}</p>
                </div>

                <div className="px-4 pt-5">
                  <div className="relative overflow-hidden rounded-[1.25rem] bg-[#e9ebf1]">
                    {post.badgeLabel && (
                      <span className="absolute right-4 top-4 z-10 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-[#4a4d5b] backdrop-blur-sm">
                        {post.badgeLabel}
                      </span>
                    )}
                    <img src={post.image} alt={post.author} className="h-auto w-full object-cover" />
                  </div>
                </div>

                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 text-[#24315b]">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 transition hover:scale-105 ${
                          liked ? "text-[#d7434f]" : ""
                        }`}
                      >
                        <Heart size={18} fill={liked ? "currentColor" : "none"} />
                        <span className="text-xs font-semibold text-[#31295e]">
                          {post.likesLabel && !liked ? post.likesLabel : compactLikes(totalLikes)}
                        </span>
                      </button>

                      <button className="transition hover:scale-105">
                        <MessageCircle size={18} />
                      </button>

                      <button
                        onClick={() => toggleSave(post.id)}
                        className={`transition hover:scale-105 ${saved ? "text-[#f0bf14]" : ""}`}
                      >
                        {post.highlight ? <Star size={18} fill={saved ? "currentColor" : "none"} /> : <Bookmark size={18} fill={saved ? "currentColor" : "none"} />}
                      </button>
                    </div>

                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#98a0bd]">{post.time}</span>
                  </div>

                  <div className="mt-5 space-y-1 text-[13px] leading-6 text-[#2c3455]">
                    {post.comments.map((comment) => (
                      <p key={`${post.id}-${comment.author}-${comment.text}`}>
                        <span className="font-bold text-[#2e2a67]">{comment.author}</span>
                        <span className="font-semibold text-[#2e2a67]"> :</span>{" "}
                        <span className="whitespace-pre-line">{comment.text}</span>
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[1.4rem] border border-[#eceef6] bg-[#fafbff] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        value={draft}
                        onChange={(event) => updateDraft(post.id, event.target.value)}
                        placeholder="Add a comment... only visible to you"
                        className="w-full bg-transparent text-sm text-[#20264a] outline-none placeholder:text-[#98a0bd]"
                      />
                      <button
                        onClick={() => submitPrivateComment(post.id)}
                        className="rounded-full bg-[#22284c] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#313a6c]"
                      >
                        Post
                      </button>
                    </div>

                    {privateList.length > 0 && (
                      <div className="mt-3 border-t border-[#eceef6] pt-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#98a0bd]">
                          Private notes
                        </p>
                        <div className="mt-2 space-y-1 text-sm text-[#31405f]">
                          {privateList.map((comment, commentIndex) => (
                            <p key={`${post.id}-private-${commentIndex}`}>
                              <span className="font-bold text-[#20264a]">You</span>: {comment}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>

        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto bg-[#F5F6F8]/90 backdrop-blur-xl border-t border-gray-200 px-5 py-3 pb-4 rounded-t-[1.6rem]">
            <div className="flex justify-between items-end text-gray-400">
              <NavIcon icon={<Home size={22} />} label="Home" onClick={() => router.push("/app")} />
              <NavIcon icon={<Scale size={20} />} label="Earn" onClick={() => router.push("/earn")} />
              <NavIcon icon={<LayoutGrid size={22} />} label="TaskHub" onClick={() => router.push("/task-hub")} />
              <NavIcon icon={<Package2 size={22} />} label="Beehive" active />
              <NavIcon icon={<User size={22} />} label="Profile" onClick={() => router.push("/profile")} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function compactLikes(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 1100 ? 1 : 0)}K`;
  }

  return `${value}`;
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white shadow-sm transition hover:-translate-y-0.5">
      {icon}
    </button>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-[#f4f6fd]">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function NavIcon({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all ${active ? "text-[#7C71F5] -translate-y-1" : "text-gray-400"}`}
    >
      <div className={`${active ? "bg-[#7C71F5]/10 p-2.5 rounded-2xl" : "p-1"} relative`}>
        {icon}
      </div>
      <span className="text-[9px] font-bold">{label}</span>
    </button>
  );
}

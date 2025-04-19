export const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.0$/, "") + "K";
  }
  return num;
};

export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();

  const seconds = diffInMs / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30;
  const years = months / 12;

  if (years >= 1) {
    return `${Math.floor(years)} year${Math.floor(years) > 1 ? "s" : ""} ago`;
  }
  if (months >= 1) {
    return `${Math.floor(months)} month${
      Math.floor(months) > 1 ? "s" : ""
    } ago`;
  }
  if (days >= 1) {
    return `${Math.floor(days)} day${Math.floor(days) > 1 ? "s" : ""} ago`;
  }
  if (hours >= 1) {
    return `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? "s" : ""} ago`;
  }
  if (minutes >= 1) {
    return `${Math.floor(minutes)} minute${
      Math.floor(minutes) > 1 ? "s" : ""
    } ago`;
  }
  return `just now`;
};

export const handleShare = async (title, videoId) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check this out!",
        text: "video from my-YouTube - " + title,
        url:
          "https://my-youtube-abhinandan-yadav.vercel.app/watch?v=" + videoId,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    alert("Sharing not supported in this browser.");
  }
};

export const saveJSONToFile = (filename, data) => {
  const json = JSON.stringify(data, null, 2); // pretty-print with 2 spaces
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href); // clean up
};

export const generateIndianYouTubeUsername = () => {
  const desiAdjectives = [
    "Desi",
    "Chai",
    "Bollywood",
    "Masala",
    "Swag",
    "Jugaadu",
    "Filmy",
    "Dilli",
    "Mumbai",
    "Patiala",
    "Biryani",
    "Punjabi",
    "Namma",
  ];

  const desiNouns = [
    "Bhai",
    "Didi",
    "Yatri",
    "Neta",
    "Coder",
    "Gamer",
    "Foodie",
    "Engineer",
    "Launda",
    "Kudi",
    "Nawab",
    "Singh",
    "Samosa",
    "Guru",
  ];

  const number = Math.floor(Math.random() * 10000); // Random 0–9999

  const adj = desiAdjectives[Math.floor(Math.random() * desiAdjectives.length)];
  const noun = desiNouns[Math.floor(Math.random() * desiNouns.length)];

  return `${adj}${noun}${number}`;
};

export const generateLiveChatMessage = () => {
  const starters = [
    "Bro",
    "OMG",
    "Haha",
    "Wooo",
    "LMAO",
    "Bruh",
    "Hey",
    "Nice",
    "Yooo",
    "Epic",
    "🔥",
    "😂",
    "😭",
    "💀",
    "Lol",
  ];

  const phrases = [
    "this is lit",
    "what just happened",
    "too funny",
    "respect",
    "do it again",
    "I'm dead",
    "this guy 💀",
    "unreal",
    "let's goooo",
    "he cracked it",
    "so clean",
    "no way",
    "100% true",
    "he's the GOAT",
    "I can't",
  ];

  const emojis = [
    "😂",
    "🔥",
    "💯",
    "🤯",
    "🙌",
    "😎",
    "👏",
    "😭",
    "💀",
    "👑",
    "🤡",
    "🫡",
  ];

  const randomStarter = starters[Math.floor(Math.random() * starters.length)];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  // Combine them randomly
  const formats = [
    `${randomStarter} ${randomPhrase} ${randomEmoji}`,
    `${randomEmoji} ${randomPhrase}`,
    `${randomPhrase}!`,
    `${randomStarter} ${randomEmoji}`,
    `${randomStarter} ${randomPhrase}`,
    `${randomEmoji} ${randomPhrase} ${randomEmoji}`,
  ];

  return formats[Math.floor(Math.random() * formats.length)];
};


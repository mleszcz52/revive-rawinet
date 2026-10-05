import { Video, VideoOff } from "lucide-react";
import { useBackgroundAnimation } from "@/hooks/useBackgroundAnimation";

export const BackgroundAnimationToggle = () => {
  const { enabled, toggle } = useBackgroundAnimation();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!enabled}
      aria-label={enabled ? "Wyłącz animację tła" : "Włącz animację tła"}
      title={enabled ? "Wyłącz animację tła" : "Włącz animację tła"}
      className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-xs text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white"
    >
      {enabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
      <span className="hidden sm:inline">
        {enabled ? "Animacja: wł." : "Animacja: wył."}
      </span>
    </button>
  );
};

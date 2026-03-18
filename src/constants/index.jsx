import { Camera, Sparkles, Printer } from "lucide-react";

export const FEATURES = [
  {
    icon: <Camera size={20} strokeWidth={1.5} />,
    title: "auto capture",
    desc: "4 automatic shots with a countdown timer. Just pose and smile!",
  },
  {
    icon: <Sparkles size={20} strokeWidth={1.5} />,
    title: "filters & stickers",
    desc: "Apply vintage filters and decorate with custom stickers.",
  },
  {
    icon: <Printer size={20} strokeWidth={1.5} />,
    title: "print your strip",
    desc: "Save or print your photo strip in classic vintage styles.",
  },
];

export const LAYOUTS = [
  { id: 1, poses: 1, label: "1 Pose", size: "4x6" },
  { id: 2, poses: 2, label: "2 Poses", size: "4x6" },
  { id: 3, poses: 3, label: "3 Poses", size: "4x6" },
  { id: 4, poses: 4, label: "4 Poses", size: "4x6" },
];

import React, { useState, useEffect } from "react";
import Dislike from "@/public/icons/dislike";
import Star from "@/public/icons/start";
import axios from "axios";
import { request } from "@/configs/HTTPService";

type PropsType = {
  item: {
    id: number;
    full_name: string;
    created_at: string;
    content: string;
    likes: number;
    dislikes: number;
    stars: number;
  };
  index: number;
};

export default function UserComments({ item }: PropsType) {
  const [likes, setLikes] = useState(item.likes || 0);
  const [dislikes, setDislikes] = useState(item.dislikes || 0);
  const [userAction, setUserAction] = useState(() => {
    const storedAction = localStorage.getItem(`comment-${item.id}`);
    return storedAction ? JSON.parse(storedAction) : null;
  });

  useEffect(() => {
    if (userAction) {
      localStorage.setItem(`comment-${item.id}`, JSON.stringify(userAction));
    }
  }, [userAction]);

  const handleLike = async () => {
    const hasDislike = userAction === "dislike";
    if (userAction === "like") return;
    if (userAction === "dislike") {
      setDislikes((prev) => prev - 1);
    }

    setLikes((prev) => prev + 1);
    setUserAction("like");

    try {
      await request(`/api/v1/comments/${item.id}/like`, "post", { hasDislike });
    } catch (error) {
      console.error("Error updating like: ", error);
    }
  };

  const handleDislike = async () => {
    const hasLike = userAction === "like";

    if (userAction === "dislike") return;
    if (userAction === "like") {
      setLikes((prev) => prev - 1);
    }

    setDislikes((prev) => prev + 1);
    setUserAction("dislike");

    try {
      await request(`/api/v1/comments/${item.id}/dislike`, "POST", { hasLike });
    } catch (error) {
      console.error("Error updating dislike: ", error);
    }
  };

  return (
    <div className="bg-gray-250 child:p-4 child:lg:p-[18px] rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span className="font-peyda-600 text-xs text-blue-1050 lg:text-base">
          {item?.full_name}
        </span>
        <span className="font-peyda-500 text-xs text-slate-1000/50 lg:text-base">
          {new Date(item?.created_at).toLocaleDateString("fa-IR")}
        </span>
      </div>

      <div className="my-2 border-y border-solid border-y-[#D1D9DD] py-2">
        <p className="font-peyda-500 text-xs text-blue-1050 lg:text-base">
          {item?.content}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-x-2">
          <span className="font-peyda-500 text-xs text-slate-1000/50 lg:text-sm">
            آیا این نظر برای شما مفید بود؟
          </span>
          <button
            onClick={handleLike}
            className={`flex items-center gap-x-1 ${
              userAction === "like" ? "text-green-500" : "text-blue-1050"
            }`}
          >
            <Dislike className="h-[18px] rotate-180 w-[18px] lg:h-6 lg:w-6" />
            <span>{likes}</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center gap-x-1 ${
              userAction === "dislike" ? "text-red-500" : "text-blue-1050"
            }`}
          >
            <Dislike className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
            <span>{dislikes}</span>
          </button>
        </div>

        <div className="flex items-center gap-x-1">
          <span className="font-peyda-400 text-base">{item?.stars}</span>
          <Star className="h-6 w-6 text-yellow-500" />
        </div>
      </div>
    </div>
  );
}

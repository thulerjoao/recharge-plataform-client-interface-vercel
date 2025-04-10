"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const DefinirApiPage = ({ params }: Props) => {
  const slug = params.slug;
  const route = useRouter();

  const handleSaveUrl = async () => {
    try {
      const res = await fetch(`/api/apiurl/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao salvar url");
      route.replace("/");
    } catch (error) {
      return false;
    }
  };
  handleSaveUrl();
};

export default DefinirApiPage;

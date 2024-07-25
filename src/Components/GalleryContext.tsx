import React, { createContext, useState, ReactNode } from "react";

export interface ArtComment {
  name: string;
  comment: string;
  artName: string;
}

interface GalleryContextValue {
  name: string;
  setName: (name: string) => void;
  comment: string;
  setComment: (comment: string) => void;
  artName: string;
  setArtName: (artName: string) => void;
  comments: ArtComment[];
  setComments: (comments: ArtComment[]) => void;
}

export const GalleryContext = createContext<GalleryContextValue>({
  name: "",
  setName: () => {},
  comment: "",
  setComment: () => {},
  artName: "",
  setArtName: () => {},
  comments: [],
  setComments: () => {},
});

// Create a provider component
export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [artName, setArtName] = useState<string>("");
  const [comments, setComments] = useState<ArtComment[]>([]);

  return (
    <GalleryContext.Provider value={{ name, setName, comment, setComment, artName, setArtName, comments, setComments }}>
      {children}
    </GalleryContext.Provider>
  );
};

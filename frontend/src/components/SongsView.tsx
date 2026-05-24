import { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSongs } from "@/api/api";
import { SongCard } from "./SongCard";
import { SongsEmptyState } from "./SongsEmptyState";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";

export function SongsView() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["songs"],
    queryFn: ({ pageParam }) => fetchSongs(pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastSongElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <MusicalNoteIcon className="animate-spin text-primary size-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-center">
        Error: {error.message}
      </div>
    );
  }

  const isEmpty = data.pages[0]?.data.length === 0;

  if (isEmpty) {
    return <SongsEmptyState />;
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.pages.map((page, pageIndex) => {
          return page.data.map((song: any, songIndex: number) => {
            const isLastSong =
              pageIndex === data.pages.length - 1 &&
              songIndex === page.data.length - 1;

            if (isLastSong) {
              return (
                <div ref={lastSongElementRef} key={song.id}>
                  <SongCard song={song} />
                </div>
              );
            }

            return (
              <div key={song.id}>
                <SongCard song={song} />
              </div>
            );
          });
        })}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <MusicalNoteIcon className="animate-spin text-primary size-8" />
        </div>
      )}

      {!hasNextPage && (
        <div className="text-center text-muted-foreground py-8">
          You've reached the end of the library!
        </div>
      )}
    </div>
  );
}

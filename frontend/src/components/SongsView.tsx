import { useRef, useCallback } from "react";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchSongs } from "@/api/api";
import { SongCard } from "./SongCard";
import { SongsEmptyState } from "./SongsEmptyState";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";

interface SongsViewProps {
  searchQuery?: string;
}

export function SongsView({ searchQuery }: SongsViewProps) {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["songs", searchQuery],
    queryFn: ({ pageParam }) => fetchSongs(pageParam, 10, searchQuery),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    placeholderData: keepPreviousData,
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

  if (isPending && !data) {
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

  const isEmpty = data?.pages[0]?.data.length === 0;

  if (isEmpty) {
    return <SongsEmptyState />;
  }

  return (
    <div className="flex flex-col relative">
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 transition-opacity duration-300 ${
          isFetching && !isFetchingNextPage ? "opacity-40 pointer-events-none" : "opacity-100"
        }`}
      >
        {data.pages.map((page, pageIndex) => {
          return page.data.map((song: any, songIndex: number) => {
            const isLastSong =
              pageIndex === data.pages.length - 1 &&
              songIndex === page.data.length - 1;

            if (isLastSong) {
              return (
                <div ref={lastSongElementRef} key={song.id} className="animate-in fade-in duration-500">
                  <SongCard song={song} />
                </div>
              );
            }

            return (
              <div key={song.id} className="animate-in fade-in duration-500">
                <SongCard song={song} />
              </div>
            );
          });
        })}
      </div>

      {isFetching && !isFetchingNextPage && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <MusicalNoteIcon className="animate-spin text-primary size-12 opacity-80" />
        </div>
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <MusicalNoteIcon className="animate-spin text-primary size-8" />
        </div>
      )}

      {!hasNextPage && !isEmpty && (
        <div className="text-center text-muted-foreground py-8">
          You've reached the end of the library!
        </div>
      )}
    </div>
  );
}

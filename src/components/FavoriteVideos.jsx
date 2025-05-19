
import { useSelector } from "react-redux";
import useSWR from "swr";
import { BACKEND_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const FavoriteVideos = () => {
  const userData = useSelector((store) => store.user);

  const fetcher = async (url) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${userData.JWT}`,
      },
    });
    const data = await response.json();
    return data.data;
  };

  const { data: favoriteVideos, error, isLoading } = useSWR(
    `${BACKEND_URL}/favorites-videos`,
    fetcher
  );

  if (isLoading) return <div className="mt-16 p-4">Loading...</div>;
  if (error) return <div className="mt-16 p-4">Error loading favorite videos</div>;
  if (!favoriteVideos?.length) return <div className="mt-16 p-4">No favorite videos found</div>;

  return (
    <div className="p-4 mt-16">
      <h2 className="text-2xl font-bold mb-4 text-textPrimary">Favorite Videos</h2>
      <div className="grid grid-cols-3 gap-4">
        {favoriteVideos.map((video) => (
          <Link 
            to={`/watch?v=${video.video_id}`} 
            key={video.video_id}
            className="bg-secondary rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={`https://i.ytimg.com/vi/${video.video_id}/mqdefault.jpg`}
              alt="thumbnail"
              className="w-full object-cover"
            />
            <div className="p-3">
              <h3 className="text-textPrimary font-medium truncate">
                {video.video_title || "Video Title"}
              </h3>
              <p className="text-gray-500 text-sm">
                Added to favorites
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteVideos;
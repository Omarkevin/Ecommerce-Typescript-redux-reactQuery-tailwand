import { useState, useEffect } from "react";

interface Follower {
  name: { first: string; last: string };
  picture: { medium: string };
  location: { country: string };
}

export default function FollowersList() {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followStates, setFollowStates] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await fetch(
          "https://randomuser.me/api/?results=3&inc=name,picture,location"
        );
        if (!res.ok) throw new Error("Failed to fetch followers");
        const data = await res.json();
        setFollowers(data.results);
        setFollowStates(new Array(data.results.length).fill(false));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  const toggleFollow = (index: number) => {
    setFollowStates((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="hidden sm:block max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
        Suggested Followers
      </h2>
      <div className="space-y-3">
        {followers.map((follower, index) => (
          <FollowerItem
            key={index}
            follower={follower}
            isFollowing={followStates[index]}
            onToggleFollow={() => toggleFollow(index)}
          />
        ))}
      </div>
    </div>
  );
}

// Sub-components for better organization
const LoadingState = () => (
  <div className="text-center p-4">
    <p className="text-gray-600">Loading suggestions...</p>
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <div className="text-center p-4">
    <p className="text-red-500">Error: {error}</p>
  </div>
);

interface FollowerItemProps {
  follower: Follower;
  isFollowing: boolean;
  onToggleFollow: () => void;
}

const FollowerItem = ({
  follower,
  isFollowing,
  onToggleFollow,
}: FollowerItemProps) => {
  const fullName = `${follower.name.first} ${follower.name.last}`;
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <img
          src={follower.picture.medium}
          alt={fullName}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{fullName}</p>
          <p className="text-xs md:text-sm text-gray-500 truncate">
            {follower.location.country}
          </p>
        </div>
      </div>
      <button
        onClick={onToggleFollow}
        className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-medium transition-colors ${
          isFollowing
            ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};
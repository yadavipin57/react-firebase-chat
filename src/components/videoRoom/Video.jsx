import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useUserStore } from "../../library/userStore";
import { useEffect, useRef } from "react";

const Video = () => {
  const { currentUser } = useUserStore();
  const { selectedUserId } = useParams();
  const navigate = useNavigate();
  
  // Create a reference to hold the zegoCloud instance
  const zegoCloudRef = useRef(null);

  const myMeeting = async (element) => {
    const appId = 49458166;
    const serverSecret = import.meta.env.VITE_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      selectedUserId,
      currentUser?.id,
      currentUser?.username
    );

    const zegoCloud = ZegoUIKitPrebuilt.create(kitToken);
    zegoCloudRef.current = zegoCloud;  // Store the instance in the ref

    zegoCloud.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://reactchat147.web.app/video-call/${selectedUserId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
    });
  };

  const handleGoBack = () => {
    if (zegoCloudRef.current) {
      // Leave the room if zegoCloud instance exists
      zegoCloudRef.current.destroy();
    }
    navigate("/");  // Navigate to home
    location.reload();
  };

  return (
    <div className="relative w-full">
      <div className="px-4 py-2 z-50 rounded-lg absolute top-2 right-2 bg-red-500">
        <button onClick={handleGoBack}>Go back</button>
      </div>
      <div className="mt-20">
        <div ref={myMeeting} />
      </div>
    </div>
  );
};

export default Video;

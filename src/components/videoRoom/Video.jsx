import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useChatStore } from "../../library/chatStore";
import { useUserStore } from "../../library/userStore";

const Video = () => {
  const { currentUser } = useUserStore();

  const { selectedUserId } = useParams();

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
    zegoCloud.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https://reactchat147.web.app/video call/${selectedUserId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
    });
  };

  return (
    <div className="">
      <div ref={myMeeting} />
    </div>
  );
};
export default Video;

import avatarImage from '../assets/avatar.png'
import avatar2Image from '../assets/avatar2.png'

import { ChatBubble, ImageBubble } from '../components/ChatBubbles'

export function Personas() {
  return (
    <div className="prose">
      <div className="bg-gray-300 p-4">
        <h1>Fun with Friends</h1>
      </div>
      <div className="p-4">
        <h2>Subscribe to chat!</h2>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/chat">Chat</a>
        </button>

        <ImageBubble imgSrc={avatar2Image} alt="Welcome photo" />

        <h2>Hang out and have fun!</h2>
      </div>
    </div>
  )
}

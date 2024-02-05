import avatarImage from '../assets/avatar.png'
import avatar2Image from '../assets/avatar2.png'
import {  ImageBubble } from '../components/ChatBubbles'

export function Home() {
  return (
    <div className="">
      <div className="bg-gray-300 p-4">
        <h1>Fun with Friends</h1>
      </div>

      <div className="p-4">
        <h2>
          <a href="/profile" className="bg-blue-500 hover:bg-blue-300 font-bold py-2 px-4 rounded">
            Join to meet new friends!
          </a>
        </h2>

        <ImageBubble imgSrc={avatarImage} alt="Welcome photo" />
        <h2>Hang out and have a good time!</h2>
        <ImageBubble imgSrc={avatar2Image} alt="Welcome photo" />
      </div>
    </div>
  )
}

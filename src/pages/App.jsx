import { useEffect } from "react"
import { useChannels } from "../context/channels"
import { AsyncFetcher } from '../lib/Fetcher'
import { socket } from "../socket"
import { Button } from '../components/ui/button'

function App() {
  const [channels] = useChannels()

  useEffect(() => {
    socket.connect()
    socket.on('uploading-progress', data => console.log(data))
    return () => {
      socket.off('uploading-progress')
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const file = e.target[0].files[0];

    const formData = new FormData();
    formData.append('file', file)

    formData.forEach(item => {
      console.log(item);
    })
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/drive/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'socket': socket.id
      }
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  return (
    <>
      <button onClick={() => AsyncFetcher({
        url: '/youtube/connecter-link',
        cb: (res) => {
          window.location.href = res.data.url
        }
      })} className="border border-white px-3 py-2 cursor-pointer">Connect Youtube</button>
      <div>
        {
          channels.map(ch => {
            return (
              <div className="border border-white rounded-xl py-4 px-8 flex flex-col items-start gap-y-3" key={ch.id}>
                <img className="w-10 h-10 rounded-full" src={ch.avatar} />
                <p>{ch.name} - {ch.userHandle}</p>
              </div>
            )
          })
        }
      </div>
      <Button variant="default">Click</Button>
      <div className="m-10">
        <form formEncType="multipart/form-data" onSubmit={handleSubmit}>
          <input type="file" />
          <input type="submit" value="GO" className="border border-white py-2 px-6" />
        </form>
      </div>
    </>
  )
}

export default App

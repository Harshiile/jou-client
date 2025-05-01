import { useChannels } from "../context/channels"
import { AsyncFetcher } from '../lib/Fetcher'

function App() {
  const [channels] = useChannels()

  // const connectYoutubeHandler = AsyncFetcher({
  //   url: '/api/get/oauth/youtube/url',
  //   cb: () => {
  //     window.location.href = res.data.url
  //   }
  // })


  const handleSubmit = async (e) => {
    e.preventDefault()
    const file = e.target[0].files[0];

    const formData = new FormData();
    formData.append('file', file)

    fetch(`http://localhost:3000/api/drive/upload`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())  
      .then(res => console.log(res))
  }

  return (
    <>
      {/* <button onClick={() => AsyncFetcher({
        url: '/api/youtube/get/oauth-url',
        cb: () => {
          window.location.href = res.data.url
        }
      })} className="border border-white px-3 py-2 cursor-pointer">Connect Youtube</button> */}
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

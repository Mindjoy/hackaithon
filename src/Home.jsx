import { useNavigate } from 'react-router-dom'

const Home = ({ setImage }) => {
  const navigate = useNavigate()

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage({
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      })
      navigate('/question')
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src="/logo.png" alt="logo" className="mb-10 w-[200px]" />
      <img src="/camera.png" alt="camera" className="mx-16 mb-10" />

      <div className="w-full flex">
        <label
          className="transition duration-300 ease-in-out trans w-full text-xl text-white bg-violet-600 font-semibold py-5 px-10 rounded-lg cursor-pointer"
          htmlFor="picture">
          Take a photo
        </label>

        <input
          id="picture"
          type="file"
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload} />
      </div>
      <div className="flex flex-col items-center mt-10">
        <p className="mt-10 mb-3">Powered by</p>
        <img src="/mindjoy-logo.svg" alt="logo" className="w-[100px]" />
      </div>
    </div>
  )
}

export default Home

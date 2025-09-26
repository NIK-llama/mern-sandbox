export const Input = ({ onClick, type, placeholder }) => {
  return (
    <input onClick={onClick} type={type} placeholder={placeholder} className="w-2xs rounded-xl bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400 mb-6" />
  )
}
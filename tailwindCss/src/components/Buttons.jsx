export const Button = ({ disabled, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded-2xl m-8 w-[150px] h-[50px] text-white cursor-pointer ${
        disabled ? "bg-[#8094ad]" : "bg-[#36c6c0]"
      }`}
    >
      {children}
    </button>
  )
}
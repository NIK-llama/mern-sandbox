import VideocamIcon from "@mui/icons-material/Videocam";

export const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <VideocamIcon className="text-white text-4xl"/>
            <h1 className="text-3xl text-white font-sans font-normal">
                Webinar.gg
            </h1>
        </div>
    )
}
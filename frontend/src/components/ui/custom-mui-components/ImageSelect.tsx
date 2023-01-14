import {Button, Card, CardMedia} from "@mui/material";
import {AddAPhoto} from "@mui/icons-material";
import {ChangeEvent, useState} from "react";

type FileSelectProps = {
    name: string
    onChange(event: FileList): void
}
export default function ImageSelect(props: FileSelectProps) {
    const [imageURL, setImageURL] = useState<string | null>()

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setImageURL(reader.result as string)
                }
            }
            props.onChange(event.target.files)
        }
    }

    return (
        <Card sx={{width: "100%"}}>
            {imageURL && <CardMedia component={"img"} src={imageURL}/>}
            <Button variant={"contained"}
                    component="label"
                    size={"small"}
                    fullWidth={true}
                    startIcon={<AddAPhoto/>}>
                Upload A Photo
                <input accept={"image/*"}
                       name={props.name}
                       hidden={true}
                       onChange={handleImageChange}
                       multiple={false}
                       type={"file"}/>
            </Button>

        </Card>)
}
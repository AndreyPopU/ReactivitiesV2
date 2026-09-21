import { Box, Button } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";

const baseStyle = {
    borderColor: "#2d3439"
};
const focusedStyle = { borderColor: "#2196f3" };
const acceptStyle = { borderColor: "#00e676" };
const rejectStyle = { borderColor: "#ff1744" };

export default function ImageDropzone() {

    const { id } = useParams();
    const { addPhoto } = useProfile(id);
    const cropperRef = useRef<ReactCropperElement>(null);

    type FileWithPreview = File & {
        preview: string;
    };

    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file as Blob)
        })))
    }, [])

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, isDragActive } = useDropzone({
        accept: { "image/*": [] }, onDrop
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject, isDragActive]
    );

    return (
        <>
            {!files[0]?.preview &&
                <>
                    <Box {...getRootProps({ style })}
                        sx={{
                            border: '2px dashed #2d3439',
                            pt: '40px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            height: 250
                        }}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                isDragAccept ? <p style={{ color: "#2196f3" }}>Ready to drop</p> :
                                    <p style={{ color: "#ff1744" }}>File not supported</p> :
                                <p>Drag and drop images here</p>
                        }
                    </Box>

                    <br />
                    <Button variant='contained' component='label' disabled={addPhoto.isPending}>
                        Add Photo <input type="file" hidden disabled={addPhoto.isPending}
                            onChange={e => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    addPhoto.mutate(file);
                                }
                                e.target.value = "";
                            }} /> </Button>
                </>
            }

            {files[0]?.preview &&
                <>
                    <Cropper
                        ref={cropperRef}
                        src={files[0]?.preview}
                        style={{ height: 250, width: '90%' }}
                        aspectRatio={1}
                        preview=".img-preview"
                        guides={false}
                        viewMode={1}
                        background={false}
                    />

                    <br />
                    <Button variant='contained' component='label' disabled={addPhoto.isPending} onClick={() => {
                        const cropper = cropperRef.current?.cropper;

                        if (cropper) {
                            cropper.getCroppedCanvas().toBlob(blob => {
                                if (!blob) return;

                                const croppedFile = new File(
                                    [blob],
                                    files[0].name,
                                    { type: files[0].type }
                                );

                                addPhoto.mutate(croppedFile);
                                setFiles([]);

                            });
                        }
                    }}>
                        Add Photo</Button>
                </>
            }
        </>
    );
}

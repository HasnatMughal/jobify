import { createUploadthing, FileRouter } from "uploadthing/server";

const f = createUploadthing()

export const ourFileRouter = {
    cvUploader : f({pdf:{maxFileSize:'4MB'}}).onUploadComplete(async ({file}) => {
        console.log(file.url)
    })
} satisfies FileRouter

export type ourFileRouter = typeof ourFileRouter
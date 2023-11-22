import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "../pages/api/route";

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();

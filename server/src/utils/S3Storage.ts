import { S3 } from "aws-sdk";
import mime from "mime";
import path from "path";
import { multerStorage } from "./MulterStorage";
import fs from "fs";

export interface SaveFileResponse {
    success: boolean;
    fileName?: string;
}

export class ImageStorage {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: "us-east-1",

        });
    }

    public async saveFile(fileName: string, dirName: string): Promise<SaveFileResponse> {
    

        try {
            const publicPath = path.resolve(__dirname, "..", "..", "public", "assets", dirName);
            const originalPath = path.resolve(publicPath, fileName);
            const contentType = mime.getType(originalPath);

            if (!contentType)
                throw new Error("file not found");

            const fileContent = await fs.promises.readFile(originalPath);

            const res = await this.client.putObject({
                Bucket: "sinuma-" + dirName,
                ACL: "public-read",
                Body: fileContent,
                ContentType: contentType,
                Key: fileName
            }).promise();

            console.log("aws res: ", res);
            return { success: true, fileName }
        } catch(err) {
            return { success: false }
        }
        

    }
}
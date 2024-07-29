# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).




create `aws-config.js` in `src` directory:


```
// src/aws-config.js
import { S3Client, ListObjectsCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const REGION = 'YOUR_AWS_REGION'; // e.g. 'us-east-1'

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId:'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
  },
});

export { s3Client, ListObjectsCommand, GetObjectCommand, PutObjectCommand };

```


create `config.js` file in `src` directory:
```
export const config = {
    bucket: 'BUCKET_NAME'
}
```
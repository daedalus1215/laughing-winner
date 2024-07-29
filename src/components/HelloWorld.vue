<script setup>
import { ref, onMounted } from 'vue';
import { s3Client, ListObjectsCommand, GetObjectCommand, PutObjectCommand } from '../aws-config';
import { config } from '../config.js'

const files = ref([]);

const loadFiles = async () => {
  const params = {
    Bucket: config.bucket,
  };
  try {
    const data = await s3Client.send(new ListObjectsCommand(params));
    files.value = data.Contents;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadFiles()
});

const uploadFiles = async (fileList) => {
  for (let file of fileList) {
    const params = {
      Bucket: config.bucket,
      Key: file.name,
      Body: file,
    };
    try {
      await s3Client.send(new PutObjectCommand(params));
      loadFiles();
    } catch (error) {
      console.error(error);
    }
  }
};

const downloadFile = async (key) => {
  const params = {
    Bucket: config.bucket,
    Key: key,
  };
  try {
    const data = await s3Client.send(new GetObjectCommand(params));
    const url = URL.createObjectURL(new Blob([data.Body]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', key);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(error);
  }
};
</script>


<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-toolbar>
          <q-btn @click="loadFiles">Load Files</q-btn>
          <q-uploader @added="uploadFiles"></q-uploader>
        </q-toolbar>
        <q-list v-if="files.length">
          <q-item v-for="file in files" :key="file.Key">
            <q-item-section>{{ file.Key }}</q-item-section>
            <q-item-section>
              <q-btn @click="downloadFile(file.Key)">Download</q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>

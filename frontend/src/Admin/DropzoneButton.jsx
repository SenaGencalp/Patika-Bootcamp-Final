import { useState } from "react";
import { Group, Text, rem, Image, Stack } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";

export function DropzoneButton({ onDrop }) {
  const [images, setImages] = useState([]);

  const handleDrop = (files) => {
    const filePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(filePreviews);
    if (onDrop) {
      onDrop(files);
    }
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={(files) => console.log("Yükleme reddedildi:", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Stack align="center" mih={220} justify="center">
        <Group
          justify="center"
          gap="xl"
          style={{ pointerEvents: "none", marginBottom: "1rem" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>
        </Group>
        <Text size="xl" inline>
          Görselleri buraya sürükleyin veya tıklayarak seçin
        </Text>
        <Text size="sm" c="dimmed" inline mt={7}>
          Yükleyeceğiniz her dosya maksimum 5MB boyutunda olmalı
        </Text>

        <Group mt="md" spacing="sm">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.preview}
              alt={`preview-${index}`}
              radius="sm"
              width={"200"}
              height={"200"}
              style={{ objectFit: "fill" }}
            />
          ))}
        </Group>
      </Stack>
    </Dropzone>
  );
}

export default DropzoneButton;

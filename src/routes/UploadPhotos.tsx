import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { Helmet } from "react-helmet";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api";

interface IForm {
  file: FileList;
}

interface IUploadRULResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const { roomPk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation({
    mutationFn: createPhoto,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded!",
        isClosable: true,
        description: "Feel free to upload more images.",
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "I love react",
          file: `http://127.0.0.1:8000/user-uploads/${result.id}`,
          roomPk,
        });
      }
    },
  });
  const upLoadURLMutation = useMutation({
    mutationFn: getUploadURL,
    onSuccess: (data: IUploadRULResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  useHostOnlyPage();
  const onSubmit = (data: any) => {
    upLoadURLMutation.mutate(data.file);
  };
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Helmet>
            <title>Upload Photo</title>
          </Helmet>
          <Heading textAlign={"center"}>Upload a Photo</Heading>
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={5}
            mt={10}
          >
            <FormControl>
              <Input {...register("file")} type="file" accept="image/*" />
            </FormControl>
            <Button
              isLoading={
                createPhotoMutation.isPending ||
                uploadImageMutation.isPending ||
                upLoadURLMutation.isPending
              }
              type="submit"
              w={"full"}
              colorScheme="red"
            >
              Upload photos
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}

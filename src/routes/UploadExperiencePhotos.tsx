import {
  Container,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import ProtectedPage from "../components/ProtectedPage";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  createExperiencePhoto,
  getExperienceUploadURL,
  uploadImage,
} from "../api";
import useHostOnlyPage from "../components/HostOnlyPage";

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadExperiencePhotos() {
  const { register, handleSubmit, watch, reset } = useForm();
  const { experiencePk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation({
    mutationFn: createExperiencePhoto,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Image uploaded!",
        isClosable: true,
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: ({ result }: any) => {
      if (experiencePk) {
        createPhotoMutation.mutate({
          description: "I love react",
          file: `http://127.0.0.1:8000/user-uploads/${result.id}`,
          experiencePk,
        });
      }
    },
  });
  const upLoadURLMutation = useMutation({
    mutationFn: getExperienceUploadURL,
    onSuccess: (data: IUploadURLResponse) => {
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
